import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { message: "Name is required." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { message: "Message is required." },
        { status: 400 }
      );
    }

    // Optional: integrate with an email service (e.g. Resend, SendGrid, Formspree)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: '...', to: 'tanvidubey2006@gmail.com', subject: `Contact from ${name}`, replyTo: email, text: message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Invalid request." },
      { status: 400 }
    );
  }
}
