"use client";

import { HeroAboutCard } from "./hero-about-card";

export function HeroAboutSection() {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <HeroAboutCard />
      </div>
    </section>
  );
}
