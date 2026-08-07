"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  run: () => void | Promise<void>;
};

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [
      { id: "home", label: "Go home", group: "Navigate", run: () => router.push("/") },
      { id: "about", label: "About", group: "Navigate", run: () => router.push("/#about") },
      {
        id: "experience",
        label: "Experience",
        group: "Navigate",
        run: () => router.push("/#experience"),
      },
      { id: "work", label: "Projects", group: "Navigate", run: () => router.push("/work") },
      {
        id: "writing",
        label: "Writing",
        group: "Navigate",
        run: () => router.push("/writing"),
      },
      { id: "stack", label: "Tools", group: "Navigate", run: () => router.push("/stack") },
      {
        id: "contact",
        label: "Contact",
        group: "Navigate",
        run: () => router.push("/#contact"),
      },
    ];

    const projectCmds: Command[] = projects.map((p) => ({
      id: `p-${p.slug}`,
      label: p.name,
      hint: "project",
      group: "Projects",
      run: () => router.push(`/work/${p.slug}`),
    }));

    const actions: Command[] = [
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        group: "Actions",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "email",
        label: "Copy email",
        hint: site.email,
        group: "Actions",
        run: async () => {
          await navigator.clipboard.writeText(site.email);
        },
      },
    ];

    return [...nav, ...projectCmds, ...actions];
  }, [router, resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        (c.hint?.toLowerCase().includes(q) ?? false)
    );
  }, [commands, query]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const run = useCallback(
    async (cmd: Command) => {
      close();
      await cmd.run();
    },
    [close]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-[var(--ink)]/40 px-4 pt-[12vh] backdrop-blur-sm"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="w-full max-w-lg overflow-hidden rounded-lg bg-[var(--card)] shadow-lg"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            close();
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter" && filtered[active]) {
            e.preventDefault();
            void run(filtered[active]);
          }
        }}
      >
        <label className="sr-only" htmlFor="command-input">
          Command
        </label>
        <input
          id="command-input"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages and projects…"
          className="w-full bg-transparent px-4 py-3.5 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
          aria-controls={listId}
          aria-autocomplete="list"
          role="combobox"
          aria-expanded
          aria-activedescendant={
            filtered[active] ? `cmd-${filtered[active].id}` : undefined
          }
        />
        <ul
          id={listId}
          role="listbox"
          className="max-h-80 overflow-y-auto py-2"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-sm text-[var(--muted)]">
              No matches, try “work” or a project name.
            </li>
          )}
          {filtered.map((cmd, i) => (
            <li key={cmd.id} role="option" aria-selected={i === active}>
              <button
                id={`cmd-${cmd.id}`}
                type="button"
                className={`flex w-full items-baseline justify-between gap-3 px-4 py-2.5 text-left text-sm ${
                  i === active
                    ? "bg-[var(--section-alt)] text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--section-alt)]"
                }`}
                onMouseEnter={() => setActive(i)}
                onClick={() => void run(cmd)}
              >
                <span>{cmd.label}</span>
                <span className="text-xs text-[var(--muted)]">
                  {cmd.hint ?? cmd.group}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
