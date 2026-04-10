"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ui/project-card";
import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";
import { staggerContainer } from "@/shared/lib/motion";

import { PROJECTS } from "@/entities/project/model/project-data";

export function ProjectsSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <PortfolioSectionHeading>
          &gt; Projects
        </PortfolioSectionHeading>

        <motion.div
          className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.filter((p) => p.portfolio != null).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

