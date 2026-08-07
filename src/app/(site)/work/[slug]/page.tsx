import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/Page";
import { IconArrowRight } from "@/components/icons";
import {
  getCaseStudyProjects,
  getProject,
  hasCaseStudy,
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

function statusLabel(status: "live" | "private" | "archived") {
  if (status === "live") return "Live";
  if (status === "archived") return "Archived";
  return "Private";
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-8 first:pt-2">
      <h2 className="text-sm font-semibold tracking-wide text-[var(--accent)]">
        {title}
      </h2>
      <div className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
        {children}
      </div>
    </section>
  );
}

export default function WorkDetailPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project || !hasCaseStudy(project)) notFound();

  const detailed = getCaseStudyProjects();
  const currentIndex = detailed.findIndex((p) => p.slug === project.slug);
  const prev = currentIndex > 0 ? detailed[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < detailed.length - 1
      ? detailed[currentIndex + 1]
      : null;

  return (
    <Page as="article">
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
      >
        ← All projects
      </Link>

      <header className="mt-6 sm:mt-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1">
          <p className="section-label">Project details</p>
          <span className="text-xs text-[var(--muted)]">
            {project.kind === "personal" ? "Personal" : "Professional"}
            {" · "}
            {statusLabel(project.status)}
          </span>
        </div>
        <h1 className="type-title mt-3 text-[2rem] leading-tight text-[var(--foreground)] sm:mt-4 sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)] sm:mt-5 sm:text-lg">
          {project.description}
        </p>
        {project.role ? (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            <span className="font-medium text-[var(--foreground)]">Role. </span>
            {project.role}
          </p>
        ) : null}
        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
          {project.tags.map((tag) => (
            <li key={tag} className="text-sm text-[var(--muted)]">
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-10 divide-y divide-[color-mix(in_srgb,var(--muted)_18%,transparent)]">
        {project.problem ? (
          <DetailSection title="Problem">
            <p className="whitespace-pre-wrap">{project.problem}</p>
          </DetailSection>
        ) : null}
        {project.tradeoff ? (
          <DetailSection title="Tradeoff">
            <p>{project.tradeoff}</p>
          </DetailSection>
        ) : null}
        {project.alternatives && project.alternatives.length > 0 ? (
          <DetailSection title="What we considered">
            <ul className="space-y-3">
              {project.alternatives.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DetailSection>
        ) : null}
        {project.architecture ? (
          <DetailSection title="How it works">
            <p className="whitespace-pre-wrap">{project.architecture}</p>
          </DetailSection>
        ) : null}
        {project.decisions && project.decisions.length > 0 ? (
          <DetailSection title="Decisions">
            <ul className="space-y-3">
              {project.decisions.map((d) => (
                <li key={d} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </DetailSection>
        ) : null}
        {project.outcomes && project.outcomes.length > 0 ? (
          <DetailSection title="Outcomes">
            <ul className="space-y-3">
              {project.outcomes.map((o) => (
                <li key={o} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </DetailSection>
        ) : null}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--foreground)]">
            Want to go deeper on this project?
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Happy to walk through decisions and constraints.
          </p>
        </div>
        <Link href="/#contact" className="btn btn-primary w-full sm:w-auto sm:shrink-0">
          Ask about this project
        </Link>
      </div>

      {(prev || next) && (
        <nav
          aria-label="More projects"
          className="mt-10 grid gap-6 border-t border-[color-mix(in_srgb,var(--muted)_18%,transparent)] pt-8 sm:mt-12 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex min-h-11 flex-col gap-1"
            >
              <span className="text-xs text-[var(--muted)]">Previous</span>
              <span className="type-title text-lg text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
                {prev.name}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group flex min-h-11 flex-col gap-1 sm:items-end sm:text-right"
            >
              <span className="text-xs text-[var(--muted)]">Next</span>
              <span className="type-title inline-flex items-center gap-1.5 text-lg text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
                {next.name}
                <IconArrowRight className="h-3.5 w-3.5 opacity-60" />
              </span>
            </Link>
          ) : null}
        </nav>
      )}
    </Page>
  );
}
