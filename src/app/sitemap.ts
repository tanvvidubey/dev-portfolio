import { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getCaseStudyProjects } from "@/content/projects";
import { getAllPosts } from "@/content/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const work = getCaseStudyProjects().map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const writing = getAllPosts().map((p) => ({
    url: `${site.url}/writing/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticRoutes = ["", "/work", "/writing", "/stack", "/about"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  return [...staticRoutes, ...work, ...writing];
}
