import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/Page";
import { IconArrowRight } from "@/components/icons";
import { getAllPosts, getPost } from "@/content/writing";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export default function WritingPostPage({ params }: Props) {
  const posts = getAllPosts();
  const post = getPost(params.slug);
  if (!post) notFound();

  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined;

  const paragraphs = post.body
    .split(/\n\n+/)
    .map((para) => para.replace(/\*\*(.*?)\*\*/g, "$1").trim())
    .filter(Boolean);

  return (
    <Page as="article">
      <Link
        href="/writing"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
      >
        <span aria-hidden>←</span>
        All notes
      </Link>

      <header className="relative mt-8 overflow-hidden rounded-[1.15rem] bg-[var(--section-alt)] px-5 py-8 sm:px-8 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[var(--accent)]/15 blur-3xl"
        />
        <p className="section-label relative">Note</p>
        <p className="relative mt-4 font-mono text-xs text-[var(--muted)]">
          {formatDate(post.date)} · {readingMinutes(post.body)} min read
        </p>
        <h1 className="type-title relative mt-4 max-w-3xl text-3xl text-[var(--foreground)] sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
          {post.description}
        </p>
      </header>

      <div className="prose-article mt-10 text-[var(--muted-foreground)]">
        {paragraphs.map((para, i) => (
          <p key={`${post.slug}-${i}`} className={i === 0 ? "first-graf" : undefined}>
            {para}
          </p>
        ))}
      </div>

      <nav
        aria-label="More notes"
        className="mt-14 grid gap-4 sm:grid-cols-2"
      >
        {older ? (
          <Link
            href={`/writing/${older.slug}`}
            className="group rounded-[1rem] bg-[var(--card)] p-5 transition hover:-translate-y-0.5 hover:bg-[var(--card-hover)]"
          >
            <p className="font-mono text-[0.65rem] tracking-wider text-[var(--muted)]">
              Older
            </p>
            <p className="type-title mt-2 text-lg text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
              {older.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {newer ? (
          <Link
            href={`/writing/${newer.slug}`}
            className="group rounded-[1rem] bg-[var(--card)] p-5 text-right transition hover:-translate-y-0.5 hover:bg-[var(--card-hover)] sm:justify-self-stretch"
          >
            <p className="font-mono text-[0.65rem] tracking-wider text-[var(--muted)]">
              Newer
            </p>
            <p className="type-title mt-2 inline-flex items-center justify-end gap-1.5 text-lg text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
              {newer.title}
              <IconArrowRight className="h-3.5 w-3.5 opacity-60 transition group-hover:translate-x-0.5" />
            </p>
          </Link>
        ) : null}
      </nav>
    </Page>
  );
}
