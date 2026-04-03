"use client";

import type { ChangeEvent, SubmitEventHandler } from "react";
import { motion } from "framer-motion";

import {
  TerminalBody,
  TerminalPromptLine,
  TerminalTitleBar,
  terminalWindowShellClassName,
} from "@/shared/ui/terminal-window";

type ContactTerminalFormProps = {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
};

export function ContactTerminalForm({
  formData,
  onChange,
  onSubmit,
}: ContactTerminalFormProps) {
  return (
    <motion.div
      className={`${terminalWindowShellClassName} flex-1`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <TerminalTitleBar
        title="message_payload.sh"
        className="bg-[#F4EEF5]"
      />

      <TerminalBody className="bg-[#F9F2FA]">
        <TerminalPromptLine
          prompt="guest@portfolio:~$"
          command="sudo init contact --form"
        />

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
      </TerminalBody>
    </motion.div>
  );
}
