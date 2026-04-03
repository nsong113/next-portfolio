import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ProjectDetailPage } from "@/widgets/project-detail-page";

import { PROJECTS } from "@/entities/project/model/project-data";

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
    title: `${project.portfolio.title} | Project`,
    description: project.portfolio.description.slice(0, 160),
  };
}

export default async function ProjectDetailRoute({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === Number(id));

  if (!project?.portfolio) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
