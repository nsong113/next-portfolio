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
          <div className="neo-button p-4 transition-transform duration-300 group-hover:scale-105">
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
          <div className="neo-button p-4 transition-transform duration-300 group-hover:scale-105">
            <IconLinkedin className="text-primary" size={24} />
          </div>
          <span className="font-jetbrains text-foreground transition-colors duration-300 group-hover:text-primary">
            LinkedIn Profile
          </span>
        </motion.a>

        <motion.div variants={staggerItem} className="flex items-center gap-4">
          <div className="neo-button p-4">
            <Mail size={24} className="text-primary" />
          </div>
          <span className="font-jetbrains text-foreground">nsong113@gmail.com</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

