import { NEXTJS_FIRST_HYDRATION_THEME_MARKDOWN } from "./nextjs-first-hydration-theme.content";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

const BLOG_POSTS_UNSORTED: BlogPost[] = [
  {
    slug: "nextjs-first-hydration-theme",
    title: "Next.js 첫 프로젝트: 하이드레이션·다크모드에서 막혔던 것들",
    date: "2026-04-09",
    excerpt:
      "처음 쓰는 Next.js에서 콘솔 hydration 경고와 테마·CSS 토큰을 맞추며 겪은 문제와 원인, 그리고 이 레포 코드로 어떻게 처리했는지 길게 정리했습니다.",
    content: NEXTJS_FIRST_HYDRATION_THEME_MARKDOWN,
  },
];

export const BLOG_POSTS: BlogPost[] = [...BLOG_POSTS_UNSORTED].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
