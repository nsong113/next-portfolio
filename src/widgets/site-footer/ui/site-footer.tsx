"use client";

import { motion } from "framer-motion";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 py-12">
      <div className="mx-auto max-w-6xl px-4 text-center">
         <p className="[text-shadow:0_0_10px_rgba(80,5,255,0.28),0_0_24px_rgba(80,5,255,0.1)] text-primary dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]">
          &gt; Thank you for visiting_
        </p>
        <motion.div
          className="mb-4 inline-block px-8 py-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            [ System : {year} ] • All rights reserved @nsong113
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
