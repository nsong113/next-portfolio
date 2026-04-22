import { APP_ROUTER_STATIC_CONTENT_MARKDOWN } from "./app-router-static-content.content";
import { MAIN_LANDING_SCROLL_PERFORMANCE_MARKDOWN } from "./main-landing-scroll-performance.content";
import { MVVM_LLM_TASK_UI_REFACTOR_MARKDOWN } from "./mvvm-llm-task-ui-refactor.content";
import { NEXTJS_FIRST_HYDRATION_THEME_MARKDOWN } from "./nextjs-first-hydration-theme.content";
import { SPA_SEO_METADATA_SEARCH_SNIPPET_MARKDOWN } from "./spa-seo-metadata-search-snippet.content";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

const BLOG_POSTS_UNSORTED: BlogPost[] = [
  {
    slug: "spa-seo-metadata-search-snippet",
    title: "메타데이터 정합성 개선 및 검색 스니펫 최적화",
    date: "2026-04-23",
    excerpt:
      "라우트별 메타 불일치 진단, meta·OG·JSON-LD 통합·Helmet 적용·초기 HTML·noscript 보강, 네이버 스니펫 정합성 점검까지를 본문 중심으로 정리하고 코드 근거와 운영 증빙의 한계는 접어 두었습니다.",
    content: SPA_SEO_METADATA_SEARCH_SNIPPET_MARKDOWN,
  },
  {
    slug: "main-landing-scroll-performance",
    title: "메인 랜딩 스크롤 인터랙션 개선과 성능 최적화",
    date: "2026-04-22",
    excerpt:
      "문제·진단(Profiler) → 구현(휠, FMStackSection, lazy·React.lazy) → 트레이드오프(휠 rAF·FMStackSection CPU) 순으로, 당시 코드 기준으로 정리한 글입니다.",
    content: MAIN_LANDING_SCROLL_PERFORMANCE_MARKDOWN,
  },
  {
    slug: "mvvm-llm-task-ui-refactor",
    title: "MVVM 적용을 통한 컴포넌트 구조 리팩토링",
    date: "2026-04-21",
    excerpt:
      "LLM task UI(유사 화면 다수)에서 MVVM·useTask*Model/ViewModel·View로 책임을 나누고, 화면 간 파생 상태는 Recoil selector·태스크 안은 커스텀 훅으로 묶어 영향 범위를 예측하기 쉽게 만든 기록입니다. 순차 리팩터링·약 92개 파일 정비, 경계 고민·장단을 덧붙였습니다.",
    content: MVVM_LLM_TASK_UI_REFACTOR_MARKDOWN,
  },
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
