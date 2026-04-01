"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/entities/skill/model/skills-data";
import { SkillsCategoryCard } from "./ui/skills-category-card";
import { SkillsSummary } from "./ui/skills-summary";
import { useSkillsStats } from "./model/use-skills-stats";

export function SkillsSection() {
  const { categories, avg, getSkillsByCategory } = useSkillsStats();

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="atmospheric-glow mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="glow-text text-center text-3xl md:text-4xl">
            &gt; Skills Matrix
          </h2>
        </motion.div>

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

        <SkillsSummary totalSkills={SKILLS.length} avg={avg} />
      </div>
    </section>
  );
}

