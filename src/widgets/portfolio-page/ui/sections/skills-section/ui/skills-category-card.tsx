"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/shared/lib/motion";
import { SkillItem } from "./skill-item";

type Skill = (typeof import("@/entities/skill/model/skills-data").SKILLS)[number];

type SkillsCategoryCardProps = {
  category: string;
  categoryIndex: number;
  skills: Skill[];
};

export function SkillsCategoryCard({
  category,
  categoryIndex,
  skills,
}: SkillsCategoryCardProps) {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: categoryIndex * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <h3 className="mb-6 flex items-center gap-2 text-lg text-primary">
        <span className="text-primary/60">{"//"}</span>
        {category}
        <span className="text-sm text-primary/60">[{skills.length}]</span>
      </h3>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {skills.map((skill, index) => (
          <SkillItem key={skill.name} skill={skill} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
}

