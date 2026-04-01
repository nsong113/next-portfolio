"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "@/features/theme-toggle";
import { fadeInUp } from "@/shared/lib/motion";

export function SiteHeader() {
  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-primary/20 backdrop-blur-md"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="glass-card mx-4 my-2 md:mx-6">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="glow-text text-lg text-primary">
              &gt; FRONTEND_PORTFOLIO
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden space-x-8 md:flex">
                <a
                  href="#home"
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:glow-text"
                >
                  Home
                </a>
                <a
                  href="#skills"
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:glow-text"
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:glow-text"
                >
                  Projects
                </a>
                <a
                  href="#about"
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:glow-text"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:glow-text"
                >
                  Contact
                </a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
