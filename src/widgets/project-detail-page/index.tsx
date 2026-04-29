import Image from "next/image";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import detailBg from "@/shared/assets/images/detailBg.png";
import { PROJECTS } from "@/entities/project/model/project-data";

import { ProjectDetailGallery } from "./ui/project-detail-gallery";
import { ProjectProblemCard } from "./ui/project-problem-card";
import {
  isRetroProblemItem,
  ProjectRetroCard,
} from "./ui/project-retro-card";

type ProjectEntry = (typeof PROJECTS)[number];

export type ProjectDetailPageProps = {
  project: ProjectEntry & {
    portfolio: NonNullable<ProjectEntry["portfolio"]>;
  };
};

function renderLinkifiedText(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => {
    const parts = line.split(urlRegex);

    return (
      <span key={`line-${lineIndex}`}>
        {parts.map((part, partIndex) => {
          const isUrl = urlRegex.test(part);
          urlRegex.lastIndex = 0;

          if (!isUrl) return <span key={`text-${lineIndex}-${partIndex}`}>{part}</span>;

          return (
            <Link
              key={`link-${lineIndex}-${partIndex}`}
              href={part}
              target="_blank"
              rel="noreferrer noopener"
              className="break-all text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {part}
            </Link>
          );
        })}
        {lineIndex < lines.length - 1 ? <br /> : null}
      </span>
    );
  });
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const { portfolio } = project;
  const caseStudies = portfolio.problems.filter((p) => !isRetroProblemItem(p));
  const retros = portfolio.problems.filter(isRetroProblemItem);

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
          href="/home#projects"
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
          <p className="whitespace-pre-line font-sans leading-relaxed text-foreground/90 break-keep">
            {portfolio.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {portfolio.technologies.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="rounded-lg border border-[rgb(var(--accent-rgb)/0.26)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.14),rgb(var(--accent-rgb)/0.05))] px-3 py-1 text-xs text-primary shadow-[0_6px_14px_rgba(2,6,23,0.08),0_2px_10px_rgb(var(--accent-rgb)/0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.22),rgb(var(--accent-rgb)/0.12))] hover:shadow-[0_10px_22px_rgba(2,6,23,0.12),0_6px_18px_rgb(var(--accent-rgb)/0.16)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {"contentBoxText" in portfolio &&
        typeof portfolio.contentBoxText === "string" ? (
          <div className="mb-10 rounded-[15px] border border-slate-900/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(245,243,255,0.24)_30%,rgba(245,243,255,0.14))] p-6 shadow-[0_4px_34px_rgba(0,0,0,0.10)] backdrop-blur-[20px] md:p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03)_30%,rgba(0,0,0,0.10))] dark:shadow-[0_10px_40px_rgba(0,0,0,0.40)]">
            <p className="whitespace-pre-line font-sans leading-relaxed text-foreground/90 break-keep">
              {renderLinkifiedText(portfolio.contentBoxText)}
            </p>
          </div>
        ) : null}

        {portfolio.image.length > 0 ? (
          <ProjectDetailGallery title={portfolio.title} images={portfolio.image} />
        ) : null}

        {caseStudies.length > 0 ? (
          <section className="space-y-8">
            <h2 className="text-xl text-primary">Problems &amp; solutions</h2>
            <ul className="space-y-8">
              {caseStudies.map((item) => (
                <ProjectProblemCard key={item.id} item={item} />
              ))}
            </ul>
          </section>
        ) : null}

        {retros.length > 0 ? (
          <section className="mt-14 space-y-6">
            <h2 className="text-xl text-primary">Review</h2>
            <ul className="space-y-8">
              {retros.map((item) => (
                <ProjectRetroCard key={item.id} item={item} />
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}

export { ProjectProblemCard } from "./ui/project-problem-card";
export type { ProjectProblemCardProps } from "./ui/project-problem-card";
