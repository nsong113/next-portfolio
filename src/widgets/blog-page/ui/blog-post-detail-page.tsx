import Link from "next/link";

import type { BlogPost } from "@/entities/blog/model/blog-posts";

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
            href="/"
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

        <div className="mt-10 max-w-none font-jetbrains text-sm leading-relaxed text-muted-foreground">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
