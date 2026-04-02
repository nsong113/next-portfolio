"use client";

import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";
import { SkillsCategoryCard } from "./ui/skills-category-card";

import { useSkillsStats } from "./model/use-skills-stats";

export function SkillsSection() {
  const { categories, getSkillsByCategory } = useSkillsStats();

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
      </div>
    </section>
  );
}

