import type { ReactNode } from "react";

export const terminalWindowShellClassName =
  "w-full overflow-hidden rounded-xl border border-slate-900/10 bg-white/70 shadow-[0_18px_64px_rgba(2,6,23,0.10)] backdrop-blur-xl dark:border-white/12 dark:bg-[rgba(42,48,69,0.94)] dark:shadow-[0_18px_64px_rgba(0,0,0,0.24)]";

function TrafficLights() {
  return (
    <div className="flex gap-2">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
    </div>
  );
}

type TerminalTitleBarProps = {
  title: string;
  className?: string;
};

export function TerminalTitleBar({ title, className }: TerminalTitleBarProps) {
  return (
    <div
      className={`flex items-center gap-2 border-b border-slate-900/10 px-3 py-2.5 ${className ?? "bg-slate-900/5"} dark:border-white/10 dark:bg-[rgba(48,55,77,0.96)]`}
    >
      <TrafficLights />
      <span className="flex-1 text-center text-[11px] leading-none text-slate-500 font-jetbrains dark:text-zinc-500">
        {title}
      </span>
      <span className="w-[52px] shrink-0" aria-hidden />
    </div>
  );
}

type TerminalBodyProps = {
  children: ReactNode;
  className: string;
};

export function TerminalBody({ children, className }: TerminalBodyProps) {
  return (
    <div
      className={`bg-size-[20px_20px] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] px-5 py-6 md:px-7 md:py-8 ${className} dark:bg-[rgba(38,41,61,0.88)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.043)_1px,transparent_0)]`}
    >
      {children}
    </div>
  );
}

type TerminalPromptLineProps = {
  prompt: string;
  command: string;
};

export function TerminalPromptLine({ prompt, command }: TerminalPromptLineProps) {
  return (
    <p className="mb-6 text-[13px] leading-relaxed tracking-tight antialiased font-jetbrains">
      <span className="text-cyan-700 dark:text-primary ">{prompt}</span>{" "}
      <span className="text-slate-900 dark:text-zinc-100">{command}</span>
    </p>
  );
}
