"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/shared/lib/motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 text-zinc-100">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          className="atmospheric-glow mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={staggerItem}
            className="glow-text mb-4 font-one text-4xl font-bold md:text-5xl lg:text-6xl"
          >
            FRONTEND DEVELOPER
          </motion.h1>
          <motion.div variants={staggerItem} className="inline-block">
            <p className="cursor-blink text-lg text-primary">
              Turning complex flows into simple interfaces 
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="neo-card float-animation mx-auto mb-12 max-w-2xl p-8"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4">
            <span className="text-sm text-primary opacity-90">
              {"// About"}
            </span>
          </div>
          <div className="space-y-5 text-left text-sm leading-7 text-primary md:text-base">
            <p className="text-xs text-zinc-400 opacity-90">
              <span className="text-primary/50">{"// "}</span>
              requirements<span className="text-primary/40 mr-2">.map</span>
              <span className="text-zinc-200/90">(복잡한 흐름 → 명확한 인터페이스)</span>
            </p>

            <div className="rounded-md border border-primary/15 bg-background/40 px-3 py-2">
              <p className="mb-1 text-[11px] text-primary/45">
                &lt;div className=&quot;intent&quot;&gt;
              </p>
              <p className="pl-2 text-zinc-100">
                제품의 복잡한 흐름을
                <br />
                더 명확하고 자연스러운 사용자 경험으로 바꾸는 일을 합니다.
              </p>
              <p className="mt-1 text-[11px] text-primary/45">&lt;/div&gt;</p>
            </div>

            <div className="flex flex-col gap-1 border-l-2 border-primary/25 pl-3">
              <span className="text-[11px] text-primary/40">
                &lt;section className=&quot;frontend&quot;&gt;
              </span>
              <p className="text-zinc-100">
                기획 의도를 이해하고,
                <br />
                프론트엔드 구조와 인터랙션으로 풀어내는 데 강점이 있습니다.
              </p>
              <span className="text-[11px] text-primary/40">&lt;/section&gt;</span>
            </div>

            <p className="pt-1 text-xs text-zinc-400 opacity-80">
              <span className="text-primary/90">return </span>
              <span className="text-zinc-100/90">&quot;더 나은 사용자 경험&quot;</span>
              <span className="text-zinc-500">;</span>
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <div className="flex space-x-1">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
            </div>
          </div>
        </motion.div>

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
