import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/Page";
import { IconArrowRight } from "@/components/icons";
import {
  getCaseStudyProjects,
  getProject,
  hasCaseStudy,
  type Project,
} from "@/content/projects";
import { site } from "@/content/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project || !hasCaseStudy(project)) return {};
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} | ${site.name}`,
      description: project.description,
      images: ["/og-image.png"],
    },
  };
}

function statusLabel(status: Project["status"]) {
  if (status === "live") return "Live";
  if (status === "archived") return "Archived";
  return "Private details";
}

function CaseBlock({
  index,
  title,
  children,
  wide,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section
      className={`case-block surface-panel p-5 sm:p-7 ${wide ? "lg:col-span-2" : ""}`}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[0.65rem] tracking-[0.16em] text-[var(--accent)]">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="text-sm font-semibold tracking-wide text-[var(--foreground)]">
          {title}
        </h2>
      </div>
      <div className="mt-4 text-[var(--muted-foreground)]">{children}</div>
    </section>
  );
}

export default function WorkDetailPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project || !hasCaseStudy(project)) notFound();

  const caseStudies = getCaseStudyProjects();
  const currentIndex = caseStudies.findIndex((p) => p.slug === project.slug);
  const prev = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < caseStudies.length - 1
      ? caseStudies[currentIndex + 1]
      : null;

  const blocks: {
    key: string;
    title: string;
    wide?: boolean;
    content: React.ReactNode;
  }[] = [];

  if (project.problem) {
    blocks.push({
      key: "problem",
      title: "The problem",
      content: (
        <p className="whitespace-pre-wrap leading-relaxed">{project.problem}</p>
      ),
    });
  }
  if (project.tradeoff) {
    blocks.push({
      key: "tradeoff",
      title: "The tradeoff",
      content: <p className="leading-relaxed">{project.tradeoff}</p>,
    });
  }
  if (project.alternatives && project.alternatives.length > 0) {
    blocks.push({
      key: "alternatives",
      title: "What we considered",
      content: (
        <ul className="space-y-3">
          {project.alternatives.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (project.architecture) {
    blocks.push({
      key: "architecture",
      title: "How it works",
      wide: true,
      content: (
        <p className="whitespace-pre-wrap leading-relaxed">
          {project.architecture}
        </p>
      ),
    });
  }
  if (project.decisions && project.decisions.length > 0) {
    blocks.push({
      key: "decisions",
      title: "Choices that mattered",
      content: (
        <ul className="space-y-3">
          {project.decisions.map((d) => (
            <li key={d} className="flex gap-3 leading-relaxed">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
              />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (project.outcomes && project.outcomes.length > 0) {
    blocks.push({
      key: "outcomes",
      title: "What shipped",
      content: (
        <ul className="space-y-3">
          {project.outcomes.map((o) => (
            <li key={o} className="flex gap-3 leading-relaxed">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
              />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <Page as="article" wide>
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
      >
        ← All projects
      </Link>

      <header className="relative mt-8 overflow-hidden rounded-[1.35rem] bg-[var(--section-alt)] px-5 py-9 sm:px-9 sm:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--accent)]/14 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[var(--bark)]/10 blur-3xl dark:bg-[var(--moss)]/10"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="section-label">
                {project.kind === "personal" ? "Personal" : "Professional"}
              </p>
              <span className="rounded-full bg-[var(--card)] px-2.5 py-0.5 text-[0.65rem] font-medium text-[var(--muted)]">
                {statusLabel(project.status)}
              </span>
            </div>
            <h1 className="type-title mt-4 max-w-3xl text-4xl text-[var(--foreground)] sm:text-5xl lg:text-[3.35rem]">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
              {project.description}
            </p>
          </div>

          <aside className="rounded-[1.1rem] bg-[var(--card)]/70 p-5 backdrop-blur-sm">
            {project.role ? (
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  Role
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {project.role}
                </p>
              </div>
            ) : null}
            <div className={project.role ? "mt-5" : ""}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Stack
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-[var(--background)]/55 px-2.5 py-1 text-xs text-[var(--muted)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {blocks.map((block, i) => (
          <CaseBlock
            key={block.key}
            index={i + 1}
            title={block.title}
            wide={block.wide}
          >
            {block.content}
          </CaseBlock>
        ))}
      </div>

      <div className="relative mt-10 overflow-hidden rounded-[1.25rem] bg-[var(--accent)] px-5 py-7 text-[var(--accent-foreground)] sm:px-8 sm:py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--accent-foreground)]/10 blur-2xl"
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="type-title text-2xl sm:text-3xl">
              Want more depth on this build?
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed opacity-80">
              Happy to walk through decisions, constraints, and what I would do
              next.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--accent-foreground)] px-5 py-2.5 text-sm font-medium text-[var(--accent)] transition hover:opacity-90"
          >
            Ask about this project
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {(prev || next) && (
        <nav
          aria-label="More projects"
          className="mt-10 grid gap-3 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="surface-panel group flex flex-col gap-1 p-5 transition hover:-translate-y-0.5"
            >
              <span className="text-xs text-[var(--muted)]">Previous</span>
              <span className="type-title text-lg text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
                {prev.name}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="surface-panel group flex flex-col gap-1 p-5 text-right transition hover:-translate-y-0.5 sm:items-end"
            >
              <span className="text-xs text-[var(--muted)]">Next</span>
              <span className="type-title inline-flex items-center gap-1.5 text-lg text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
                {next.name}
                <IconArrowRight className="h-3.5 w-3.5 opacity-70" />
              </span>
            </Link>
          ) : null}
        </nav>
      )}
    </Page>
  );
}
