import type { Metadata } from "next";

import { BlogPage } from "@/widgets/blog-page";

export const metadata: Metadata = {
  title: "Blog | Frontend Portfolio",
  description: "프론트엔드 개발 메모와 짧은 글",
};

export default function BlogRoute() {
  return <BlogPage />;
}
