"use client";

import { motion } from "framer-motion";


import { ImageWithFallback } from "@/shared/ui/image-with-fallback";
import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";

import { staggerContainer, staggerItem } from "@/shared/lib/motion";
import profilePhoto from "@/shared/assets/images/profile.jpg";

export function AboutSection() {
  return (
    <section className="px-4 py-20">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-6xl">
        <PortfolioSectionHeading>
          &gt; About Me
        </PortfolioSectionHeading>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={staggerItem}
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-[28px] border border-slate-900/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.26)_30%,rgba(245,243,255,0.18))] p-8 shadow-[0_4px_34px_rgba(0,0,0,0.12)] backdrop-blur-[20px] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04)_30%,rgba(0,0,0,0.08))] dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              <h3 className="mb-6 text-2xl font-bold text-primary">Who I Am</h3>
              <p className="mb-8 font-sans text-lg leading-relaxed text-foreground break-keep">
                컴퓨터공학을 전공하며, 기술로 혁신적인 해결책을 만드는 일에
                관심이 많습니다. Flutter 모바일 개발, MERN 스택 웹 애플리케이션,
                AI/ML 구현을 중심으로 활동합니다. 실제 문제를 풀 수 있는 깨끗하고
                효율적인 코드를 쓰는 것을 중요하게 생각합니다. 블라블라 예시 입니다.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-primary">Role:</span>
                  <span className="rounded-lg border border-[rgb(var(--accent-rgb)/0.26)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.14),rgb(var(--accent-rgb)/0.05))] px-4 py-2 text-sm text-primary shadow-[0_6px_14px_rgba(2,6,23,0.08),0_2px_10px_rgb(var(--accent-rgb)/0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.22),rgb(var(--accent-rgb)/0.12))] hover:shadow-[0_10px_22px_rgba(2,6,23,0.12),0_6px_18px_rgb(var(--accent-rgb)/0.16)]">
                    Program Coordinator
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-primary">
                    Achievement:
                  </span>
                  <span className="rounded-lg border border-[rgb(var(--accent-rgb)/0.26)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.14),rgb(var(--accent-rgb)/0.05))] px-4 py-2 text-sm text-primary shadow-[0_6px_14px_rgba(2,6,23,0.08),0_2px_10px_rgb(var(--accent-rgb)/0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.22),rgb(var(--accent-rgb)/0.12))] hover:shadow-[0_10px_22px_rgba(2,6,23,0.12),0_6px_18px_rgb(var(--accent-rgb)/0.16)]">
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
            <div className="relative h-80 w-80 overflow-hidden rounded-full">
              <div className="absolute inset-0 z-10 rounded-full border-2 border-primary/30" />
              <div className="absolute inset-[-4px] animate-pulse rounded-full bg-linear-to-r from-primary/20 via-transparent to-primary/20" />
              <ImageWithFallback
                src={profilePhoto}
                alt="Profile"
                className="h-full w-full object-cover"
                sizes="320px"
                placeholder="blur"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
