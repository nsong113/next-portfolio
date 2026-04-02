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
          className="relative mb-16 before:content-[''] before:absolute before:-inset-5 before:rounded-full before:bg-[radial-gradient(circle,rgb(var(--accent-rgb)/0.10)_0%,transparent_70%)] before:-z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="[text-shadow:0_0_10px_rgba(80,5,255,0.28),0_0_24px_rgba(80,5,255,0.1)] font-jetbrains text-center text-3xl md:text-4xl dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]">
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

