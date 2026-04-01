import { Fragment } from "react";
import { SKILLS } from "@/entities/skill/model/skills-data";

const LABELS = SKILLS.map((s) => s.name.toUpperCase());

function TickerSegment({ duplicate }: { duplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-6 px-6 py-5 md:gap-10 md:px-10 md:py-6"
      aria-hidden={duplicate}
    >
      {LABELS.map((label, i) => (
        <Fragment key={`${label}-${i}`}>
          <span className="font-black tracking-tight text-black md:text-xl">
            {label}
          </span>
          <span className="select-none text-lg font-bold text-black/80 md:text-xl">
            *
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export function PortfolioTicker() {
  return (
    <div className="relative isolate overflow-visible py-10 md:py-14">
      <div className="origin-center -ml-[4%] w-[108%] -rotate-6 scale-[1.08] md:scale-[1.05]">
        <div className="bg-primary shadow-[0_12px_40px_rgba(138,43,226,0.35)]">
          <div className="portfolio-marquee-track select-none">
            <TickerSegment />
            <TickerSegment duplicate />
          </div>
        </div>
      </div>
    </div>
  );
}
