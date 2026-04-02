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
  const isCoreSkill = category === "Frontend";

  return (
    <motion.div
      className="rounded-[28px] border border-slate-900/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.26)_30%,rgba(245,243,255,0.18))] p-6 shadow-[0_4px_34px_rgba(0,0,0,0.12)] backdrop-blur-[20px] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04)_30%,rgba(0,0,0,0.08))] dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: categoryIndex * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <h3 className="mb-6 flex items-center gap-2 text-lg text-foreground">
        <span className="text-primary/60">{"//"}</span>
        <span className={isCoreSkill ? "font-bold" : ""}>
          {category}
        </span>
        <span className="text-sm text-primary/60">[{skills.length}]</span>
      </h3>

      <motion.div
        className={[
          "grid grid-cols-1 gap-6",
          isCoreSkill ? "md:grid-cols-2" : "md:grid-cols-3",
        ].join(" ")}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {skills.map((skill, index) => (
          <SkillItem key={skill.name} skill={skill} index={index} isCoreSkill={isCoreSkill} />
        ))}
      </motion.div>
    </motion.div>
  );
}

