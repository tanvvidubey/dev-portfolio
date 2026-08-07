"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@/components/icons";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="h-10 w-10 rounded-full bg-[var(--section-alt)] sm:h-9 sm:w-[4.25rem]"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {/* Compact control on small screens */}
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)] text-[var(--accent-foreground)] transition hover:bg-[var(--card-hover)] sm:hidden"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]">
          {isDark ? (
            <IconMoon className="h-3.5 w-3.5" />
          ) : (
            <IconSun className="h-3.5 w-3.5" />
          )}
        </span>
      </button>

      {/* Full toggle from sm up */}
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative hidden h-9 w-[4.25rem] items-center rounded-full bg-[var(--card)] p-1 transition hover:bg-[var(--card-hover)] sm:flex"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span
          aria-hidden
          className={`absolute top-1 h-7 w-7 rounded-full bg-[var(--accent)] transition-transform duration-200 ${
            isDark ? "translate-x-[1.85rem]" : "translate-x-0"
          }`}
        />
        <span className="relative z-10 flex w-full items-center justify-between px-1.5 text-[var(--muted)]">
          <IconSun
            className={`h-3.5 w-3.5 transition ${
              isDark ? "opacity-50" : "text-[var(--accent-foreground)]"
            }`}
          />
          <IconMoon
            className={`h-3.5 w-3.5 transition ${
              isDark ? "text-[var(--accent-foreground)]" : "opacity-50"
            }`}
          />
        </span>
      </button>
    </>
  );
}
