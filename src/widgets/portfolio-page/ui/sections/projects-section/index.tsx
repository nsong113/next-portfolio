"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/entities/project/model/project-data";
import { ProjectCard } from "./ui/project-card";
import { staggerContainer } from "@/shared/lib/motion";

export function ProjectsSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mx-auto mb-16 w-fit"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="[text-shadow:0_0_3px_rgba(80,5,255,0.035),0_0_8px_rgba(80,5,255,0.01)] font-jetbrains text-center text-3xl md:text-4xl dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]">
            &gt; Project Repository
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

