import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content/site";
import { env } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  message: z.string().trim().min(1, "Message is required.").max(5000),
  company: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const limit = checkRateLimit(`contact:${ip}`);
    if (!limit.ok) {
      return NextResponse.json(
        { message: "Too many requests. Please try again shortly." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfterSec) },
        }
      );
    }

    const json: unknown = await request.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Invalid request.";
      return NextResponse.json({ message }, { status: 400 });
    }

    const { name, email, message, company } = parsed.data;

    if (company && company.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    if (!env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          message:
            "Contact form is temporarily unavailable. Please email me directly.",
        },
        { status: 503 }
      );
    }

    const from =
      env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
    const to = env.CONTACT_TO_EMAIL || site.email;

    const resend = new Resend(env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Failed to send. Please email me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
}
