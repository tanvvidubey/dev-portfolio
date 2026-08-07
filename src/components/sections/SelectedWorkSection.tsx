import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import { getFeaturedProjects } from "@/content/projects";

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
              Selected work
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
              Products I built end to end, from problem to shipped system.
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

        <ul className="mt-10 space-y-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} as="li" delay={index * 60}>
              <Link href={`/work/${project.slug}`} className="project-row group">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[var(--muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="type-title text-xl text-[var(--foreground)] transition group-hover:text-[var(--accent)] sm:text-2xl">
                        {project.name}
                      </h3>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)] sm:pl-8">
                      {project.blurb ?? project.description}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 sm:pl-8">
                      {project.tags.slice(0, 4).map((tag) => (
                        <li
                          key={tag}
                          className="text-xs text-[var(--muted)]"
                        >
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
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
