"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/shared/data/skillsData";
import { staggerContainer, staggerItem } from "@/shared/lib/motion";

const CATEGORIES = Array.from(
  new Set(SKILLS.map((s) => s.category)),
) as string[];

export function SkillsSection() {
  const avg = Math.round(
    SKILLS.reduce((acc, s) => acc + s.percentage, 0) / SKILLS.length,
  );

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
          <h2 className="glow-text text-center font-mono text-3xl md:text-4xl">
            &gt; Skills Matrix
          </h2>
        </motion.div>

        <div className="space-y-8">
          {CATEGORIES.map((category, categoryIndex) => (
            <motion.div
              key={category}
              className="neo-card p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: categoryIndex * 0.08,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3 className="mb-6 flex items-center gap-2 font-mono text-lg text-primary">
                <span className="text-primary/60">{"//"}</span>
                {category}
                <span className="text-sm text-primary/60">
                  [{SKILLS.filter((s) => s.category === category).length}]
                </span>
              </h3>

              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {SKILLS.filter((s) => s.category === category).map(
                  (skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-3"
                      variants={staggerItem}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-foreground">
                          {skill.name}
                        </span>
                        <motion.span
                          className="font-mono text-sm text-primary"
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
                  ),
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="neo-card inline-block px-6 py-3">
            <p className="font-mono text-sm text-muted-foreground">
              [ {SKILLS.length} skills loaded • {avg}% avg proficiency ]
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
