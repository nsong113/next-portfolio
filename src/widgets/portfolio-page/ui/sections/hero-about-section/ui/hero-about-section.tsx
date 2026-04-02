"use client";

import { motion } from "framer-motion";
import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";
import { HeroAboutCard } from "./hero-about-card";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";

import profilePhoto from "@/shared/assets/images/profile.jpg";

export function HeroAboutSection() {
  return (
    <section className="px-4 pb-12 md:pb-16">
      <div className="mx-auto w-full max-w-6xl">
        <PortfolioSectionHeading>&gt; About Me</PortfolioSectionHeading>

        <div className="flex w-full flex-col items-center justify-between lg:flex-row lg:items-center">
          <motion.div
            className="order-1 flex justify-center lg:order-1"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="relative h-80 w-80 overflow-hidden rounded-full">
                <div className="absolute inset-0 z-10 rounded-full border-2 border-primary/30" />
                <div className="absolute inset-[-4px] animate-pulse rounded-full bg-linear-to-r from-primary/20 via-transparent to-primary/20" />
                <ImageWithFallback
                  src={profilePhoto.src}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <div className="order-2 flex w-full justify-center lg:order-2 lg:flex-1 lg:justify-end">
            <HeroAboutCard />
          </div>
        </div>
      </div>
    </section>
  );
}
