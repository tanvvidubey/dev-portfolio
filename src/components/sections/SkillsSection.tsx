"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { skills, skillsIntro } from "@/content/skills";
import { Section } from "./Section";

export function SkillsSection() {
  const [active, setActive] = useState(0);

  return (
    <Section
      id="skills"
      label="Skills"
      title="What I work with"
      description={skillsIntro}
    >
      <div className="grid gap-4 lg:grid-cols-[13rem_1fr]">
        <div
          className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
          role="tablist"
          aria-label="Skill groups"
        >
          {skills.map((group, index) => (
            <button
              key={group.title}
              type="button"
              role="tab"
              aria-selected={active === index}
              id={`skill-tab-${index}`}
              aria-controls={`skill-panel-${index}`}
              onClick={() => setActive(index)}
              className={`shrink-0 rounded-[var(--radius)] px-3 py-2.5 text-left text-sm transition lg:w-full ${
                active === index
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "bg-[var(--card)]/70 text-[var(--muted-foreground)] hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]"
              }`}
            >
              {group.title}
            </button>
          ))}
        </div>

        <Reveal key={active}>
          <div
            id={`skill-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`skill-tab-${active}`}
            className="surface-panel min-h-[12rem] p-5 sm:p-7"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="type-title text-xl text-[var(--foreground)] sm:text-2xl">
                {skills[active].title}
              </h3>
              <span className="font-mono text-xs text-[var(--muted)]">
                {skills[active].items.length} tools
              </span>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {skills[active].items.map((item, i) => (
                <li key={item}>
                  <button
                    type="button"
                    className="skill-chip"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
