import Link from "next/link";

import type { BlogPost } from "@/entities/blog/model/blog-posts";
import { BLOG_POSTS } from "@/entities/blog/model/blog-posts";
import { PortfolioSectionHeading } from "@/shared/ui/portfolio-section-heading";

import { BlogMarkdown } from "./ui/blog-markdown";

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

type BlogPostDetailPageProps = {
  post: BlogPost;
};

export function BlogPostDetailPage({ post }: BlogPostDetailPageProps) {
  return (
    <main className="flex-1 overflow-x-hidden bg-transparent px-4 py-16 text-foreground md:py-24">
      <article className="mx-auto max-w-3xl">
        <p className="mb-6 flex flex-wrap gap-x-4 gap-y-2 font-jetbrains text-sm text-muted-foreground">
          <Link
            href="/blog"
            className="text-primary underline-offset-4 transition-colors hover:text-opposite-color hover:underline"
          >
            ← Blog 목록
          </Link>
          <span aria-hidden className="text-border">
            |
          </span>
          <Link
            href="/home"
            className="text-primary underline-offset-4 transition-colors hover:text-opposite-color hover:underline"
          >
            Portfolio
          </Link>
        </p>

        <p className="font-jetbrains text-xs text-muted-foreground">{post.date}</p>
        <h1
          className="mt-4 font-jetbrains text-2xl font-bold leading-snug text-foreground [text-shadow:0_0_3px_rgba(80,5,255,0.035)] md:text-3xl dark:[text-shadow:0_0_10px_rgba(88,187,246,0.2)]"
        >
          &gt; {post.title}
        </h1>

        <div className="mt-10">
          <BlogMarkdown>{post.content}</BlogMarkdown>
        </div>
      </article>
    </main>
  );
}
