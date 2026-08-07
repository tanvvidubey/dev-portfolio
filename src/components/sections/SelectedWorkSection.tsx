import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import { getFeaturedProjects } from "@/content/projects";

const CARD_THEMES = [
  {
    panel: "bg-[var(--accent)] text-[var(--accent-foreground)]",
    muted: "text-[var(--accent-foreground)]/72",
    tag: "bg-[var(--accent-foreground)]/12 text-[var(--accent-foreground)]/85",
    wash: "bg-[var(--accent-foreground)]/10",
  },
  {
    panel: "bg-[var(--cream-deep)] text-[var(--foreground)]",
    muted: "text-[var(--muted)]",
    tag: "bg-[var(--background)]/55 text-[var(--muted)]",
    wash: "bg-[var(--accent)]/10",
  },
  {
    panel: "bg-[var(--ink)] text-[var(--cream)]",
    muted: "text-[var(--cream)]/68",
    tag: "bg-[var(--cream)]/10 text-[var(--cream)]/80",
    wash: "bg-[var(--cream)]/8",
  },
] as const;

export function SelectedWorkSection() {
  const projects = getFeaturedProjects().slice(0, 3);

  return (
    <section
      id="projects"
      className="section-band scroll-mt-[calc(var(--shell-height)+1.5rem)]"
    >
      <div className="section-band-inner">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">Selected work</p>
            <h2 className="type-title mt-4 text-3xl text-[var(--foreground)] sm:text-[2.5rem]">
              Built end to end
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
              A few products where I owned the path from problem to shipped
              system.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition hover:underline"
          >
            View all projects
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {projects.map((project, index) => {
            const theme = CARD_THEMES[index % CARD_THEMES.length];
            return (
              <Reveal key={project.slug} as="li" delay={index * 70}>
                <Link
                  href={`/work/${project.slug}`}
                  className={`feature-card group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[1.25rem] p-5 transition duration-300 hover:-translate-y-1 sm:min-h-[20rem] sm:p-6 ${theme.panel}`}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full blur-2xl ${theme.wash}`}
                  />
                  <div className="relative flex items-center justify-between gap-3">
                    <p
                      className={`font-mono text-[0.65rem] tracking-[0.18em] ${theme.muted}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p
                      className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide ${theme.tag}`}
                    >
                      {project.kind === "personal" ? "Personal" : "Pro"}
                    </p>
                  </div>
                  <h3 className="type-title relative mt-5 text-2xl leading-tight sm:text-[1.85rem]">
                    {project.name}
                  </h3>
                  <p
                    className={`relative mt-3 flex-1 text-sm leading-relaxed ${theme.muted}`}
                  >
                    {project.blurb ?? project.description}
                  </p>
                  <ul className="relative mt-5 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-full px-2 py-0.5 text-[0.65rem] ${theme.tag}`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <p className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium opacity-85 transition group-hover:translate-x-0.5 group-hover:opacity-100">
                    Case study
                    <IconArrowRight className="h-3.5 w-3.5" />
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
