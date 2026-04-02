"use client";

import { useSplashGate } from "@/app/splash-gate-context";
import { PortfolioPage } from "@/widgets/portfolio-page";
import { SplashScreen } from "@/widgets/splash-screen";

export default function Home() {
  const { splashDismissed, dismissSplash } = useSplashGate();

  if (!splashDismissed) {
    return <SplashScreen onEnter={dismissSplash} />;
  }

  return <PortfolioPage />;
}
