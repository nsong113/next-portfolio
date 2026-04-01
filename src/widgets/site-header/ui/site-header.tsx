"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/shared/lib/motion";
import dynamic from "next/dynamic";
import Image from "next/image";

import star from "@/shared/assets/ico/star.svg";
import darkStar from "@/shared/assets/ico/darkStar.svg";
import { NAV_ITEMS } from "@/entities/navigation/model/nav-items";


const ThemeToggle = dynamic(
  () => import("@/features/theme-toggle").then((m) => m.ThemeToggle),
  { ssr: false },
);

export function SiteHeader() {

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-primary/20 backdrop-blur-md"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="mx-4 my-2 md:mx-6">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="glow-text text-lg font-bold text-logo-color flex items-center gap-2">
               &gt;
              <Image
                src={star}
                alt="star"
                className="h-6 w-6 hidden dark:inline-block"
                priority
              />
              <Image
                src={darkStar}
                alt="star"
                className="h-6 w-6 inline-block dark:hidden"
                priority
              />
              <span>FRONTEND_PORTFOLIO</span>
             
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden space-x-8 md:flex">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-foreground transition-all duration-300 hover:text-[#9E05FF] hover:glow-text dark:text-white dark:hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
