"use client";

import { useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send. Please try again or email directly.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 w-full max-w-lg mx-auto text-left sm:mt-12"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition sm:py-3.5"
            disabled={status === "submitting"}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition sm:py-3.5"
            disabled={status === "submitting"}
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
            className="w-full resize-y min-h-[120px] rounded-xl border-2 border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition sm:py-3.5"
            disabled={status === "submitting"}
          />
        </div>
      </div>

      {status === "error" && errorMessage && (
        <p className="mt-4 text-sm text-red-500" role="alert">
          {errorMessage}
        </p>
      )}
      {status === "success" && (
        <p className="mt-4 text-sm text-green-600 dark:text-green-400" role="status">
          Thanks! Your message has been sent. I&apos;ll get back to you soon.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-lg shadow-indigo-500/25 transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
