"use client";

import { motion } from "framer-motion";
import type { ChangeEvent, FormEventHandler } from "react";

type ContactTerminalFormProps = {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function ContactTerminalForm({
  formData,
  onChange,
  onSubmit,
}: ContactTerminalFormProps) {
  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-slate-900/10 bg-white/70 font-jetbrains shadow-[0_18px_64px_rgba(2,6,23,0.10)] backdrop-blur-xl dark:border-white/12 dark:bg-[rgba(40,42,55,0.94)] dark:shadow-[0_18px_64px_rgba(0,0,0,0.24)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-2 border-b border-slate-900/10 bg-slate-900/5 px-3 py-2.5 dark:border-white/10 dark:bg-[rgba(50,52,68,0.96)]">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
        </div>
        <span className="flex-1 text-center text-[11px] leading-none text-slate-500 dark:text-zinc-500">
          message_payload.sh
        </span>
        <span className="w-[52px] shrink-0" aria-hidden />
      </div>

      <div className="bg-size-[20px_20px] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] bg-white/35 px-5 py-6 md:px-7 md:py-8 dark:bg-[rgba(40,42,55,0.88)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.043)_1px,transparent_0)]">
        <p className="mb-6 text-[13px] leading-relaxed tracking-tight antialiased">
          <span className="text-cyan-700 dark:text-primary">guest@portfolio:~$</span>{" "}
          <span className="text-slate-900 dark:text-zinc-100">sudo init contact --form</span>
        </p>

        <form onSubmit={onSubmit} className="space-y-7">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-primary"
            >
              Name:
            </label>
            <div className="flex items-center gap-2">
              <span className="select-none text-slate-500 dark:text-zinc-600">|</span>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                autoComplete="name"
                className="min-w-0 flex-1 border-b border-slate-900/20 bg-transparent py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-primary focus:outline-none dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                placeholder="Enter your name..."
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-primary"
            >
              Email:
            </label>
            <div className="flex items-center gap-2">
              <span className="select-none text-slate-500 dark:text-zinc-600">|</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
                autoComplete="email"
                className="min-w-0 flex-1 border-b border-slate-900/20 bg-transparent py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-primary focus:outline-none dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-primary"
            >
              Message:
            </label>
            <div className="flex gap-2">
              <span className="mt-2 select-none text-slate-500 dark:text-zinc-600">|</span>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={onChange}
                required
                rows={6}
                className="min-h-[140px] w-full resize-y border border-slate-900/15 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-primary focus:outline-none dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                placeholder="Type your message here..."
              />
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-400">
            <span className="text-slate-500 dark:text-zinc-500">{"/* "}</span>
            Ready to deploy your message.
            <span className="text-slate-500 dark:text-zinc-500">{" */"}</span>
          </p>

          <motion.button
            type="submit"
            className="w-full border border-primary bg-transparent px-4 py-3 text-sm font-medium uppercase tracking-wider text-primary transition-colors hover:bg-[#58C4FF]/10"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            [ COMMIT &amp; PUSH ]
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

