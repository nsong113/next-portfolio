"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { staggerContainer, staggerItem } from "@/shared/lib/motion";
import { IconGithub, IconLinkedin } from "@/shared/ui/icons/social";

export function ContactLinks() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h3
        variants={staggerItem}
        className="mb-6 font-jetbrains text-xl text-primary"
      >
        Get In Touch
      </motion.h3>
      <motion.p
        variants={staggerItem}
        className="mb-8 font-sans text-lg leading-relaxed text-foreground"
      >
        Ready to collaborate on your next project? Let&apos;s connect and build
        something amazing together. I&apos;m always interested in discussing new
        opportunities and innovative ideas.
      </motion.p>

      <div className="space-y-6">
        <motion.a
          variants={staggerItem}
          href="https://github.com/nsong113"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4"
          whileHover={{ x: 4 }}
        >
          <div className="rounded-lg border border-[rgb(var(--accent-rgb)/0.34)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.10),rgb(var(--accent-rgb)/0.05))] p-4 shadow-[0_2px_12px_rgb(var(--accent-rgb)/0.14),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-px group-hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.18),rgb(var(--accent-rgb)/0.10))] group-hover:shadow-[0_6px_20px_rgb(var(--accent-rgb)/0.22),inset_0_1px_0_rgba(255,255,255,0.70)] dark:border-[rgba(138,43,226,0.40)] dark:bg-[linear-gradient(145deg,rgba(138,43,226,0.10),rgba(138,43,226,0.05))] dark:shadow-[0_2px_8px_rgba(138,43,226,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] dark:group-hover:bg-[linear-gradient(145deg,rgba(138,43,226,0.20),rgba(138,43,226,0.10))] dark:group-hover:shadow-[0_4px_16px_rgba(138,43,226,0.25),inset_0_1px_0_rgba(255,255,255,0.10)]">
            <IconGithub className="text-primary" size={24} />
          </div>
          <span className="font-jetbrains text-foreground transition-colors duration-300 group-hover:text-primary">
            GitHub Profile
          </span>
        </motion.a>

        <motion.a
          variants={staggerItem}
          href="https://www.linkedin.com/in/jiu-song-nsong113/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4"
          whileHover={{ x: 4 }}
        >
          <div className="rounded-lg border border-[rgb(var(--accent-rgb)/0.34)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.10),rgb(var(--accent-rgb)/0.05))] p-4 shadow-[0_2px_12px_rgb(var(--accent-rgb)/0.14),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-px group-hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.18),rgb(var(--accent-rgb)/0.10))] group-hover:shadow-[0_6px_20px_rgb(var(--accent-rgb)/0.22),inset_0_1px_0_rgba(255,255,255,0.70)] dark:border-[rgba(138,43,226,0.40)] dark:bg-[linear-gradient(145deg,rgba(138,43,226,0.10),rgba(138,43,226,0.05))] dark:shadow-[0_2px_8px_rgba(138,43,226,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] dark:group-hover:bg-[linear-gradient(145deg,rgba(138,43,226,0.20),rgba(138,43,226,0.10))] dark:group-hover:shadow-[0_4px_16px_rgba(138,43,226,0.25),inset_0_1px_0_rgba(255,255,255,0.10)]">
            <IconLinkedin className="text-primary" size={24} />
          </div>
          <span className="font-jetbrains text-foreground transition-colors duration-300 group-hover:text-primary">
            LinkedIn Profile
          </span>
        </motion.a>

        <motion.div variants={staggerItem} className="flex items-center gap-4">
          <div className="rounded-lg border border-[rgb(var(--accent-rgb)/0.34)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.10),rgb(var(--accent-rgb)/0.05))] p-4 shadow-[0_2px_12px_rgb(var(--accent-rgb)/0.14),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-300 dark:border-[rgba(138,43,226,0.40)] dark:bg-[linear-gradient(145deg,rgba(138,43,226,0.10),rgba(138,43,226,0.05))] dark:shadow-[0_2px_8px_rgba(138,43,226,0.15),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <Mail size={24} className="text-primary" />
          </div>
          <span className="font-jetbrains text-foreground">nsong113@gmail.com</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

