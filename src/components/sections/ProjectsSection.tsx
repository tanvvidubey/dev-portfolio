import {
  getFeaturedProjects,
  getProfessionalProjects,
} from "@/content/projects";
import { ProjectsInteractive } from "./ProjectsInteractive";

const LIVE_PORTFOLIO_SLUGS = [
  "stratusedge",
  "bookmyprof",
  "fundsprout",
  "lightbreak",
  "oodles-ai",
  "gdpr-soft",
] as const;

export function ProjectsSection() {
  const featured = getFeaturedProjects();
  const liveSet = new Set<string>(LIVE_PORTFOLIO_SLUGS);
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const additional = getProfessionalProjects().filter(
    (p) => liveSet.has(p.slug) && !featuredSlugs.has(p.slug)
  );
  const projects = [...featured, ...additional];

  return <ProjectsInteractive projects={projects} />;
}
