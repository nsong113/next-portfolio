import Link from "next/link";

import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";
import { BLOG_POSTS } from "@/entities/blog/model/blog-posts";

export function BlogPage() {
  return (
    <main className="flex-1 overflow-x-hidden bg-transparent px-4 py-16 text-foreground md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 font-jetbrains text-sm text-muted-foreground">
          <Link
            href="/home"
            className="text-primary underline-offset-4 transition-colors hover:text-opposite-color hover:underline"
          >
            ← Portfolio
          </Link>
        </p>

        <PortfolioSectionHeading>&gt; Blog</PortfolioSectionHeading>

        <p className="mb-12 font-jetbrains text-sm text-muted-foreground">
          프론트엔드 개발 관련 짧은 글과 메모입니다.
        </p>

        <ul className="flex flex-col gap-6">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <article className="rounded-[12px] border border-primary/15 bg-card/30 p-6 transition-colors hover:border-primary/30">
                <p className="font-jetbrains text-xs text-muted-foreground">
                  {post.date}
                </p>
                <h2 className="mt-2 font-jetbrains text-lg font-semibold text-foreground">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 font-jetbrains text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <p className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-jetbrains text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    읽기 →
                  </Link>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
