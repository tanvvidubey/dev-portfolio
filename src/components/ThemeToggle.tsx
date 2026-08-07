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
        className="grid h-10 w-10 place-items-center rounded-full bg-[var(--card)] transition hover:bg-[var(--card-hover)] sm:hidden"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)]">
          {isDark ? (
            <IconMoon className="block h-3.5 w-3.5" />
          ) : (
            <IconSun className="block h-3.5 w-3.5" />
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
          className={`absolute top-1 grid h-7 w-7 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] transition-transform duration-200 ${
            isDark ? "translate-x-[1.85rem]" : "translate-x-0"
          }`}
        >
          {isDark ? (
            <IconMoon className="block h-3.5 w-3.5" />
          ) : (
            <IconSun className="block h-3.5 w-3.5" />
          )}
        </span>
        <span className="relative z-0 flex w-full items-center justify-between px-1.5 text-[var(--muted)]">
          <span className="grid h-7 w-7 place-items-center">
            <IconSun
              className={`block h-3.5 w-3.5 transition ${
                isDark ? "opacity-50" : "opacity-0"
              }`}
            />
          </span>
          <span className="grid h-7 w-7 place-items-center">
            <IconMoon
              className={`block h-3.5 w-3.5 transition ${
                isDark ? "opacity-0" : "opacity-50"
              }`}
            />
          </span>
        </span>
      </button>
    </>
  );
}
