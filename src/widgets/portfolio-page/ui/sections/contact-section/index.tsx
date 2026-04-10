"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { AlertCircle, CircleCheck } from "lucide-react";

import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";
import { PortfolioBackdropModal } from "@/shared/ui/portfolio-backdrop-modal";
import { ContactLinks } from "./ui/contact-links";
import { ContactTerminalForm } from "./ui/contact-terminal-form";
import { useContactForm } from "@/features/contact-form";

import flower from "@/shared/assets/images/flower.png";
import modalEllipse from "@/shared/assets/images/modalEllipse.png";

type ModalState =
  | { open: false }
  | { open: true; variant: "success" }
  | { open: true; variant: "error"; errorMessage: string };

export function ContactSection() {
  const [modal, setModal] = useState<ModalState>({ open: false });

  const { formData, handleInputChange, handleSubmit, isSubmitting } =
    useContactForm({
      onSubmitResult: (result) => {
        if (result.ok) {
          setModal({ open: true, variant: "success" });
        } else {
          setModal({
            open: true,
            variant: "error",
            errorMessage: result.error,
          });
        }
      },
    });

  const headingId =
    modal.open && modal.variant === "success"
      ? "contact-success-heading"
      : "contact-error-heading";

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
            isSubmitting={isSubmitting}
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

      <PortfolioBackdropModal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        ariaLabelledBy={modal.open ? headingId : undefined}
      >
        <div className="flex w-full flex-col items-center pb-[calc(15px+3rem+12px)]">
          <div className="relative flex shrink-0 items-center justify-center -translate-y-6 sm:-translate-y-10">
            <Image
              src={flower}
              alt=""
              width={300}
              height={400}
              className="relative z-0 max-h-[160px] w-auto object-contain sm:max-h-[200px]"
            />
            <Image
              src={modalEllipse}
              alt=""
              width={100}
              height={100}
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 size-[min(5.5rem,22vw)] max-w-[70px] -translate-x-1/2 -translate-y-1/2 object-contain"
            />
            {modal.open && modal.variant === "success" ? (
              <CircleCheck
                className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-10 -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow-sm"
                strokeWidth={1.25}
                aria-hidden
              />
            ) : null}
            {modal.open && modal.variant === "error" ? (
              <AlertCircle
                className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-10 -translate-x-1/2 -translate-y-1/2 text-destructive drop-shadow-sm"
                strokeWidth={1.25}
                aria-hidden
              />
            ) : null}
          </div>

          <motion.div
            className="mt-4 w-full space-y-3 px-1 text-center sm:mt-6 sm:-translate-y-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08,
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {modal.open && modal.variant === "success" ? (
              <>
                <span
                  id="contact-success-heading"
                  className="font-jetbrains text-lg font-bold text-foreground"
                >
                  메일이 성공적으로 보내졌어요
                </span>
                <span className="block font-jetbrains text-sm text-muted-foreground">
                  확인하는 대로 답장 드릴게요.
                </span>
              </>
            ) : null}
            {modal.open && modal.variant === "error" ? (
              <>
                <span
                  id="contact-error-heading"
                  className="font-jetbrains text-lg font-bold text-foreground"
                >
                  메일을 보내지 못했어요
                </span>
                <span className="block font-jetbrains text-sm text-muted-foreground">
                  {modal.errorMessage}
                </span>
              </>
            ) : null}
          </motion.div>

          <motion.button
            type="button"
            className="absolute bottom-[15px] left-4 right-4 z-20 border border-primary bg-modal-bg px-4 py-3 text-sm font-medium uppercase tracking-wider text-primary transition-colors hover:bg-[#58C4FF]/10"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            onClick={() => setModal({ open: false })}
          >
            나가기
          </motion.button>
        </div>
      </PortfolioBackdropModal>
    </section>
  );
}
