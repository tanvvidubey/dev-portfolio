import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  slug: z.string(),
});

export type WritingPost = z.infer<typeof frontmatterSchema> & {
  body: string;
};

const writingDir = path.join(process.cwd(), "content/writing");

export function getAllPosts(): WritingPost[] {
  if (!fs.existsSync(writingDir)) return [];
  return fs
    .readdirSync(writingDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(writingDir, file), "utf8");
      const { data, content } = matter(raw);
      const meta = frontmatterSchema.parse(data);
      return { ...meta, body: content.trim() };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): WritingPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
