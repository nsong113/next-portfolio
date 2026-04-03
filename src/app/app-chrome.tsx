"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/widgets/site-footer";
import { SiteHeader } from "@/widgets/site-header";
import { useSplashGate } from "@/app/splash-gate-context";


export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { splashDismissed } = useSplashGate();
  /** `/` (또는 초기 빈 문자열)에서만 스플래시가 덮을 때 크롬 숨김 */
  const isHomeSplash =
    !splashDismissed && (pathname === "/" || pathname === "");
  const showChrome = !isHomeSplash;

  return (
    <>
      {showChrome ? <SiteHeader /> : null}
      <div
        className={
          showChrome
            ? "flex min-h-screen flex-col pt-21"
            : "flex min-h-screen flex-col"
        }
      >
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        {showChrome ? <SiteFooter /> : null}
      </div>
    </>
  );
}
