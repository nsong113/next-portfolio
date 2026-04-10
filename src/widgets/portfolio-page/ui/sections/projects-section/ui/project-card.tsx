"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ImageWithFallback,
  imageWithFallbackKey,
} from "@/shared/ui/image-with-fallback";
import { ProjectLinkButton } from "@/shared/ui/project-link-button";

import { staggerItem } from "@/shared/lib/motion";
import { useResolvedTheme } from "@/shared/lib/theme/use-resolved-theme";

type Project = (typeof import("@/entities/project/model/project-data").PROJECTS)[number];

type ProjectCardProps = {
  project: Project & { portfolio: NonNullable<Project["portfolio"]> };
};

export function ProjectCard({ project }: ProjectCardProps) {
  const detailsHref = project.portfolio ? `/projects/${project.id}` : null;
  const { isDark, isReady } = useResolvedTheme();
  const detailsGradient = isReady
    ? isDark
      ? "linear-gradient(90deg, #F97BFD 0%, #04C9BF 100%)"
      : "linear-gradient(90deg, #04C9BF 0%, #F97BFD 100%)"
    : "linear-gradient(90deg, #04C9BF 0%, #FCDDFF 100%)";

  return (
    <motion.article
      variants={staggerItem}
      className={`group relative flex h-full min-h-0 flex-col overflow-hidden rounded-[15px] border border-slate-900/10 
        bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.26)_30%,rgba(245,243,255,0.18))] 
        shadow-[0_4px_34px_rgba(0,0,0,0.12)] backdrop-blur-[20px] transition-all duration-500 hover:scale-[1.02] dark:border-white/10 
        dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04)_30%,rgba(0,0,0,0.08))] 
        dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)] ${
        project.tags && project.tags.length > 0 ? "ring-1 ring-primary/30" : ""
      }`}
      whileHover={{ y: -4 }}
    >
      {detailsHref ? (
        <Link
          href={detailsHref}
          aria-label={`View details: ${project.portfolio.title}`}
          className="absolute inset-0 z-1"
        />
      ) : null}

      {project.tags.length > 0 ? (
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5 sm:left-4 sm:top-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex max-w-full items-center truncate rounded-lg border border-white/25 bg-black/55 px-2.5 py-1 text-[11px] font-semibold leading-tight text-white shadow-[0_2px_12px_rgba(0,0,0,0.45)] backdrop-blur-sm dark:border-white/20 dark:bg-black/65 sm:rounded-xl sm:px-3 sm:py-1.5 sm:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="relative aspect-video shrink-0 overflow-hidden bg-secondary/40">
        <ImageWithFallback
          key={imageWithFallbackKey(project.portfolio.image[0])}
          src={project.portfolio.image[0]}
          alt={project.portfolio.title}
          className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1536px) 45vw, 576px"
          quality={75}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-6">
        <h3 className="mb-3 text-2xl font-bold leading-snug text-primary">
          {project.portfolio.title}
        </h3>
        <p className="mb-4 break-keep leading-relaxed text-muted-foreground">
          {project.portfolio.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.portfolio.technologies.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="inline-flex items-center px-1 py-1 text-[13px] leading-tight text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground/90"
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
                className="inline-flex rounded-[15px] px-4 py-2 text-sm text-white opacity-80 shadow-sm transition-opacity hover:opacity-95"
                style={{
                  background: detailsGradient,
                }}
              >
                View Details
              </Link>
            </motion.div>
          ) : null}

          {project.liveUrl ? (
            <ProjectLinkButton href={project.liveUrl}>
              View Live
            </ProjectLinkButton>
          ) : null}

          {project.codeUrl ? (
            <ProjectLinkButton href={project.codeUrl}>
              View Code
            </ProjectLinkButton>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

