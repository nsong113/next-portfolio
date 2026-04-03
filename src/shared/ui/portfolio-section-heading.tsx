"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion } from "framer-motion";

const titleClassName =
  "[text-shadow:0_0_3px_rgba(80,5,255,0.035),0_0_8px_rgba(80,5,255,0.01)] text-center font-jetbrains font-bold text-3xl md:text-4xl dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]";

type PortfolioSectionHeadingProps = {
  children: ReactNode;
  className?: string;
  viewport?: ComponentProps<typeof motion.div>["viewport"];
};

export function PortfolioSectionHeading({
  children,
  className,
  viewport = { once: true },
}: PortfolioSectionHeadingProps) {
  return (
    <motion.div
      className={["mx-auto mb-16 w-fit", className].filter(Boolean).join(" ")}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5 }}
    >
      <h2 className={titleClassName}>{children}</h2>
    </motion.div>
  );
}
