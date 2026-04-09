import { Lightbulb, Route, Sparkles } from "lucide-react";

import { PROJECTS } from "@/entities/project/model/project-data";

type Portfolio = NonNullable<(typeof PROJECTS)[number]["portfolio"]>;
export type RetroProblemItem = Extract<
  Portfolio["problems"][number],
  { kind: "retro" }
>;

export type ProjectRetroCardProps = {
  item: RetroProblemItem;
};

export function ProjectRetroCard({ item }: ProjectRetroCardProps) {
  return (
    <li className="list-none rounded-lg border border-slate-900/10 bg-[radial-gradient(circle_at_10%_10%,rgb(var(--accent-rgb)/0.14),transparent_55%),linear-gradient(145deg,rgba(255,255,255,0.88),rgba(246,248,255,0.62))] p-6 shadow-[0_10px_30px_rgba(2,6,23,0.10),0_2px_10px_rgba(2,6,23,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-sm dark:border-white/14 dark:bg-[radial-gradient(circle_at_10%_10%,rgb(var(--accent-rgb)/0.16),transparent_55%),linear-gradient(145deg,rgba(15,23,42,0.78),rgba(15,23,42,0.40))] dark:shadow-[0_18px_64px_rgba(0,0,0,0.35),0_0_0_1px_rgba(88,187,246,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-[rgb(var(--accent-rgb)/0.14)] text-primary shadow-[0_10px_22px_rgba(2,6,23,0.06)]">
          <Sparkles className="size-4" aria-hidden />
        </span>
        <div className="pl-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Review
          </p>
          <h3 className="text-lg font-bold text-foreground">
            {item.title}
          </h3>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Lightbulb className="size-4 shrink-0 text-primary" aria-hidden />
            배운 점
          </div>
          <p className="whitespace-pre-line pl-6 text-sm leading-relaxed text-foreground/90 break-keep">
            {item.learnings}
          </p>
        </div>
        <div className="border-t border-slate-900/10 pt-6 dark:border-white/10">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Route className="size-4 shrink-0 text-primary" aria-hidden />
            개선할 점
          </div>
          <p className="whitespace-pre-line pl-6 text-sm leading-relaxed text-muted-foreground break-keep">
            {item.improvements}
          </p>
        </div>
      </div>
    </li>
  );
}

export function isRetroProblemItem(
  item: Portfolio["problems"][number],
): item is RetroProblemItem {
  return "kind" in item && item.kind === "retro";
}
