import { Fragment } from "react";
import { SKILLS } from "@/entities/skill/model/skills-data";

const LABELS = SKILLS.map((s) => s.name.toUpperCase());

function TickerSegment({ duplicate }: { duplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-2 px-4 py-1.5 md:gap-4 md:px-6 md:py-2"
      aria-hidden={duplicate}
    >
      {LABELS.map((label, i) => (
        <Fragment key={`${label}-${i}`}>
          <span className="font-black tracking-tight text-primary-foreground text-xs md:text-sm">
            {label}
          </span>
          <span className="select-none font-bold text-primary-foreground/80 text-xs md:text-sm">
            *
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export function PortfolioTicker() {
  return (
    <div className="relative isolate my-7 overflow-hidden py-3 md:py-4">
      <div className="bg-light-color">
        <div className="portfolio-marquee-track select-none">
          <TickerSegment />
          <TickerSegment duplicate />
        </div>
      </div>
    </div>
  );
}
