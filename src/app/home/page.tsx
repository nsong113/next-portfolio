"use client";

import { useEffect } from "react";

import { PortfolioPage } from "@/widgets/portfolio-page";

export default function HomePortfolioPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <PortfolioPage />;
}
