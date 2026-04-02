"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const baseClassName =
  "inline-flex rounded-[15px] border border-secondary bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.10),rgb(var(--accent-rgb)/0.05))] px-4 py-2 text-sm text-muted-foreground shadow-[0_2px_12px_rgb(var(--accent-rgb)/0.14),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-px hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.18),rgb(var(--accent-rgb)/0.10))] hover:shadow-[0_6px_20px_rgb(var(--accent-rgb)/0.22),inset_0_1px_0_rgba(255,255,255,0.70)] dark:shadow-[0_2px_8px_rgba(138,43,226,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-[linear-gradient(145deg,rgba(138,43,226,0.20),rgba(138,43,226,0.10))] dark:hover:shadow-[0_4px_16px_rgba(138,43,226,0.25),inset_0_1px_0_rgba(255,255,255,0.10)]";

type ProjectLinkButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
};

export function ProjectLinkButton({
  href,
  children,
  className,
  target = "_blank",
  rel = "noreferrer noopener",
}: ProjectLinkButtonProps) {
  return (
    <motion.a
      href={href}
      className={className ? `${baseClassName} ${className}` : baseClassName}
      whileTap={{ scale: 0.97 }}
      target={target}
      rel={rel}
    >
      {children}
    </motion.a>
  );
}

