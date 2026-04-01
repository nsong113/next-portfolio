"use client";

import { motion } from "framer-motion";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 py-12">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <motion.div
          className="neo-card mb-4 inline-block px-8 py-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            [ System : {year} ] • All rights reserved @nsong113
          </p>
        </motion.div>
        <p className="glow-text text-primary">
          &gt; Thank you for visiting_
        </p>
      </div>
    </footer>
  );
}
