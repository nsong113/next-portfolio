"use client";

// import { SKILLS } from "@/entities/skill/model/skills-data";
import { PortfolioSectionHeading } from "@/entities/portfolio";
import { SkillsCategoryCard } from "./ui/skills-category-card";
// import { SkillsSummary } from "./ui/skills-summary";
import { useSkillsStats } from "./model/use-skills-stats";

export function SkillsSection() {
  const { categories, avg, getSkillsByCategory } = useSkillsStats();

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <PortfolioSectionHeading viewport={{ once: true, amount: 0.4 }}>
          &gt; Skills Matrix
        </PortfolioSectionHeading>

        <div className="space-y-8">
          {categories.map((category, categoryIndex) => (
            <SkillsCategoryCard
              key={category}
              category={category}
              categoryIndex={categoryIndex}
              skills={getSkillsByCategory(category)}
            />
          ))}
        </div>

        {/* <SkillsSummary totalSkills={SKILLS.length} avg={avg} /> */}
      </div>
    </section>
  );
}

