import { ContactForm } from "@/components/ContactForm";
import {
  IconArrowRight,
  IconGitHub,
  IconLinkedIn,
  IconMail,
} from "@/components/icons";
import { site } from "@/content/site";
import { Section } from "./Section";

const links = [
  {
    href: `mailto:${site.email}`,
    label: "Email",
    detail: site.email,
    icon: IconMail,
    external: false,
  },
  {
    href: site.linkedin,
    label: "LinkedIn",
    detail: "Connect",
    icon: IconLinkedIn,
    external: true,
  },
  {
    href: site.github,
    label: "GitHub",
    detail: "Code",
    icon: IconGitHub,
    external: true,
  },
] as const;

export function ContactSection({ className }: { className?: string }) {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's work together"
      description="Open to full stack projects, product work, or a thoughtful hello."
      className={className}
      alt
    >
      <div className="contact-shell relative overflow-hidden rounded-[1.35rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-[var(--accent)]/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[var(--bark)]/10 blur-3xl dark:bg-[var(--moss)]/15"
        />

        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 sm:p-8 lg:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                Send a note
              </p>
              {/* <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/12 px-3 py-1 text-[0.7rem] font-medium text-[var(--accent)]">
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </span>
                Replies in 1-2 days
              </span> */}
            </div>
            {/* <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted-foreground)]">
              A few lines is enough: role, idea, or timeline. I read every
              message.
            </p> */}
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="contact-shell-aside flex flex-col justify-start gap-6 p-6 sm:p-8 lg:p-9">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                Elsewhere
              </p>
              <ul className="mt-4 space-y-3 sm:space-y-4">
                {links.map(({ href, label, detail, icon: Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center gap-3.5 rounded-2xl bg-[var(--card)]/70 px-3.5 py-3 transition hover:-translate-y-0.5 hover:bg-[var(--card)]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/12 text-[var(--accent)] transition group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-[var(--foreground)]">
                          {label}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-[var(--muted)]">
                          {detail}
                        </span>
                      </span>
                      <IconArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
