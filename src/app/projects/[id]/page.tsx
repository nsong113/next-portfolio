import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/shared/data/projectData";
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
          className="mb-10 inline-flex font-mono text-sm text-primary transition-colors hover:text-primary/80"
        >
          ← Back to projects
        </Link>

        <header className="mb-10">
          <p className="mb-2 font-mono text-xs text-muted-foreground">
            {portfolio.period}
          </p>
          <h1 className="glow-text mb-2 font-mono text-2xl md:text-3xl">
            {portfolio.title}
          </h1>
          <p className="font-mono text-lg text-primary">{portfolio.subTitle}</p>
        </header>

        <div className="neo-card mb-10 space-y-4 p-6 md:p-8">
          <p className="font-sans leading-relaxed text-foreground/90">
            {portfolio.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {portfolio.technologies.map((tech) => (
              <span
                key={tech}
                className="skill-tag px-3 py-1 font-mono text-xs text-primary"
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
            <h2 className="font-mono text-xl text-primary">Problems &amp; solutions</h2>
            <ul className="space-y-8">
              {portfolio.problems.map((item) => (
                <li key={item.id} className="neo-card p-6">
                  <p className="mb-1 font-mono text-xs text-muted-foreground">
                    #{item.id}
                  </p>
                  <h3 className="mb-3 font-mono text-sm font-semibold text-foreground">
                    Problem
                  </h3>
                  <p className="mb-6 font-sans text-sm leading-relaxed text-muted-foreground">
                    {item.problem}
                  </p>
                  <h3 className="mb-3 font-mono text-sm font-semibold text-primary">
                    Solution
                  </h3>
                  <p className="mb-6 font-sans text-sm leading-relaxed text-foreground/90">
                    {item.solution}
                  </p>
                  <h3 className="mb-3 font-mono text-sm font-semibold text-primary">
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
