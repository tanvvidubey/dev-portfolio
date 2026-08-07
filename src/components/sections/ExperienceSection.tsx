"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/content/experience";
import { Section } from "./Section";

export function ExperienceSection() {
  const [open, setOpen] = useState(-1);

  return (
    <Section id="experience" label="Experience" title="Where I've worked" alt>
      <ol className="space-y-4">
        {experience.map((job, index) => {
          const isOpen = open === index;
          return (
            <Reveal key={job.company} as="li" delay={index * 60}>
              <div className="surface-panel relative overflow-hidden transition">
                <button
                  type="button"
                  className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:p-7"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-[var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="type-title mt-2 text-xl text-[var(--foreground)] sm:text-2xl">
                      {job.role}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--muted-foreground)] sm:text-base">
                      {job.company} · {job.location}
                    </p>
                    {job.summary && !isOpen ? (
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
                        {job.summary}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                    <p className="text-sm font-medium text-[var(--accent)]">
                      {job.period}
                    </p>
                    <span
                      aria-hidden
                      className={`text-lg text-[var(--muted)] transition ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 px-5 pb-6 sm:px-7 sm:pb-7">
                      {job.summary ? (
                        <p className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">
                          {job.summary}
                        </p>
                      ) : null}
                      <ul className="space-y-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">
                        {job.highlights.map((item) => (
                          <li key={item.slice(0, 48)} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
