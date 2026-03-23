"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--nav-bg)]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="font-display text-lg font-bold tracking-tight text-[var(--foreground)] transition hover:opacity-80 sm:text-xl"
          onClick={() => setMobileOpen(false)}
        >
          <span className="text-[var(--accent)]">T</span>D
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden gap-8 sm:flex">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                {label}
              </a>
            ))}
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--foreground)] hover:bg-[var(--card-hover)] sm:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-14 z-40 bg-[var(--background)]/95 backdrop-blur-md transition-opacity duration-200 sm:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col gap-1 px-4 py-6">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-4 py-3 text-base font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)]"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
