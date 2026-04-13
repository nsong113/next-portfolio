import { APP_ROUTER_STATIC_CONTENT_MARKDOWN } from "./app-router-static-content.content";
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
    slug: "app-router-static-params-metadata",
    title: "Next.js App Router: 블로그·프로젝트 정적 경로와 generateMetadata",
    date: "2026-04-12",
    excerpt:
      "generateStaticParams와 generateMetadata로 이 레포의 블로그·프로젝트 상세 URL을 빌드 시 정적으로 만들고, 페이지별 메타데이터를 맞춘 구조를 코드 기준으로 정리했습니다.",
    content: APP_ROUTER_STATIC_CONTENT_MARKDOWN,
  },
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
