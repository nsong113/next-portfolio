import { BlogSection } from "./sections/blog-section";
import { ContactSection } from "./sections/contact-section";
import { HeroAboutSection } from "./sections/hero-about-section/ui/hero-about-section";
import { HeroSection } from "./sections/hero-section";
import { PortfolioTicker } from "./sections/portfolio-ticker";
import { ProjectsSection } from "./sections/projects-section";
import { SkillsSection } from "./sections/skills-section";

export function PortfolioPage() {
  return (
    <main className="flex-1 overflow-x-hidden bg-transparent text-foreground">
      <div id="home" className="scroll-mt-24">
        <HeroSection />
      </div>

      <HeroAboutSection />

      <PortfolioTicker />

      <div id="blog" className="scroll-mt-24 py-10">
        <BlogSection />
      </div>

      <div id="skills" className="scroll-mt-24 py-10">
        <SkillsSection />
      </div>

      <div id="projects" className="scroll-mt-24 py-10">
        <ProjectsSection />
      </div>

      <div id="contact" className="scroll-mt-24 py-10">
        <ContactSection />
      </div>
    </main>
  );
}
