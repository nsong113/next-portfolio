"use client";

import { motion } from "framer-motion";
import { ContactLinks } from "./ui/contact-links";
import { ContactTerminalForm } from "./ui/contact-terminal-form";
import { useContactForm } from "./model/use-contact-form";

export function ContactSection() {
  const { formData, handleInputChange, handleSubmit } = useContactForm();

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="relative mb-16 before:content-[''] before:absolute before:-inset-5 before:rounded-full before:bg-[radial-gradient(circle,rgb(var(--accent-rgb)/0.10)_0%,transparent_70%)] before:-z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="[text-shadow:0_0_10px_rgba(80,5,255,0.28),0_0_24px_rgba(80,5,255,0.1)] text-center font-jetbrains text-3xl md:text-4xl dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]">
            &gt; Establish Connection
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
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
          <div className="inline-block px-6 py-3">
            <p className="font-jetbrains text-sm text-muted-foreground">
              [ Connection established successfully ]
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

