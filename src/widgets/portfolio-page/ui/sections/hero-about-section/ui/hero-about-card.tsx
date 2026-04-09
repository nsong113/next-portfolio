"use client";

import { motion } from "framer-motion";

import {
  TerminalBody,
  TerminalPromptLine,
  TerminalTitleBar,
  terminalWindowShellClassName,
} from "@/shared/ui/terminal-window";

export function HeroAboutCard() {
  return (
    <motion.div
      className={`${terminalWindowShellClassName} max-w-2xl animate-[float_3s_ease-in-out_infinite]`}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <TerminalTitleBar title="about_preview.tsx" />

      <TerminalBody className="bg-white/35">
        <TerminalPromptLine
          prompt="dev@portfolio:~$"
          command="cat ./about.md"
        />

        <div className="space-y-5 text-left text-sm leading-7 text-slate-800 md:text-base dark:text-zinc-200">
          <p className="text-xs text-slate-600/80 dark:text-zinc-400/90">
            <span className="text-slate-900/60 dark:text-primary font-jetbrains">{"// "}</span>
            <span className="mr-2 text-slate-700/70 dark:text-primary font-jetbrains"> requirements.map</span>
            <span className="text-slate-900/85 dark:text-zinc-100/90">
              (복잡한 UI → 구조적으로 설계)
            </span>
          </p>

          <div className="rounded-md border border-slate-900/15 bg-white/60 px-3 py-2 dark:border-zinc-800/80 dark:bg-black/20">
            <p className="mb-1 text-[11px] font-jetbrains text-slate-600/70 dark:text-zinc-400/80">
              &lt;div className=&quot;intent&quot;&gt;
            </p>
            <p className="pl-2 text-slate-900 dark:text-zinc-100">
             - 복잡한 UI를 구조적으로 설계하고 구현하는 프론트엔드 역량을 보유하고 있습니다.
              <br />
             - 공통 컴포넌트화와 상태 흐름 분리를 통해 유지보수성과 확장성을 고려한 코드 구조를 설계합니다.
            </p>
            <p className="mt-1 text-[11px] font-jetbrains text-slate-600/70 dark:text-zinc-400/80">
              &lt;/div&gt;
            </p>
          </div>

          <div className="flex flex-col gap-1 border-l-2 border-slate-900/20 pl-3 dark:border-cyan-300/30">
            <span className="text-[11px] font-jetbrains text-slate-600/70 dark:text-zinc-400/80">
              &lt;section className=&quot;frontend&quot;&gt;
            </span>
            <p className="text-slate-900 dark:text-zinc-100">
              기획 의도를 이해하고,
              <br />
              프론트엔드 구조와 인터랙션으로 풀어내는 데 강점이 있습니다.
            </p>
            <span className="text-[11px] font-jetbrains text-slate-600/70 dark:text-zinc-400/80">
              &lt;/section&gt;
            </span>
          </div>

          <p className="pt-1 text-xs text-slate-600/80 dark:text-zinc-400/90">
            <span className="text-slate-900/75 dark:text-primary font-jetbrains">return </span>
            <span className="text-slate-900/85 dark:text-zinc-100/90">
              &quot;더 나은 사용자 경험&quot;
            </span>
            <span className="text-slate-600/80 dark:text-zinc-400/90 font-jetbrains">;</span>
          </p>
        </div>
      </TerminalBody>
    </motion.div>
  );
}
