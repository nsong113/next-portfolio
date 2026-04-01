"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/shared/lib/motion";
import { HeroAboutCard } from "./hero-about-card";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 text-foreground">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          className="atmospheric-glow mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={staggerItem}
            className="glow-text mb-4 font-bold font-one text-4xl font-bold md:text-5xl lg:text-6xl"
          >
            FRONTEND DEVELOPER
          </motion.h1>
          <motion.div variants={staggerItem} className="inline-block">
            <p className="cursor-blink text-lg text-primary">
              Turning complex flows into simple interfaces 
            </p>
          </motion.div>
        </motion.div>

        <HeroAboutCard />

        <motion.a
          href="#projects"
          className="neo-button inline-block px-8 py-3 text-lg text-primary"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          View Projects
        </motion.a>
      </div>
    </section>
  );
}
