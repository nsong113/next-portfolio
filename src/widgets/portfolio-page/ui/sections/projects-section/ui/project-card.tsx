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
  const detailsHref = project.portfolio ? `/projects/${project.id}` : null;

  return (
    <motion.article
      variants={staggerItem}
      className={`group relative flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-slate-900/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.26)_30%,rgba(245,243,255,0.18))] shadow-[0_4px_34px_rgba(0,0,0,0.12)] backdrop-blur-[20px] transition-all duration-500 hover:scale-[1.02] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04)_30%,rgba(0,0,0,0.08))] dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)] ${
        project.tags && project.tags.length > 0 ? "ring-1 ring-primary/30" : ""
      }`}
      whileHover={{ y: -4 }}
    >
      {detailsHref ? (
        <Link
          href={detailsHref}
          aria-label={`View details: ${project.title}`}
          className="absolute inset-0 z-1"
        />
      ) : null}

      {project.tags.length > 0 ? (
        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center justify-center rounded-full border border-border/30 bg-background/40 px-4 py-2 text-xs text-foreground/80"
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
        <h3 className="mb-3 text-2xl font-bold leading-snug text-primary">
          {project.title}
        </h3>
        <p className="mb-4 break-keep leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-[11px] leading-tight text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground/90"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="relative z-2 mt-auto flex flex-wrap items-center justify-start gap-3">
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
              className="inline-flex rounded-lg border border-[rgb(var(--accent-rgb)/0.34)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.10),rgb(var(--accent-rgb)/0.05))] px-4 py-2 text-sm text-primary shadow-[0_2px_12px_rgb(var(--accent-rgb)/0.14),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-px hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.18),rgb(var(--accent-rgb)/0.10))] hover:shadow-[0_6px_20px_rgb(var(--accent-rgb)/0.22),inset_0_1px_0_rgba(255,255,255,0.70)] dark:border-[rgba(138,43,226,0.40)] dark:bg-[linear-gradient(145deg,rgba(138,43,226,0.10),rgba(138,43,226,0.05))] dark:shadow-[0_2px_8px_rgba(138,43,226,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-[linear-gradient(145deg,rgba(138,43,226,0.20),rgba(138,43,226,0.10))] dark:hover:shadow-[0_4px_16px_rgba(138,43,226,0.25),inset_0_1px_0_rgba(255,255,255,0.10)]"
              whileTap={{ scale: 0.97 }}
            >
              View Live
            </motion.a>
          ) : null}

          {project.codeUrl ? (
            <motion.a
              href={project.codeUrl}
              className="inline-flex rounded-lg border border-[rgb(var(--accent-rgb)/0.34)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.10),rgb(var(--accent-rgb)/0.05))] px-4 py-2 text-sm text-primary shadow-[0_2px_12px_rgb(var(--accent-rgb)/0.14),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-px hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.18),rgb(var(--accent-rgb)/0.10))] hover:shadow-[0_6px_20px_rgb(var(--accent-rgb)/0.22),inset_0_1px_0_rgba(255,255,255,0.70)] dark:border-[rgba(138,43,226,0.40)] dark:bg-[linear-gradient(145deg,rgba(138,43,226,0.10),rgba(138,43,226,0.05))] dark:shadow-[0_2px_8px_rgba(138,43,226,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-[linear-gradient(145deg,rgba(138,43,226,0.20),rgba(138,43,226,0.10))] dark:hover:shadow-[0_4px_16px_rgba(138,43,226,0.25),inset_0_1px_0_rgba(255,255,255,0.10)]"
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

