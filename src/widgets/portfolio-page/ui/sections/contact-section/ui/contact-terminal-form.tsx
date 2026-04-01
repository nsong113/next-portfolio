"use client";

import { motion } from "framer-motion";

type ContactTerminalFormProps = {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export function ContactTerminalForm({
  formData,
  onChange,
  onSubmit,
}: ContactTerminalFormProps) {
  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-zinc-700/90 bg-black font-jetbrains shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-[#252525] px-3 py-2.5">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
        </div>
        <span className="flex-1 text-center text-[11px] leading-none text-zinc-500">
          message_payload.sh
        </span>
        <span className="w-[52px] shrink-0" aria-hidden />
      </div>

      <div className="bg-size-[20px_20px] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-black px-5 py-6 md:px-7 md:py-8">
        <p className="mb-6 text-[13px] leading-relaxed tracking-tight antialiased">
          <span className="text-cyan-400">guest@portfolio:~$</span>{" "}
          <span className="text-zinc-100">sudo init contact --form</span>
        </p>

        <form onSubmit={onSubmit} className="space-y-7">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#58C4FF]"
            >
              Name:
            </label>
            <div className="flex items-center gap-2">
              <span className="select-none text-zinc-600">|</span>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                autoComplete="name"
                className="min-w-0 flex-1 border-b border-zinc-800 bg-transparent py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#58C4FF] focus:outline-none"
                placeholder="Enter your name..."
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#58C4FF]"
            >
              Email:
            </label>
            <div className="flex items-center gap-2">
              <span className="select-none text-zinc-600">|</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
                autoComplete="email"
                className="min-w-0 flex-1 border-b border-zinc-800 bg-transparent py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#58C4FF] focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#58C4FF]"
            >
              Message:
            </label>
            <div className="flex gap-2">
              <span className="mt-2 select-none text-zinc-600">|</span>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={onChange}
                required
                rows={6}
                className="min-h-[140px] w-full resize-y border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#58C4FF] focus:outline-none"
                placeholder="Type your message here..."
              />
            </div>
          </div>

          <p className="text-sm text-zinc-400">
            <span className="text-zinc-500">{"/* "}</span>
            Ready to deploy your message.
            <span className="text-zinc-500">{" */"}</span>
          </p>

          <motion.button
            type="submit"
            className="w-full border border-[#58C4FF] bg-transparent px-4 py-3 text-sm font-medium uppercase tracking-wider text-[#58C4FF] transition-colors hover:bg-[#58C4FF]/10"
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

