import { Reveal } from "@/components/Reveal";
import { aboutCopy } from "@/content/site";
import { Section } from "./Section";

export function AboutSection({ className }: { className?: string }) {
  return (
    <Section
      id="about"
      label="About"
      title={aboutCopy.title}
      className={className}
      alt
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:gap-12">
        <Reveal>
          <div className="prose-simple text-[var(--muted-foreground)]">
            {aboutCopy.paragraphs.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <aside className="surface-panel h-fit p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              Focus
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
              {[
                "Full stack product delivery",
                "Marketplaces & payments",
                "AI features in production",
                "Clear, maintainable systems",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
