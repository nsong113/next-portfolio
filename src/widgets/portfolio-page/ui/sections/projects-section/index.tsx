"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/entities/project/model/project-data";
import { PortfolioSectionHeading } from "@/entities/portfolio";
import { ProjectCard } from "./ui/project-card";
import { staggerContainer } from "@/shared/lib/motion";

export function ProjectsSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <PortfolioSectionHeading>
          &gt; Project Repository
        </PortfolioSectionHeading>

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

