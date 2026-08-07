"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrowRight, IconSearch } from "@/components/icons";
import type { Project } from "@/content/projects";

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="project-row group">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-xs text-[var(--muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="type-title text-xl text-[var(--foreground)] transition group-hover:text-[var(--accent)] sm:text-2xl">
              {project.name}
            </h3>
            <span className="text-xs text-[var(--muted)]">
              {project.kind === "personal" ? "Personal" : "Professional"}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)] sm:pl-8">
            {project.blurb ?? project.description}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 sm:pl-8">
            {project.tags.slice(0, 5).map((tag) => (
              <li key={tag} className="text-xs text-[var(--muted)]">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <p className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--accent)] opacity-80 transition group-hover:translate-x-0.5 group-hover:opacity-100 sm:pt-1">
          Project details
          <IconArrowRight className="h-3.5 w-3.5" />
        </p>
      </div>
    </Link>
  );
}

function ProjectList({ items }: { items: Project[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-6 space-y-3">
      {items.map((project, index) => (
        <li key={project.slug}>
          <ProjectRow project={project} index={index} />
        </li>
      ))}
    </ul>
  );
}

export function WorkIndex({ projects }: { projects: Project[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.blurb?.toLowerCase().includes(query) ?? false) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }, [projects, q]);

  const professional = filtered.filter((p) => p.kind === "professional");
  const personal = filtered.filter((p) => p.kind === "personal");

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <label className="sr-only" htmlFor="work-search">
            Search projects
          </label>
          <input
            id="work-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects"
            className="field w-full pl-10"
          />
        </div>
        <p className="shrink-0 text-sm tabular-nums text-[var(--muted)]">
          {filtered.length} of {projects.length}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 py-10 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            Nothing matches that search.
          </p>
          <button
            type="button"
            className="mt-3 text-sm font-medium text-[var(--accent)] hover:underline"
            onClick={() => setQ("")}
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-12 space-y-12">
          {professional.length > 0 && (
            <section>
              <div className="flex items-end justify-between gap-4">
                <h2 className="type-title text-xl text-[var(--foreground)] sm:text-2xl">
                  Professional
                </h2>
                <p className="font-mono text-xs text-[var(--muted)]">
                  {String(professional.length).padStart(2, "0")}
                </p>
              </div>
              <ProjectList items={professional} />
            </section>
          )}
          {personal.length > 0 && (
            <section>
              <div className="flex items-end justify-between gap-4">
                <h2 className="type-title text-xl text-[var(--foreground)] sm:text-2xl">
                  Personal
                </h2>
                <p className="font-mono text-xs text-[var(--muted)]">
                  {String(personal.length).padStart(2, "0")}
                </p>
              </div>
              <ProjectList items={personal} />
            </section>
          )}
        </div>
      )}
    </div>
  );
}
