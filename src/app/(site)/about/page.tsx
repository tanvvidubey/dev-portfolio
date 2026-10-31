import type { Metadata } from "next";
import Link from "next/link";
import { Page } from "@/components/Page";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, full stack developer in Pune.`,
};

export default function AboutPage() {
  return (
    <Page wide>
      <AboutSection className="!mt-0 !pt-0" />
      <div className="surface-panel mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4 text-sm text-[var(--muted-foreground)] sm:px-6">
        <span>Also on this site:</span>
        <Link href="/#experience" className="text-[var(--accent)] hover:underline">
          Experience
        </Link>
        <Link href="/#skills" className="text-[var(--accent)] hover:underline">
          Skills
        </Link>
        <Link href="/work" className="text-[var(--accent)] hover:underline">
          Projects
        </Link>
        <Link href="/writing" className="text-[var(--accent)] hover:underline">
          Writing
        </Link>
      </div>
      <ContactSection className="!mt-16" />
    </Page>
  );
}
