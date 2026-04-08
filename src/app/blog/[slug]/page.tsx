import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BlogPostDetailPage } from "@/widgets/blog-page";
import { BLOG_POSTS, getPostBySlug } from "@/entities/blog/model/blog-posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Blog" };
  }
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt.slice(0, 160),
  };
}

export default async function BlogPostRoute({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  return <BlogPostDetailPage post={post} />;
}
