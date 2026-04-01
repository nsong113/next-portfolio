"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";
import { staggerItem } from "@/shared/lib/motion";

type Project = (typeof import("@/entities/project/model/project-data").PROJECTS)[number];

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      variants={staggerItem}
      className={`group relative flex h-full min-h-0 flex-col overflow-hidden transition-all duration-500 neo-card hover:scale-[1.02] ${
        project.tags && project.tags.length > 0 ? "ring-1 ring-primary/30" : ""
      }`}
      whileHover={{ y: -4 }}
    >
      {project.tags.length > 0 ? (
        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center justify-center rounded-[40px] border border-[#3D4352] bg-[#2E3442] px-4 py-2 text-xs text-foreground/90 opacity-50"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="relative aspect-video shrink-0 overflow-hidden bg-secondary/40">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-6">
        <h3 className="mb-3 text-lg leading-snug text-primary">
          {project.title}
        </h3>
        <p className="mb-4 font-sans leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-[#3D4352] bg-[#2E3442]/70 px-2.5 py-1 text-[11px] leading-tight text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground/90"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-start gap-3">
          {project.portfolio ? (
            <motion.div whileTap={{ scale: 0.97 }} className="inline-flex">
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex rounded-lg px-4 py-2 text-sm text-white opacity-80 shadow-sm transition-opacity hover:opacity-95"
                style={{
                  background:
                    "linear-gradient(90deg, #8a2be2 0%, #4973FF 100%), #111",
                }}
              >
                View Details
              </Link>
            </motion.div>
          ) : null}
          {project.liveUrl ? (
            <motion.a
              href={project.liveUrl}
              className="neo-button inline-flex px-4 py-2 text-sm text-primary"
              whileTap={{ scale: 0.97 }}
            >
              View Live
            </motion.a>
          ) : null}
          {project.codeUrl ? (
            <motion.a
              href={project.codeUrl}
              className="inline-flex rounded-lg border border-muted-foreground px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
              whileTap={{ scale: 0.97 }}
            >
              View Code
            </motion.a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

