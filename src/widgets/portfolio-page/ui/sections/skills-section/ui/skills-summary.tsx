"use client";

import { motion } from "framer-motion";

type SkillsSummaryProps = {
  totalSkills: number;
  avg: number;
};

export function SkillsSummary({ totalSkills, avg }: SkillsSummaryProps) {
  return (
    <motion.div
      className="mt-12 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="glass-card inline-block px-6 py-3">
        <p className="text-sm text-muted-foreground">
          [ {totalSkills} skills loaded • {avg}% avg proficiency ]
        </p>
      </div>
    </motion.div>
  );
}

