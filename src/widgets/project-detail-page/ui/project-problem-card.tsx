import { PROJECTS } from "@/entities/project/model/project-data";

type Portfolio = NonNullable<(typeof PROJECTS)[number]["portfolio"]>;

export type ProjectProblemCardProps = {
  item: Portfolio["problems"][number];
};

export function ProjectProblemCard({ item }: ProjectProblemCardProps) {
  return (
    <li className="rounded-lg border border-slate-900/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(246,248,255,0.62))] p-6 shadow-[0_10px_30px_rgba(2,6,23,0.10),0_2px_10px_rgba(2,6,23,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-sm dark:border-white/14 dark:bg-[linear-gradient(145deg,rgba(15,23,42,0.78),rgba(15,23,42,0.40))] dark:shadow-[0_18px_64px_rgba(0,0,0,0.35),0_0_0_1px_rgba(88,187,246,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]">
      <p className="mb-1 text-xs text-muted-foreground">#{item.id}</p>
      <h3 className="mb-3 text-sm font-semibold text-foreground">Problem</h3>
      <p className="mb-6 font-sans text-sm leading-relaxed text-muted-foreground break-keep">
        {item.problem}
      </p>
      <h3 className="mb-3 text-sm font-semibold text-primary">Solution</h3>
      <p className="mb-6 font-sans text-sm leading-relaxed text-foreground/90 break-keep">
        {item.solution}
      </p>
      <h3 className="mb-3 text-sm font-semibold text-primary">Result</h3>
      <p className="font-sans text-sm leading-relaxed text-muted-foreground break-keep">
        {item.result}
      </p>
    </li>
  );
}
