import type { Metadata } from "next";
import Link from "next/link";
import { Page } from "@/components/Page";
import { PageHeader } from "@/components/PageHeader";
import { stackGroups } from "@/content/stack";

export const metadata: Metadata = {
  title: "Tools",
  description: "Tools Tanvi reaches for when building products.",
};

export default function StackPage() {
  return (
    <Page>
      <PageHeader
        label="Tools"
        title="What I work with"
        description="Chosen for the job, not as a logo wall."
      />
      <div className="space-y-6">
        {stackGroups.map((group) => (
          <section key={group.title} className="surface-panel overflow-hidden">
            <div className="px-5 py-4 sm:px-6">
              <h2 className="text-sm font-semibold tracking-wide text-[var(--foreground)]">
                {group.title}
              </h2>
            </div>
            <ul className="space-y-0">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-6"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {item.name}
                  </span>
                  <span className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:max-w-sm sm:text-right">
                    {item.why}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-12 text-sm text-[var(--muted)]">
        Prefer stories over tools?{" "}
        <Link
          href="/work"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          See the work
        </Link>
        .
      </p>
    </Page>
  );
}
