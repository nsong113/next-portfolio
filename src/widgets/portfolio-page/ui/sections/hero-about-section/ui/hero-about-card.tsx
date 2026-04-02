"use client";

import { motion } from "framer-motion";

export function HeroAboutCard() {
  return (
    <motion.div
      className="animate-[float_3s_ease-in-out_infinite] mx-auto max-w-2xl overflow-hidden rounded-xl border border-slate-900/10 bg-white/70 font-jetbrains shadow-[0_18px_64px_rgba(2,6,23,0.10)] backdrop-blur-xl dark:border-white/12 dark:bg-[rgba(40,42,55,0.94)] dark:shadow-[0_18px_64px_rgba(0,0,0,0.24)]"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 border-b border-slate-900/10 bg-slate-900/5 px-3 py-2.5 dark:border-white/10 dark:bg-[rgba(48,55,77,0.96)]">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
        </div>
        <span className="flex-1 text-center text-[11px] leading-none text-slate-500 dark:text-zinc-500">
          about_preview.tsx
        </span>
        <span className="w-[52px] shrink-0" aria-hidden />
      </div>

      <div className="bg-size-[20px_20px] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] bg-white/35 px-5 py-6 md:px-7 md:py-8 dark:bg-[rgba(38,41,61,0.88)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.043)_1px,transparent_0)]">
        <p className="mb-6 text-[13px] leading-relaxed tracking-tight antialiased">
          <span className="text-cyan-700 dark:text-primary">dev@portfolio:~$</span>{" "}
          <span className="text-slate-900 dark:text-zinc-100">cat ./about.md</span>
        </p>

        <div className="space-y-5 text-left text-sm leading-7 text-slate-800 md:text-base dark:text-zinc-200">
          <p className="text-xs text-slate-600/80 dark:text-zinc-400/90">
            <span className="text-slate-900/60 dark:text-primary">{"// "}</span>
            requirements
            <span className="mr-2 text-slate-700/70 dark:text-primary">.map</span>
            <span className="text-slate-900/85 dark:text-zinc-100/90">
              (복잡한 흐름 → 명확한 인터페이스)
            </span>
          </p>

          <div className="rounded-md border border-slate-900/15 bg-white/60 px-3 py-2 dark:border-zinc-800/80 dark:bg-black/20">
            <p className="mb-1 text-[11px] text-slate-600/70 dark:text-zinc-400/80">
              &lt;div className=&quot;intent&quot;&gt;
            </p>
            <p className="pl-2 text-slate-900 dark:text-zinc-100">
              제품의 복잡한 흐름을
              <br />
              더 명확하고 자연스러운 사용자 경험으로 바꾸는 일을 합니다.
            </p>
            <p className="mt-1 text-[11px] text-slate-600/70 dark:text-zinc-400/80">
              &lt;/div&gt;
            </p>
          </div>

          <div className="flex flex-col gap-1 border-l-2 border-slate-900/20 pl-3 dark:border-cyan-300/30">
            <span className="text-[11px] text-slate-600/70 dark:text-zinc-400/80">
              &lt;section className=&quot;frontend&quot;&gt;
            </span>
            <p className="text-slate-900 dark:text-zinc-100">
              기획 의도를 이해하고,
              <br />
              프론트엔드 구조와 인터랙션으로 풀어내는 데 강점이 있습니다.
            </p>
            <span className="text-[11px] text-slate-600/70 dark:text-zinc-400/80">
              &lt;/section&gt;
            </span>
          </div>

          <p className="pt-1 text-xs text-slate-600/80 dark:text-zinc-400/90">
            <span className="text-slate-900/75 dark:text-primary">return </span>
            <span className="text-slate-900/85 dark:text-zinc-100/90">
              &quot;더 나은 사용자 경험&quot;
            </span>
            <span className="text-slate-600/80 dark:text-zinc-400/90">;</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
