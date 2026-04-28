/**
 * 블로그 글 본문 — `blog-posts.ts`에서 참조
 */
export const APP_ROUTER_STATIC_CONTENT_MARKDOWN = [
  `블로그 글·프로젝트 상세는 URL마다 다르지만, **데이터는 빌드할 때 전부 정해져 있어요.** 그래서 동적 세그먼트(\`[slug]\`, \`[id]\`)를 쓰면서도 **정적 생성**에 가깝게 가져갔습니다.`,

  `> **한 줄 요약**  
> \`generateStaticParams\` → “이 경로들 HTML 만들어 줘”  
> \`generateMetadata\` → “그 경로마다 탭 제목·설명 붙여 줘”`,

  `데이터는 \`BLOG_POSTS\`, \`PROJECTS\`에만 두고, **라우트 파일은 연결만** 담당하게 했어요.`,

  `---`,

  `## 두 함수 역할`,

  `| 함수 | 하는 일 |
| --- | --- |
| \`generateStaticParams\` | 빌드 시 **어떤 \`slug\` / \`id\` 페이지를 만들지** 목록을 넘김 |
| \`generateMetadata\` | 각 URL마다 **title, description** 등 메타 채움 (검색·SNS 미리보기·탭) |`,

  `---`,

  `## 블로그 — \`src/app/blog/[slug]/page.tsx\``,

  `- **데이터**: \`blog-posts.ts\`의 \`slug\`와 같음. 본문은 \`getPostBySlug\`. 없으면 \`notFound()\`.`,
  `- **경로**: 글 목록을 돌며 \`{ slug }\`만 뽑아 줌 → 글 추가하면 그만큼 페이지가 생김.`,
  `- **메타**: 제목 \`| Blog\`, 설명은 \`excerpt\` 앞 160자.`,

  `\`\`\`tsx
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
    title: \`\${post.title} | Blog\`,
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
\`\`\``,

  `---`,

  `## 프로젝트 상세 — \`src/app/projects/[id]/page.tsx\``,

  `- **데이터**: 숫자 \`id\`. **포트폴리오에 노출한 항목만** 경로에 포함 (\`portfolio != null\`).`,
  `- **경로**: URL은 문자열이라 \`String(p.id)\`로 넘김.`,
  `- **메타**: \`portfolio.title\`, \`portfolio.description\` 사용.`,

  `\`\`\`tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ProjectDetailPage } from "@/widgets/project-detail-page";

import { PROJECTS } from "@/entities/project/model/project-data";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.portfolio != null).map((p) => ({
    id: String(p.id),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === Number(id));
  if (!project?.portfolio) {
    return { title: "Project" };
  }
  return {
    title: \`\${project.portfolio.title} | Project\`,
    description: project.portfolio.description.slice(0, 160),
  };
}

export default async function ProjectDetailRoute({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === Number(id));

  if (!project?.portfolio) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
\`\`\``,

  `---`,

  `## 블로그 vs 프로젝트`,

  `| | 블로그 | 프로젝트 |
| --- | --- | --- |
| 데이터 파일 | \`blog-posts.ts\` | \`project-data.ts\` |
| 세그먼트 | \`slug\` (문자열) | \`id\` (숫자 → URL에선 문자열) |
| 경로 제한 | 전체 글 | \`portfolio\` 있는 것만 |`,

  `---`,

  `## 기억해 두면 좋은 점`,

  `- **한곳에서만 수정**: 새 글·새 프로젝트는 데이터만 추가하면, 빌드 시 경로·메타가 따라옴.`,
  `- **없는 주소**: \`generateMetadata\`는 짧은 기본 제목, 페이지는 \`notFound()\`.`,
  `- **params**: 이 프로젝트는 \`params\`가 **Promise**라서 \`await params\`로 꺼냄 (Next App Router 규약).`,
].join("\n\n");
