/**
 * 블로그 글 본문 — `blog-posts.ts`에서 참조 (백틱·템플릿 이스케이프를 피하기 위해 분리)
 */
export const NEXTJS_FIRST_HYDRATION_THEME_MARKDOWN = [
  `이 포트폴리오는 **Next.js를 처음 써 본 프로젝트**예요. 문서로만 보던 하이드레이션이 실제로는 **콘솔 빨간 글씨**와 **테마 깜빡임**으로 나타났습니다.`,

  `아래는 **무슨 증상이었는지**, **왜 그런지**, **이 레포에서 어떻게 맞췄는지**만 짚은 글입니다.`,

  `> **한 줄 요약**  
> 서버가 그린 HTML과 브라우저 첫 렌더가 다르면 hydration 경고.  
> 테마는 서버가 모르는 값(\`localStorage\`, OS)이라 자주 걸림.  
> \`suppressHydrationWarning\` + CSS 토큰 + \`next-themes\` 설정으로 정리.`,

  `## 증상`,

  `| 어디 | 무슨 일 |
| --- | --- |
| 콘솔 | *Hydration failed*, *Text content does not match* 등 (버전마다 문구는 조금 다름) |
| 화면 | 배경·글자색이 **잠깐 깜빡**이거나, 저장된 테마와 첫 화면이 어긋남 |
| 머릿속 | “서버는 왜 다크를 모르지?”, “\`use client\`인데 왜 서버가 관여하지?” |`,

  `---`,

  `## 하이드레이션이 뭐고, 왜 Next에서 잘 보이나`,

  `**하이드레이션**: 서버가 보낸 HTML에 React가 클라이언트 트리를 **이어 붙이는** 과정이에요.`,

  `서버 DOM과 **첫 클라 렌더가 기대하는 DOM**이 다르면 경고가 납니다. App Router는 **항상 서버 HTML이 먼저** 있으니, 예전 “클라만”보다 이게 체감돼요.`,

  `자주 나는 원인은 **서버와 브라우저가 동시에 알 수 없는 값**으로 화면을 갈라 놓은 경우예요.`,

  `- \`window\`, \`document\`, \`localStorage\``,
  `- OS·저장값에만 의존하는 **테마**`,

  `\`next-themes\`는 \`<html class="dark">\` 같은 걸 **클라에서만** 맞춥니다. 그래서 첫 HTML과 첫 하이드레이션 순간이 어긋날 수 있고, 문서에서 \`suppressHydrationWarning\`을 권하는 거예요.`,

  `---`,

  `## 이 레포에서 한 일 — 세 가지`,

  `1. **\`<html>\`**: \`suppressHydrationWarning\` — *알려진* 클래스 불일치를 경고에서 빼 줌`,
  `2. **CSS**: \`:root\` / \`.dark\`에 토큰 → \`bg-background\`처럼 이름만 사용`,
  `3. **\`ThemeProvider\`**: 클래스 모드·기본 테마·시스템 연동·전환 시 번쩍임 줄이기`,

  `### 1. 루트 \`<html>\` — \`src/app/layout.tsx\``,

  `\`\`\`tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { AppChrome } from "@/app/app-chrome";
import { AppProviders } from "@/app/providers";

import "@/shared/styles/index.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={\`\${jetbrainsMono.variable} h-full antialiased\`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppProviders>
          <AppChrome>{children}</AppChrome>
        </AppProviders>
      </body>
    </html>
  );
}
\`\`\``,

  `> \`suppressHydrationWarning\`은 버그를 “고쳐 주는” 게 아니에요. **테마처럼 클라에서만 확정되는 속성**에 대해 React에게 미리 알려 주는 힌트에 가깝습니다.`,

  `### 2. CSS 토큰 — \`src/shared/styles/index.css\` (발췌)`,

  `색을 컴포넌트마다 \`#22264b\`처럼 박아 두면, 다크 전환 시 **일부만** 바뀌는 버그가 나기 쉬워요. 변수로 묶었습니다.`,

  `\`\`\`css
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #fafafa;
  --foreground: #26293d;
  /* ... */
}

.dark {
  --background: #22264b;
  --foreground: #fef6ff;
  /* ... */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... */
}
\`\`\``,

  `### 3. \`ThemeProvider\` — \`src/app/providers.tsx\``,

  `\`\`\`tsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { createQueryClient } from "@/shared/lib/query-client";
import { CustomCursor } from "@/shared/ui/custom-cursor";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <CustomCursor />
      </ThemeProvider>
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      ) : null}
    </QueryClientProvider>
  );
}
\`\`\``,

  `| 옵션 | 하는 일 |
| --- | --- |
| \`attribute="class"\` | \`<html>\`에 \`dark\` 등을 붙여 Tailwind \`dark:\`와 맞춤 |
| \`defaultTheme="dark"\` + \`enableSystem\` | 첫 방문은 다크 기본, 시스템 테마도 선택지 |
| \`disableTransitionOnChange\` | 테마 바꿀 때 전역 transition 때문에 화면이 번쩍이는 완화 |`,

  `---`,

  `## 디버깅할 때`,

  `- Hydration 경고 → **서버 HTML과 첫 클라가 같은지**부터. \`Date.now()\`, \`Math.random()\`, \`window\`, **저장된 테마**로 나누는지 확인`,
  `- 색이 반만 바뀜 → 하드코딩 줄이고 \`bg-background\` 같은 **토큰**으로 통일`,

  `## 마치며`,

  `Next를 쓰면 **서버가 한 번 그리고 브라우저가 이어 받는다**는 감이 생깁니다. 테마처럼 **브라우저에만 있는 정보**를 쓰는 순간, 그 경계에서 경고가 나올 수 있어요.`,

  `비슷한 증상을 처음 겪는 분에게는 “내가 이상한 게 아니라, **경계를 어디에 두느냐**의 문제”로 읽히면 좋겠습니다.`,
].join("\n\n");
