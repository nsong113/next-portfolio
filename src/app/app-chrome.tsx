"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/widgets/site-footer";
import { SiteHeader } from "@/widgets/site-header";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  /** `/`는 풀스크린 스플래시만 — 헤더·푸터 없음 */
  const showChrome = pathname !== "/" && pathname !== "";

  return (
    <>
      {showChrome ? <SiteHeader /> : null}
      <div
        className={
          showChrome
            ? "flex min-h-screen flex-col"
            : "flex min-h-screen flex-col"
        }
      >
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        {showChrome ? <SiteFooter /> : null}
      </div>
    </>
  );
}
