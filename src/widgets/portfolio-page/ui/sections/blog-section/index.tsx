"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";
import { staggerContainer, staggerItem } from "@/shared/lib/motion";
import { BLOG_POSTS } from "@/entities/blog/model/blog-posts";

const PREVIEW_COUNT = 3;

export function BlogSection() {
  const previews = BLOG_POSTS.slice(0, PREVIEW_COUNT);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <PortfolioSectionHeading>&gt; Blog</PortfolioSectionHeading>

        <p className="mb-10 max-w-2xl font-jetbrains text-sm text-muted-foreground">
          개발하면서 남겨 둔 짧은 메모와 실험 기록입니다. 전체 목록은 Blog 페이지에서 볼 수
          있어요.
        </p>

        <motion.ul
          className="mb-10 flex flex-col gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {previews.map((post) => (
            <motion.li key={post.slug} variants={staggerItem}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-[12px] border border-primary/15 bg-card/40 px-5 py-4 transition-colors hover:border-primary/35 hover:bg-card/60"
              >
                <p className="font-jetbrains text-xs text-muted-foreground">
                  {post.date}
                </p>
                <p className="mt-1 font-jetbrains text-base font-semibold text-foreground group-hover:text-primary">
                  {post.title}
                </p>
                <p className="mt-2 line-clamp-2 font-jetbrains text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-primary bg-transparent px-5 py-3 font-jetbrains text-sm font-medium uppercase tracking-wider text-primary transition-colors hover:bg-[#58C4FF]/10"
          >
            전체 글 보기 →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
