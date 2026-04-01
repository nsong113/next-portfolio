"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/shared/lib/motion";

type Skill = (typeof import("@/entities/skill/model/skills-data").SKILLS)[number];

type SkillItemProps = {
  skill: Skill;
  index: number;
};

export function SkillItem({ skill, index }: SkillItemProps) {
  return (
    <motion.div className="space-y-3" variants={staggerItem}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">{skill.name}</span>
        <motion.span
          className="text-sm text-primary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + index * 0.05 }}
        >
          {skill.percentage}%
        </motion.span>
      </div>

      <div className="relative h-2 overflow-hidden rounded-full bg-secondary/30">
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-secondary/50 via-secondary/30 to-secondary/50" />
        <motion.div
          className="relative h-full rounded-full bg-linear-to-r from-primary via-primary/80 to-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1,
            delay: 0.15 + index * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            boxShadow: "0 0 10px rgba(138, 43, 226, 0.4)",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

