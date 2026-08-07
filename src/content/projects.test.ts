import { describe, expect, it } from "vitest";
import { hasCaseStudy, projects } from "@/content/projects";

describe("projects content", () => {
  it("has no live urls", () => {
    for (const p of projects) {
      expect(p.url).toBeUndefined();
      expect(p.status).toBe("private");
    }
  });

  it("featured projects have case studies", () => {
    for (const p of projects.filter((x) => x.featured)) {
      expect(hasCaseStudy(p)).toBe(true);
    }
  });

  it("separates personal projects", () => {
    const personal = projects.filter((p) => p.kind === "personal");
    expect(personal.map((p) => p.slug).sort()).toEqual(["kotomo", "mann"]);
    expect(
      projects.every((p) => p.kind === "professional" || p.kind === "personal")
    ).toBe(true);
  });
});
