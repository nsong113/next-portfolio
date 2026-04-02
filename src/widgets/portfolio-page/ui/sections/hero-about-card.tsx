"use client";

import { motion } from "framer-motion";

export function HeroAboutCard() {
  return (
    <motion.div
      className="animate-[float_3s_ease-in-out_infinite] font-jetbrains mx-auto mb-12 max-w-2xl rounded-2xl border border-slate-900/10 bg-black/5 p-8 text-slate-900 shadow-[0_18px_70px_rgba(2,6,23,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-black/30 dark:text-zinc-100 dark:shadow-[0_18px_60px_rgba(0,0,0,0.30)]"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4">
        <span className="text-sm text-primary">
          {"// About"}
        </span>
      </div>

      <div className="space-y-5 text-left text-sm leading-7 text-slate-800 md:text-base dark:text-zinc-200">
        <p className="text-xs text-slate-600/80 dark:text-zinc-400/90">
          <span className="text-slate-900/60 dark:text-primary">
            {"// "}
          </span>
          requirements
          <span className="mr-2 text-slate-700/70 dark:text-primary">
            .map
          </span>
          <span className="text-slate-900/85 dark:text-zinc-100/90">
            (복잡한 흐름 → 명확한 인터페이스)
          </span>
        </p>

        <div className="rounded-md border border-slate-900/10 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-slate-900/25">
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

      <div className="mt-4 flex justify-end">
        <div className="flex space-x-1">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
      </div>
    </motion.div>
  );
}

