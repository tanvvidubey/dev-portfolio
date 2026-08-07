"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconArrowRight } from "@/components/icons";
import { site } from "@/content/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const statusId = useId();
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          data.message ||
            `Something went wrong. Email me at ${site.email} instead.`
        );
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
    } catch {
      setStatus("error");
      setErrorMessage(`Failed to send. Please email ${site.email} directly.`);
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex min-h-[16rem] flex-col justify-center rounded-2xl bg-[var(--accent)]/10 px-5 py-8 sm:px-6"
        role="status"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          Sent
        </p>
        <p
          id={statusId}
          ref={successRef}
          tabIndex={-1}
          className="type-title mt-3 text-2xl text-[var(--foreground)] outline-none sm:text-3xl"
        >
          Message on its way
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--muted-foreground)]">
          Thanks for reaching out. I&apos;ll reply within a day or two.
        </p>
        <button
          type="button"
          className="btn btn-secondary mt-8 w-fit"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full text-left"
      aria-busy={status === "submitting"}
    >
      <div
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-invalid={status === "error" ? true : undefined}
            aria-describedby={status !== "idle" ? statusId : undefined}
            className="field"
            disabled={status === "submitting"}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={status === "error" ? true : undefined}
            className="field"
            disabled={status === "submitting"}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            maxLength={5000}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What are you building, and how can I help?"
            aria-invalid={status === "error" ? true : undefined}
            className="field min-h-[7.5rem] resize-y"
            disabled={status === "submitting"}
          />
        </div>
      </div>

      {status === "error" && errorMessage ? (
        <p
          id={statusId}
          className="mt-4 text-sm text-[var(--danger)]"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-5">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary"
        >
          {status === "submitting" ? (
            "Sending…"
          ) : (
            <>
              Send message
              <IconArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
