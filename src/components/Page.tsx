import type { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  /** Wider canvas for dual-pane layouts */
  wide?: boolean;
  className?: string;
  as?: "div" | "article" | "section";
};

export function Page({
  children,
  wide = false,
  className = "",
  as: Tag = "div",
}: PageProps) {
  return (
    <Tag
      className={`page-enter px-[var(--page-pad)] py-12 sm:py-16 ${className}`}
    >
      <div
        className={`mx-auto w-full ${wide ? "max-w-[var(--page-wide)]" : "max-w-[var(--page-max)]"}`}
      >
        {children}
      </div>
    </Tag>
  );
}
