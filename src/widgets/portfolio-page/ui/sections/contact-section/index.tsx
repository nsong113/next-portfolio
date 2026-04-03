"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";

import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";
import { ContactLinks } from "./ui/contact-links";
import { ContactTerminalForm } from "./ui/contact-terminal-form";
import { useContactForm } from "@/features/contact-form";

import flower from "@/shared/assets/images/flower.png";
import modalEllipse from "@/shared/assets/images/modalEllipse.png";

export function ContactSection() {
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);

  const { formData, handleInputChange, handleSubmit } = useContactForm({
    onCommit: () => setOverlayOpen(true),
  });

  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOverlayOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen]);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <PortfolioSectionHeading>
          &gt; Contact Me
        </PortfolioSectionHeading>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <ContactLinks />
          <ContactTerminalForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-3">
            <p className="font-jetbrains text-sm text-muted-foreground">
              [ Connection established successfully ]
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {overlayOpen ? (
          <motion.div
            key="contact-modal-overlay"
            role="presentation"
            className="fixed inset-0 z-100 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              aria-hidden
              className="pointer-events-auto absolute inset-0 bg-black/55 backdrop-blur-[3px]"
              onClick={() => setOverlayOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-success-heading"
              className="pointer-events-auto relative p-4 z-10 flex max-w-[300px] max-h-[350px] flex-col items-center rounded-[15px] bg-modal-bg shadow-lg"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex w-full flex-col items-center ">
                <div className="relative flex shrink-0 items-center justify-center -translate-y-10">
                  <Image
                    src={flower}
                    alt=""
                    width={300}
                    height={400}
                    className="relative z-0  w-auto object-contain "
                  />
                  <Image
                    src={modalEllipse}
                    alt=""
                    width={100}
                    height={100}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-10 size-[min(5.5rem,22vw)] max-w-[70px] -translate-x-1/2 -translate-y-1/2 object-contain"
                  />
                  <CircleCheck
                    className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-10 -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow-sm"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                </div>

                <motion.div
                  className="mt-6 w-full space-y-3 text-center -translate-y-23"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08,
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span
                    id="contact-success-heading"
                    className="text-lg font-bold text-foreground"
                  >
                    메일이 성공적으로 보내졌어요
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    확인하는 대로 답장 드릴게요.
                  </span>
                </motion.div>

                <motion.button
                  type="button"
                  className="mt-7 w-full border border-primary bg-transparent px-4 py-3 text-sm font-medium uppercase tracking-wider text-primary transition-colors hover:bg-[#58C4FF]/10 -translate-y-25"
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => setOverlayOpen(false)}
                >
                  나가기
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

