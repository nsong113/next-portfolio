"use client";

import { useEffect } from "react";

import { PortfolioPage } from "@/widgets/portfolio-page";

export default function HomePortfolioPage() {
  useEffect(() => {
    //홈은 항상 위에서 시작하도록 설정
    window.scrollTo(0, 0);
  }, []);

  return <PortfolioPage />;
}
