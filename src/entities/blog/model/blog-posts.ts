export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** 본문 (마크다운 아님) */
  content: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "next-app-router-notes",
    title: "Next.js App Router에서 레이아웃 나누기",
    date: "2026-03-15",
    excerpt:
      "app 디렉터리 기준으로 라우트와 공통 셸을 정리하면서 겪은 선택들을 짧게 정리했습니다.",
    content:
      "레이아웃은 URL 트리와 맞추고, 클라이언트 전용 위젯은 동적 import로 번들을 나눴습니다. 스플래시처럼 한 번만 보여야 하는 UI는 Context로 게이트를 두었어요.\n\n아직 실험 중인 패턴도 있어서, 나중에 글을 더 보강할 예정입니다.",
  },
  {
    slug: "tailwind-v4-theme",
    title: "Tailwind v4와 다크 모드 토큰",
    date: "2026-02-02",
    excerpt:
      "CSS 변수 기반 테마를 next-themes class 전략과 맞추면서 색 토큰을 정리한 기록입니다.",
    content:
      ":root와 .dark에 같은 키를 두고, 컴포넌트에서는 semantic 이름만 쓰도록 맞췄습니다. 포트폴리오 톤에 맞춰 primary / muted / modal-bg 정도만 쓰고 있어요.",
  },
  {
    slug: "framer-motion-stagger",
    title: "Framer Motion stagger로 섹션 등장시키기",
    date: "2026-01-10",
    excerpt:
      "whileInView와 staggerChildren 조합으로 스크롤 시 카드가 순서대로 보이게 한 설정입니다.",
    content:
      "viewport once: true로 한 번만 재생하고, amount는 섹션마다 살짝 다르게 두었습니다. 모션은 과하면 산만해지니까 지연과 duration을 보수적으로 잡는 편이에요.",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
