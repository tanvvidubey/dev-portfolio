import type { ReactNode } from "react";

type PageHeaderProps = {
  label: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({
  label,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative mb-10 sm:mb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-10 h-36 w-36 rounded-full bg-[var(--accent)]/10 blur-3xl"
      />
      <p className="section-label">{label}</p>
      <h1 className="type-title mt-4 text-4xl text-[var(--foreground)] sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
      {children}
    </header>
  );
}
