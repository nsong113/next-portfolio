"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { CONTACT_LINK_ITEMS } from "@/entities/contact/model/contact-links-data";
import { staggerContainer, staggerItem } from "@/shared/lib/motion";
import { IconGithub, IconLinkedin } from "@/shared/ui/icons/social";

const LINK_ICON_BOX_CLASS =
  "rounded-lg border border-[rgb(var(--accent-rgb)/0.34)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.10),rgb(var(--accent-rgb)/0.05))] p-4 shadow-[0_2px_12px_rgb(var(--accent-rgb)/0.14),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-px group-hover:bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.18),rgb(var(--accent-rgb)/0.10))] group-hover:shadow-[0_6px_20px_rgb(var(--accent-rgb)/0.22),inset_0_1px_0_rgba(255,255,255,0.70)] dark:border-[rgba(138,43,226,0.40)] dark:bg-[linear-gradient(145deg,rgba(138,43,226,0.10),rgba(138,43,226,0.05))] dark:shadow-[0_2px_8px_rgba(138,43,226,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] dark:group-hover:bg-[linear-gradient(145deg,rgba(138,43,226,0.20),rgba(138,43,226,0.10))] dark:group-hover:shadow-[0_4px_16px_rgba(138,43,226,0.25),inset_0_1px_0_rgba(255,255,255,0.10)]";

const EMAIL_ICON_BOX_CLASS =
  "rounded-lg border border-[rgb(var(--accent-rgb)/0.34)] bg-[linear-gradient(145deg,rgb(var(--accent-rgb)/0.10),rgb(var(--accent-rgb)/0.05))] p-4 shadow-[0_2px_12px_rgb(var(--accent-rgb)/0.14),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-300 dark:border-[rgba(138,43,226,0.40)] dark:bg-[linear-gradient(145deg,rgba(138,43,226,0.10),rgba(138,43,226,0.05))] dark:shadow-[0_2px_8px_rgba(138,43,226,0.15),inset_0_1px_0_rgba(255,255,255,0.05)]";

function ContactLinkIcon({ icon }: { icon: "github" | "linkedin" | "mail" }) {
  const className = "text-primary";
  const size = 24;
  if (icon === "github") return <IconGithub className={className} size={size} />;
  if (icon === "linkedin") return <IconLinkedin className={className} size={size} />;
  return <Mail size={size} className={className} />;
}

export function ContactLinks() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full flex-1"
    >
      <motion.h3
        variants={staggerItem}
        className="mb-6 font-jetbrains text-2xl font-bold text-primary"
      >
        Get In Touch
      </motion.h3>
      <motion.p
        variants={staggerItem}
        className="mb-8 font-sans text-lg leading-relaxed text-foreground break-keep"
      >
        다음 프로젝트를 함께해 볼까요? 블라블라 예시 문구임더.. 연락 주시면 멋진 결과를 함께 만들어가겠습니다. 새로운 기회와 혁신적인 아이디어에 대한 이야기를 언제나 반갑게 기다리고 있습니다.
      </motion.p>

      <div className="space-y-6">
        {CONTACT_LINK_ITEMS.map((item) =>
          item.kind === "link" ? (
            <motion.a
              key={item.id}
              variants={staggerItem}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
              whileHover={{ x: 4 }}
            >
              <div className={LINK_ICON_BOX_CLASS}>
                <ContactLinkIcon icon={item.icon} />
              </div>
              <span className="font-jetbrains text-foreground transition-colors duration-300 group-hover:text-primary">
                {item.label}
              </span>
            </motion.a>
          ) : (
            <motion.div key={item.id} variants={staggerItem} className="flex items-center gap-4">
              <div className={EMAIL_ICON_BOX_CLASS}>
                <ContactLinkIcon icon={item.icon} />
              </div>
              <span className="font-jetbrains text-foreground">{item.label}</span>
            </motion.div>
          ),
        )}
      </div>
    </motion.div>
  );
}
