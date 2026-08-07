import Link from "next/link";
import { Page } from "@/components/Page";

export default function NotFound() {
  return (
    <Page className="!py-24 text-center">
      <p className="section-label">404</p>
      <h1 className="type-title mt-3 text-2xl sm:text-3xl">Page not found</h1>
      <p className="mx-auto mt-3 max-w-sm text-sm text-[var(--muted-foreground)]">
        That page doesn&apos;t exist. Head home or browse the work.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Home
        </Link>
        <Link href="/work" className="btn btn-secondary">
          Work
        </Link>
      </div>
    </Page>
  );
}
