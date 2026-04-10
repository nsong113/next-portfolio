import { Fragment } from "react";
import Image from "next/image";

import { SKILLS } from "@/entities/skill/model/skills-data";
import union from "@/shared/assets/ico/union.svg";

const LABELS = SKILLS.map((s) => s.name.toUpperCase());

function TickerRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-2 px-4 py-1 md:gap-4 md:px-6 md:py-2"
      aria-hidden={duplicate}
    >
      {LABELS.map((label, i) => (
        <Fragment key={`${label}-${i}`}>
          <span className="whitespace-nowrap text-[10px] font-black tracking-tight text-[#f0f0f0]">
            {label}
          </span>
          <span className="select-none text-xs font-bold text-[#d5d5d5] md:text-[10px]">
            <Image src={union} alt="" width={20} height={20} aria-hidden />
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export function PortfolioTicker() {
  return (
    <div className="relative isolate my-7 overflow-hidden bg-light-color py-1">
      <div
        className="flex w-max items-center motion-reduce:animate-none animate-[portfolio-marquee_28s_linear_infinite]"
      >
        <TickerRow />
        <TickerRow duplicate />
      </div>
    </div>
  );
}
