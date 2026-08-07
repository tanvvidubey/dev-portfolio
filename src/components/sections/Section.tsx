import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /** Soft band background for visual separation */
  alt?: boolean;
};

export function Section({
  id,
  label,
  title,
  description,
  children,
  className = "",
  alt = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section-band scroll-mt-[calc(var(--shell-height)+1.5rem)] ${
        alt ? "section-band-alt" : ""
      } ${className}`}
    >
      <div className="section-band-inner">
        <p className="section-label">{label}</p>
        <h2 className="type-title mt-3 text-2xl text-[var(--foreground)] sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
            {description}
          </p>
        ) : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
