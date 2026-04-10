"use client";

import { motion } from "framer-motion";

import { HeroAboutCard } from "./ui/hero-about-card";
import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";
import {
  ImageWithFallback,
  imageWithFallbackKey,
} from "@/shared/ui/image-with-fallback";

import { staggerContainer, staggerItem } from "@/shared/lib/motion";

import profilePhoto from "@/shared/assets/images/profile.jpg";

export function HeroAboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 px-4 pb-12 md:pb-16"
    >
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto w-full max-w-6xl">
        <PortfolioSectionHeading>&gt; About Me</PortfolioSectionHeading>

        <motion.div variants={staggerItem} className="flex w-full flex-col items-center justify-between lg:flex-row lg:items-center">
          <motion.div
            variants={staggerItem}
            className="relative order-1 h-80 w-80 overflow-hidden rounded-full"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 z-10 rounded-full border-2 border-primary/30" />
            <div className="absolute inset-[-4px] animate-pulse rounded-full bg-linear-to-r from-primary/20 via-transparent to-primary/20" />
            <ImageWithFallback
              key={imageWithFallbackKey(profilePhoto)}
              src={profilePhoto}
              alt="Profile"
              className="h-full w-full object-cover"
              sizes="320px"
              placeholder="blur"
            />
          </motion.div>

          <motion.div variants={staggerItem} className="order-2 mt-8 lg:mt-0 flex w-full justify-center lg:order-2 lg:flex-1 lg:justify-end">
            <HeroAboutCard />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
