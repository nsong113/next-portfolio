"use client";

import { motion } from "framer-motion";
import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";
import { ContactLinks } from "./ui/contact-links";
import { ContactTerminalForm } from "./ui/contact-terminal-form";
import { useContactForm } from "./model/use-contact-form";

export function ContactSection() {
  const { formData, handleInputChange, handleSubmit } = useContactForm();

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
    </section>
  );
}

