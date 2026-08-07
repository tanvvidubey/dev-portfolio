"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconGitHub,
  IconLinkedIn,
  IconMail,
  IconMapPin,
} from "@/components/icons";
import { site } from "@/content/site";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--mx", `${x * 8}px`);
      el.style.setProperty("--my", `${y * 6}px`);
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const social = [
    {
      href: site.github,
      label: "GitHub",
      external: true,
      icon: IconGitHub,
    },
    {
      href: site.linkedin,
      label: "LinkedIn",
      external: true,
      icon: IconLinkedIn,
    },
    {
      href: `mailto:${site.email}`,
      label: "Email",
      external: false,
      icon: IconMail,
    },
  ] as const;

  return (
    <header
      ref={ref}
      className="hero-stage relative isolate min-h-[min(78vh,42rem)] overflow-visible pb-14 lg:pb-20"
    >
      {/* Full-bleed atmosphere, tucked under the sticky header */}
      <div
        aria-hidden
        className="hero-atmosphere pointer-events-none absolute -top-[var(--shell-height)] bottom-0 left-1/2 -z-10 w-screen max-w-[100vw] -translate-x-1/2"
      >
        <div className="hero-orb absolute inset-0 bg-[var(--background)]">
          <Image
            src="/images/hero-light.png"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-[62%_32%] dark:hidden"
          />
          <Image
            src="/images/hero-dark.png"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="hidden object-cover object-[62%_32%] dark:block"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-xl pt-3 sm:pt-4">
        <p className="hero-kicker reveal">
          <span>{site.role}</span>
        </p>

        <h1 className="reveal reveal-delay-1 relative mt-4 sm:mt-5">
          <span
            aria-hidden
            className="hero-name-sun pointer-events-none absolute left-[42%] top-[48%] -z-10 h-[8.5rem] w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:left-[38%] sm:h-[10.5rem] sm:w-[10.5rem] md:left-[36%] md:h-[12rem] md:w-[12rem] lg:h-[13.5rem] lg:w-[13.5rem]"
          />
          <span className="type-display relative block text-[3.5rem] leading-[0.9] text-[var(--foreground)] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {first}
          </span>
          <span className="type-display relative mt-1 block translate-x-0 text-[3.5rem] leading-[0.9] text-[var(--accent)] sm:mt-2 sm:translate-x-4 sm:text-6xl md:translate-x-8 md:text-7xl lg:text-[5.5rem]">
            {last}
          </span>
        </h1>

        {/* <span className="reveal reveal-delay-2 mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)]/70 px-3.5 py-1.5 text-xs font-medium text-[var(--muted-foreground)] backdrop-blur-sm">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-35" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          Open to opportunities
        </span> */}

        <p className="reveal reveal-delay-2 mt-6 max-w-md text-base leading-relaxed text-[var(--foreground)] sm:text-lg">
          {site.tagline}
        </p>

        <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
          <Link href="#projects" className="btn btn-primary">
            View projects
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <Link href="#contact" className="btn btn-secondary">
            Get in touch
          </Link>
          {/* <a
            href={site.cvUrl}
            download={site.cvFilename}
            className="btn btn-secondary"
          >
            Download CV
          </a> */}
        </div>

        <ul className="reveal reveal-delay-4 mt-10 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-[var(--muted)]">
          {social.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex items-center">
                {i > 0 ? (
                  <span className="mx-2.5 text-[var(--border)]" aria-hidden>
                    ·
                  </span>
                ) : null}
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex items-center gap-1.5 transition hover:text-[var(--foreground)]"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </a>
              </li>
            );
          })}
          <li className="flex items-center">
            <span className="mx-2.5 text-[var(--border)]" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5 text-[var(--muted-foreground)]">
              <IconMapPin className="h-3.5 w-3.5 shrink-0" />
              {site.location}
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
}
