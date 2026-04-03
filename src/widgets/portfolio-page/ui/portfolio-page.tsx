import { ContactSection } from "./sections/contact-section";
import { HeroAboutSection } from "./sections/hero-about-section/ui/hero-about-section";
import { HeroSection } from "./sections/hero-section";
import { PortfolioTicker } from "./sections/portfolio-ticker";
import { ProjectsSection } from "./sections/projects-section";
import { SkillsSection } from "./sections/skills-section";

export function PortfolioPage() {
  return (
    <main className="flex-1 overflow-x-hidden bg-transparent text-foreground">
      <div id="portfolio-page">
        <HeroSection />
      </div>

      <HeroAboutSection />

      <PortfolioTicker />

      <div id="skills" className='py-10'>
        <SkillsSection />
      </div>

      <div id="projects" className='py-10'>
        <ProjectsSection />
      </div>

      <div id="contact" className='py-10'>
        <ContactSection />
      </div>
    </main>
  );
}
