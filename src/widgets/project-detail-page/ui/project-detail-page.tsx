import Image from "next/image";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { imageWithFallbackKey } from "@/shared/lib/static-import-url";
import { DragScrollCarousel } from "@/shared/ui/drag-scroll-carousel";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";

import detailBg from "@/shared/assets/images/detailBg.png";
import { PROJECTS } from "@/entities/project/model/project-data";

import { ProjectProblemCard } from "./project-problem-card";

type ProjectEntry = (typeof PROJECTS)[number];

export type ProjectDetailPageProps = {
  project: ProjectEntry & {
    portfolio: NonNullable<ProjectEntry["portfolio"]>;
  };
};

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const { portfolio } = project;

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 text-foreground md:px-6 ">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={detailBg}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div className="relative mt-28 z-10 mx-auto max-w-3xl">
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
        >
          <ArrowBigLeft className="size-4 shrink-0" aria-hidden />
          Back to projects
        </Link>

        <header className="mb-10">
          <p className="mb-2 text-xs text-muted-foreground">
            {portfolio.period}
          </p>
          <h1 className="font-bold [text-shadow:0_0_3px_rgba(80,5,255,0.035),0_0_8px_rgba(80,5,255,0.01)] mb-2 text-2xl md:text-3xl dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]">
            {portfolio.title}
          </h1>
          <p className="text-lg font-bold text-primary">{portfolio.subTitle}</p>
        </header>

        <div className="mb-10 space-y-4 rounded-[15px] border border-slate-900/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.26)_30%,rgba(245,243,255,0.18))] p-6 shadow-[0_4px_34px_rgba(0,0,0,0.12)] backdrop-blur-[20px] md:p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04)_30%,rgba(0,0,0,0.08))] dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
          <p className="font-sans leading-relaxed text-foreground/90 break-keep">
            {portfolio.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {portfolio.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-[rgb(var(--accent-rgb)/0.26)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.14),rgb(var(--accent-rgb)/0.05))] px-3 py-1 text-xs text-primary shadow-[0_6px_14px_rgba(2,6,23,0.08),0_2px_10px_rgb(var(--accent-rgb)/0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.22),rgb(var(--accent-rgb)/0.12))] hover:shadow-[0_10px_22px_rgba(2,6,23,0.12),0_6px_18px_rgb(var(--accent-rgb)/0.16)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {portfolio.image.length > 0 ? (
          <div className="-mx-4 mb-12 md:-mx-6">
            <DragScrollCarousel>
              {portfolio.image.map((src, i) => (
                <div
                  key={`${String(src)}-${i}`}
                  className="relative rounded-[15px] aspect-video w-[min(100vw-2rem,28rem)] shrink-0 overflow-hidden border border-border/60 bg-muted/20 sm:w-104"
                >
                  <ImageWithFallback
                    key={imageWithFallbackKey(src)}
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 640px) 85vw, 400px"
                    quality={75}
                  />
                </div>
              ))}
            </DragScrollCarousel>
          </div>
        ) : null}

        {portfolio.problems.length > 0 ? (
          <section className="space-y-8">
            <h2 className="text-xl text-primary">Problems &amp; solutions</h2>
            <ul className="space-y-8">
              {portfolio.problems.map((item) => (
                <ProjectProblemCard key={item.id} item={item} />
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
