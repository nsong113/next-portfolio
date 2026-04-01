"use client";

import { motion } from "framer-motion";
import profilePhoto from "@/shared/assets/images/profile.jpg";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";

export function AboutSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="atmospheric-glow mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="glow-text text-center text-3xl md:text-4xl">
            &gt; User Profile
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-card p-8">
              <h3 className="mb-6 text-xl text-primary">About Me</h3>
              <p className="mb-8 font-sans text-lg leading-relaxed text-foreground">
                Computer Engineering student with a passion for creating
                innovative solutions through technology. Specializing in Flutter
                mobile development, MERN stack web applications, and AI/ML
                implementations. I believe in writing clean, efficient code that
                solves real-world problems.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-primary">Role:</span>
                  <span className="skill-tag px-4 py-2 text-sm text-primary">
                    Program Coordinator
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-primary">
                    Achievement:
                  </span>
                  <span className="skill-tag px-4 py-2 text-sm text-primary">
                    Scholarship Recipient
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-primary">Focus:</span>
                  <span className="font-sans text-foreground">
                    Frontend Development
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 flex justify-center lg:order-2"
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
        </div>
      </div>
    </section>
  );
}
