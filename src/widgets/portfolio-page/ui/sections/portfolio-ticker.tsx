import { Fragment } from "react";
import { HorizontalTicker } from "react-infinite-ticker";

import { SKILLS } from "@/entities/skill/model/skills-data";
import union from "@/shared/assets/ico/union.svg";
import Image from "next/image";

const LABELS = SKILLS.map((s) => s.name.toUpperCase());

function TickerSegment({ duplicate }: { duplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-2 py-1 md:gap-4 md:px-6 md:py-2"
      aria-hidden={duplicate}
    >
      {LABELS.map((label, i) => (
        <Fragment key={`${label}-${i}`}>
          <span className="font-black tracking-tight text-[#f0f0f0] text-[10px]">
            {label}
          </span>
          <span className="select-none font-bold text-[#d5d5d5] text-xs md:text-[10px]">
            <Image src={union} alt="union" width={20} height={20} />
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export function PortfolioTicker() {
  return (
    <div className="relative isolate my-7 overflow-hidden py-1 bg-light-color">
        <HorizontalTicker duration={80000}>
          <TickerSegment />
          <TickerSegment />
          {/* <TickerSegment /> */}
          {/* <TickerSegment /> */}
        </HorizontalTicker>
    </div>
  );
}
