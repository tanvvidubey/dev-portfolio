import Link from "next/link";
import { IconGitHub, IconLinkedIn, IconMail } from "@/components/icons";
import { site } from "@/content/site";

const explore = [
  { href: "/#about", label: "About" },
  { href: "/work", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/stack", label: "Tools" },
  { href: "/#contact", label: "Contact" },
] as const;

const social = [
  {
    href: `mailto:${site.email}`,
    label: "Email",
    icon: IconMail,
    external: false,
  },
  {
    href: site.linkedin,
    label: "LinkedIn",
    icon: IconLinkedIn,
    external: true,
  },
  {
    href: site.github,
    label: "GitHub",
    icon: IconGitHub,
    external: true,
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-4 bg-[var(--section-alt)]">
      <div className="shell-inner relative py-7 sm:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="type-title text-xl text-[var(--foreground)]">
              {site.name}
            </p>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-1">
              {explore.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1.5">
            {social.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--accent)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
