"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

function emptySubscribe() {
  return () => {};
}

export type PortfolioBackdropModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  panelClassName?: string;
  ariaLabelledBy?: string;
};

const DEFAULT_PANEL_CLASS =
  "pointer-events-auto relative z-10 flex max-h-[min(420px,90vh)] w-[min(400px,100%)] max-w-[400px] flex-col items-center overflow-y-auto rounded-[15px] bg-modal-bg p-4 shadow-lg";

export function PortfolioBackdropModal({
  open,
  onClose,
  children,
  panelClassName = DEFAULT_PANEL_CLASS,
  ariaLabelledBy,
}: PortfolioBackdropModalProps) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!isClient) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="portfolio-backdrop-modal"
          role="presentation"
          className="fixed inset-0 z-200 flex items-center justify-center p-4 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden
            className="pointer-events-auto absolute inset-0 bg-black/55 backdrop-blur-[3px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledBy}
            className={panelClassName}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
