"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrowRight, IconSearch } from "@/components/icons";
import type { Project, ProjectKind } from "@/content/projects";

function statusLabel(status: Project["status"]) {
  if (status === "live") return "Live";
  if (status === "archived") return "Archived";
  return "Private";
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="project-tile group h-full">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[0.65rem] tracking-[0.16em] text-[var(--muted)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full bg-[var(--background)]/55 px-2.5 py-0.5 text-[0.65rem] font-medium text-[var(--muted)]">
            {statusLabel(project.status)}
          </span>
        </div>

        <h3 className="type-title mt-4 text-xl text-[var(--foreground)] transition group-hover:text-[var(--accent)] sm:text-2xl">
          {project.name}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {project.blurb ?? project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-[var(--background)]/50 px-2.5 py-0.5 text-[0.7rem] text-[var(--muted)]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] opacity-80 transition group-hover:translate-x-0.5 group-hover:opacity-100">
          Read the story
          <IconArrowRight className="h-3.5 w-3.5" />
        </p>
      </div>
    </Link>
  );
}

function ProjectGrid({ items }: { items: Project[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((project, index) => (
        <li key={project.slug}>
          <ProjectCard project={project} index={index} />
        </li>
      ))}
    </ul>
  );
}

type KindFilter = "all" | ProjectKind;

export function WorkIndex({ projects }: { projects: Project[] }) {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const [kind, setKind] = useState<KindFilter>("all");
  const [tag, setTag] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const kindOk = kind === "all" || p.kind === kind;
      const tagOk = tag === "all" || p.tags.includes(tag);
      const query = q.trim().toLowerCase();
      const qOk =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.blurb?.toLowerCase().includes(query) ?? false) ||
        p.tags.some((t) => t.toLowerCase().includes(query));
      return kindOk && tagOk && qOk;
    });
  }, [projects, kind, tag, q]);

  const professional = filtered.filter((p) => p.kind === "professional");
  const personal = filtered.filter((p) => p.kind === "personal");

  return (
    <div>
      <div className="surface-panel p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <label className="sr-only" htmlFor="work-search">
              Search projects
            </label>
            <input
              id="work-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, stack, or topic"
              className="field w-full pl-10"
            />
          </div>
          <p className="shrink-0 text-sm tabular-nums text-[var(--muted)]">
            {filtered.length} of {projects.length}
          </p>
        </div>

        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by type"
        >
          {(
            [
              ["all", "All"],
              ["professional", "Professional"],
              ["personal", "Personal"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setKind(value)}
              className={`chip ${kind === value ? "chip-active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by topic"
      >
        <button
          type="button"
          onClick={() => setTag("all")}
          className={`chip ${tag === "all" ? "chip-active" : ""}`}
        >
          All topics
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t)}
            className={`chip ${tag === t ? "chip-active" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="surface-panel mt-10 py-12 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            Nothing matches that search.
          </p>
          <button
            type="button"
            className="mt-3 text-sm font-medium text-[var(--accent)] hover:underline"
            onClick={() => {
              setKind("all");
              setTag("all");
              setQ("");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-12 space-y-14">
          {professional.length > 0 && kind !== "personal" && (
            <section>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="section-label">Professional</p>
                  <h2 className="type-title mt-2 text-2xl text-[var(--foreground)]">
                    With teams
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--muted)]">
                    Products built with or for companies.
                  </p>
                </div>
                <p className="font-mono text-xs text-[var(--muted)]">
                  {String(professional.length).padStart(2, "0")}
                </p>
              </div>
              <ProjectGrid items={professional} />
            </section>
          )}
          {personal.length > 0 && kind !== "professional" && (
            <section>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="section-label">Personal</p>
                  <h2 className="type-title mt-2 text-2xl text-[var(--foreground)]">
                    Built for myself
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--muted)]">
                    Side projects and experiments.
                  </p>
                </div>
                <p className="font-mono text-xs text-[var(--muted)]">
                  {String(personal.length).padStart(2, "0")}
                </p>
              </div>
              <ProjectGrid items={personal} />
            </section>
          )}
        </div>
      )}
    </div>
  );
}
