import { Reveal } from "@/components/Reveal";
import { education } from "@/content/education";
import { Section } from "./Section";

export function EducationSection() {
  return (
    <Section id="education" label="Education" title="Background">
      <ul className="grid gap-4 sm:grid-cols-2">
        {education.map((item, index) => (
          <Reveal key={item.degree} as="li" delay={index * 80}>
            <article className="surface-panel h-full p-5 transition hover:-translate-y-0.5 sm:p-6">
              <h3 className="type-title text-lg text-[var(--foreground)] sm:text-xl">
                {item.degree}
              </h3>
              <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                {item.institution}, {item.location}
              </p>
              <p className="mt-2 text-sm font-medium text-[var(--accent)]">
                {item.period}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
