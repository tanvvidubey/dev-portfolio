"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/content/projects";
import { Reveal } from "@/components/Reveal";
import { Section } from "./Section";

type Props = {
  projects: Project[];
};

export function ProjectsInteractive({ projects }: Props) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.slice(0, 3).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const [active, setActive] = useState<string>("all");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <Section
      id="projects"
      label="Projects"
      title="Things I've built"
      description="Products and platforms I've shipped, from marketplaces and payments to AI tools teams rely on. Filter by topic, then open a write-up."
    >
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects"
      >
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`chip ${active === "all" ? "chip-active" : ""}`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActive(tag)}
            className={`chip ${active === tag ? "chip-active" : ""}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid gap-4 sm:gap-5">
        {filtered.map((project, index) => {
          const isHot = hovered === project.slug;
          return (
            <Reveal key={project.slug} as="li" delay={index * 40}>
              <Link
                href={`/work/${project.slug}`}
                className={`project-tile group ${isHot ? "is-hot" : ""}`}
                onMouseEnter={() => setHovered(project.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(project.slug)}
                onBlur={() => setHovered(null)}
              >
                <div className="flex flex-col gap-4 pl-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[var(--muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="type-title text-xl text-[var(--foreground)] transition group-hover:text-[var(--accent)] sm:text-2xl">
                        {project.name}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
                      {project.description}
                    </p>
                    <p
                      className={`mt-4 text-sm font-medium text-[var(--accent)] transition ${
                        isHot ? "translate-x-1 opacity-100" : "opacity-70"
                      }`}
                    >
                      Read the story →
                    </p>
                  </div>
                  <ul className="flex shrink-0 flex-wrap gap-2 sm:max-w-[14rem] sm:justify-end">
                    {project.tags.slice(0, 4).map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-[var(--radius)] px-2.5 py-1 text-xs transition ${
                          active === tag
                            ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                            : "bg-[var(--background)]/50 text-[var(--muted)]"
                        }`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-[var(--muted)]">
          Nothing in this filter.{" "}
          <button
            type="button"
            className="font-medium text-[var(--accent)] hover:underline"
            onClick={() => setActive("all")}
          >
            Show all
          </button>
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-5 text-sm">
        <Link
          href="/work"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          View all projects →
        </Link>
        <Link
          href="/writing"
          className="font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:underline"
        >
          Read my writing
        </Link>
      </div>
    </Section>
  );
}
