"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { IconSearch } from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/content/site";

const links = [
  { href: "/#about", label: "About", match: "about", section: "about" },
  {
    href: "/#experience",
    label: "Experience",
    match: "experience",
    section: "experience",
  },
  { href: "/work", label: "Projects", match: "work", section: "projects" },
  { href: "/writing", label: "Writing", match: "writing", section: null },
  { href: "/#contact", label: "Contact", match: "contact", section: "contact" },
];

const HOME_SECTIONS = [
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "contact",
] as const;

export function SiteNav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const elements = HOME_SECTIONS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (match: string, section: string | null) => {
    if (match === "work") {
      if (pathname === "/work" || pathname.startsWith("/work/")) return true;
      return pathname === "/" && activeSection === "projects";
    }
    if (match === "writing") {
      return pathname === "/writing" || pathname.startsWith("/writing/");
    }
    if (pathname === "/" && section) {
      return activeSection === section;
    }
    return false;
  };

  return (
    <header
      className={`shell-enter sticky top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow] duration-200 ${
        scrolled
          ? "bg-[var(--nav-bg)]/92 shadow-[0_8px_30px_-20px_rgba(59,42,30,0.45)] backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{ height: "calc(var(--shell-height) + env(safe-area-inset-top))" }}
    >
      <nav
        className="shell-inner flex h-[var(--shell-height)] items-center justify-between gap-3"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="min-w-0 shrink truncate font-display text-[0.95rem] font-semibold tracking-tight text-[var(--foreground)] transition hover:opacity-70"
        >
          {site.name}
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
          {links.map(({ href, label, match, section }) => {
            const active = isActive(match, section);
            return (
              <Link
                key={href}
                href={href}
                className={`relative rounded-md px-3 py-1.5 text-[0.8rem] tracking-wide transition ${
                  active
                    ? "font-medium text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-[var(--card)]/80 text-[var(--muted-foreground)] transition hover:bg-[var(--card-hover)] hover:text-[var(--foreground)] sm:inline-flex"
            aria-label="Open search"
          >
            <IconSearch className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition hover:bg-[var(--card-hover)] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span aria-hidden className="text-lg leading-none">
              {mobileOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id={menuId}
          className="absolute inset-x-0 top-full z-40 max-h-[min(70vh,28rem)] overflow-y-auto border-b border-[color-mix(in_srgb,var(--muted)_14%,transparent)] bg-[var(--background)]/98 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="shell-inner flex flex-col gap-1 py-3">
            {links.map(({ href, label, match, section }, i) => {
              const active = isActive(match, section);
              return (
                <Link
                  key={href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={href}
                  className={`rounded-md px-3 py-3.5 text-base font-medium transition hover:bg-[var(--card-hover)] ${
                    active
                      ? "bg-[var(--card)] text-[var(--foreground)]"
                      : "text-[var(--foreground)]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
            <button
              type="button"
              className="rounded-md px-3 py-3.5 text-left text-base font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)]"
              onClick={() => {
                setMobileOpen(false);
                onOpenPalette();
              }}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
