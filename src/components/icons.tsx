import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconGitHub({ title, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden={title ? undefined : true} {...props}>
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.295 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

export function IconLinkedIn({ title, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden={title ? undefined : true} {...props}>
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.004-4.125 2.062 2.062 0 0 1 .004 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

export function IconMail({ title, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden={title ? undefined : true} {...base} {...props}>
      {title ? <title>{title}</title> : null}
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function IconMapPin({ title, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden={title ? undefined : true} {...base} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconSearch({ title, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden={title ? undefined : true} {...base} {...props}>
      {title ? <title>{title}</title> : null}
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function IconSun({ title, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden={title ? undefined : true} {...base} {...props}>
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </svg>
  );
}

export function IconMoon({ title, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden={title ? undefined : true} {...base} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M20.2 14.3A8.2 8.2 0 0 1 9.7 3.8 8.5 8.5 0 1 0 20.2 14.3Z" />
    </svg>
  );
}

export function IconArrowRight({ title, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden={title ? undefined : true} {...base} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
