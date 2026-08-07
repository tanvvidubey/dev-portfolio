import type { Metadata } from "next";
import Link from "next/link";
import { Page } from "@/components/Page";
import { PageHeader } from "@/components/PageHeader";
import { IconArrowRight } from "@/components/icons";
import { getAllPosts } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on careers, building, and learning in tech.",
};

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <Page wide>
      <PageHeader
        label="Writing"
        title="Notes"
        // description="Short essays on building products, growing in tech, and staying human in a fast industry."
      >
        {/* <p className="mt-4 font-mono text-xs text-[var(--muted)]">
          {posts.length} notes · newest first
        </p> */}
      </PageHeader>

      <ul className="grid gap-4 sm:grid-cols-2">
        {posts.map((post, index) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group flex h-full flex-col rounded-[1.15rem] bg-[var(--card)] p-5 transition hover:-translate-y-0.5 hover:bg-[var(--card-hover)] sm:p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-mono text-[0.65rem] tracking-wider text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="font-mono text-[0.65rem] text-[var(--muted)]">
                  {readingMinutes(post.body)} min
                </p>
              </div>
              <h2 className="type-title mt-4 text-xl text-[var(--foreground)] transition group-hover:text-[var(--accent)] sm:text-2xl">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {post.description}
              </p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <p className="font-mono text-xs text-[var(--muted)]">
                  {formatDate(post.date)}
                </p>
                <p className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] opacity-80 transition group-hover:translate-x-0.5 group-hover:opacity-100">
                  Read
                  <IconArrowRight className="h-3.5 w-3.5" />
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
