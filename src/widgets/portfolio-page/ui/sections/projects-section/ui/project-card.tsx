"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ImageWithFallback,
  imageWithFallbackKey,
} from "@/shared/ui/image-with-fallback";
import { ProjectLinkButton } from "@/shared/ui/project-link-button";
import { staggerItem } from "@/shared/lib/motion";
import { useResolvedTheme } from "@/shared/lib/theme/use-resolved-theme";

type Project = (typeof import("@/entities/project/model/project-data").PROJECTS)[number];

type ProjectCardProps = {
  project: Project;
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
      className={`group relative flex h-full min-h-0 flex-col overflow-hidden rounded-[15px] border border-slate-900/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.26)_30%,rgba(245,243,255,0.18))] shadow-[0_4px_34px_rgba(0,0,0,0.12)] backdrop-blur-[20px] transition-all duration-500 hover:scale-[1.02] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04)_30%,rgba(0,0,0,0.08))] dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)] ${
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
              className="inline-flex items-center justify-center rounded-[15px] border border-border/30 bg-background/40 px-4 py-1 font-bold text-xs text-foreground/80"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="relative aspect-video shrink-0 overflow-hidden bg-secondary/40">
        <ImageWithFallback
          key={imageWithFallbackKey(project.image)}
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1536px) 45vw, 576px"
          quality={75}
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

