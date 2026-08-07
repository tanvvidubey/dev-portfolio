import { Page } from "@/components/Page";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function HomePage() {
  return (
    <>
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
        <div className="mx-auto w-full max-w-[var(--page-wide)] px-[var(--page-pad)]">
          <HeroSection />
        </div>
      </div>
      <Page wide className="!pt-0 sm:!pt-0">
        <SelectedWorkSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </Page>
    </>
  );
}
