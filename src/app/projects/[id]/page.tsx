import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/entities/project/model/project-data";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.portfolio != null).map((p) => ({
    id: String(p.id),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === Number(id));
  if (!project?.portfolio) {
    return { title: "Project" };
  }
  return {
    title: `${project.portfolio.title} | Portfolio`,
    description: project.portfolio.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === Number(id));

  if (!project?.portfolio) {
    notFound();
  }

  const { portfolio } = project;

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-28 text-foreground md:px-6 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#projects"
          className="mb-10 inline-flex text-sm text-primary transition-colors hover:text-primary/80"
        >
          ← Back to projects
        </Link>

        <header className="mb-10">
          <p className="mb-2 text-xs text-muted-foreground">
            {portfolio.period}
          </p>
          <h1 className="[text-shadow:0_0_3px_rgba(80,5,255,0.035),0_0_8px_rgba(80,5,255,0.01)] mb-2 text-2xl md:text-3xl dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]">
            {portfolio.title}
          </h1>
          <p className="text-lg text-primary">{portfolio.subTitle}</p>
        </header>

        <div className="mb-10 space-y-4 rounded-[28px] border border-slate-900/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.26)_30%,rgba(245,243,255,0.18))] p-6 shadow-[0_4px_34px_rgba(0,0,0,0.12)] backdrop-blur-[20px] md:p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04)_30%,rgba(0,0,0,0.08))] dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
          <p className="font-sans leading-relaxed text-foreground/90">
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
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {portfolio.image.map((src, i) => (
              <div
                key={src}
                className="relative aspect-video overflow-hidden rounded-lg border border-border/60 bg-muted/20"
              >
                <ImageWithFallback
                  src={src}
                  alt={`${project.title} — ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}

        {portfolio.problems.length > 0 ? (
          <section className="space-y-8">
            <h2 className="text-xl text-primary">Problems &amp; solutions</h2>
            <ul className="space-y-8">
              {portfolio.problems.map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg border border-slate-900/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(246,248,255,0.62))] p-6 shadow-[0_10px_30px_rgba(2,6,23,0.10),0_2px_10px_rgba(2,6,23,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-sm dark:border-white/14 dark:bg-[linear-gradient(145deg,rgba(15,23,42,0.78),rgba(15,23,42,0.40))] dark:shadow-[0_18px_64px_rgba(0,0,0,0.35),0_0_0_1px_rgba(88,187,246,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <p className="mb-1 text-xs text-muted-foreground">
                    #{item.id}
                  </p>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">
                    Problem
                  </h3>
                  <p className="mb-6 font-sans text-sm leading-relaxed text-muted-foreground">
                    {item.problem}
                  </p>
                  <h3 className="mb-3 text-sm font-semibold text-primary">
                    Solution
                  </h3>
                  <p className="mb-6 font-sans text-sm leading-relaxed text-foreground/90">
                    {item.solution}
                  </p>
                  <h3 className="mb-3 text-sm font-semibold text-primary">
                    Result
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {item.result}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
