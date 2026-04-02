"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/shared/lib/motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 text-foreground">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          className="mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={staggerItem}
            className="mx-auto mb-4 w-fit"
          >
            <h1 className="[text-shadow:0_0_3px_rgba(80,5,255,0.035),0_0_8px_rgba(80,5,255,0.01)] font-a2z font-bold text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]">
              FRONTEND DEVELOPER
            </h1>
          </motion.div>
          <motion.div variants={staggerItem} className="inline-block">
            <p className="text-lg text-primary after:content-['▍'] after:ml-[0.15em] after:opacity-85 after:animate-[cursor-blink_1.1s_step-end_infinite]">
              Turning complex flows into simple interfaces 
            </p>
          </motion.div>
        </motion.div>

         <motion.a
          href="#projects"
          className="inline-block mb-10 rounded-lg border border-[rgb(var(--accent-rgb)/0.34)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.10),rgb(var(--accent-rgb)/0.05))] px-8 py-3 text-lg text-primary shadow-[0_2px_12px_rgb(var(--accent-rgb)/0.14),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-px hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.18),rgb(var(--accent-rgb)/0.10))] hover:shadow-[0_6px_20px_rgb(var(--accent-rgb)/0.22),inset_0_1px_0_rgba(255,255,255,0.70)] dark:border-[rgba(138,43,226,0.40)] dark:bg-[linear-gradient(145deg,rgba(138,43,226,0.10),rgba(138,43,226,0.05))] dark:shadow-[0_2px_8px_rgba(138,43,226,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-[linear-gradient(145deg,rgba(138,43,226,0.20),rgba(138,43,226,0.10))] dark:hover:shadow-[0_4px_16px_rgba(138,43,226,0.25),inset_0_1px_0_rgba(255,255,255,0.10)]"
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
