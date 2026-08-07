"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-enter px-[var(--page-pad)] py-24 text-center">
      <div className="mx-auto max-w-[var(--page-max)]">
        <p className="section-label">Error</p>
        <h1 className="type-title mt-3 text-2xl sm:text-3xl">
          Something broke on this page
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-[var(--muted-foreground)]">
          Reload to try again, or go home and continue from there.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            Reload
          </button>
          <Link href="/" className="btn btn-secondary">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
