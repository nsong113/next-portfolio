/**
 * 블로그 글 본문 — `blog-posts.ts`에서 참조 (백틱·템플릿 이스케이프를 피하기 위해 분리)
 */
export const NEXTJS_FIRST_HYDRATION_THEME_MARKDOWN = [
  `이 포트폴리오는 **Next.js를 처음 써 본 프로젝트**예요. App Router·하이드레이션을 문서로만 알다가, 실제로는 콘솔에 빨간 경고가 뜨고 테마가 한 번 깜빡이는 걸 겪었습니다. 아래는 **무슨 일이었는지**, **왜 생겼는지**, **이 레포에서 어떻게 맞췄는지**만 정리한 글입니다.`,

  `> **한눈에**: 서버 HTML과 브라우저 첫 렌더가 달라지면 hydration 경고가 난다. 테마는 \`localStorage\`/OS처럼 **서버가 모르는 값**이라 특히 그렇다. \`suppressHydrationWarning\` + CSS 토큰 + \`next-themes\` 옵션으로 맞췄다.`,

  `## 증상`,

  `| 구분 | 내용 |
| --- | --- |
| 콘솔 | *Hydration failed*, *Text content does not match* 등 (버전마다 문구는 조금 다름) |
| 화면 | 배경·글자색이 **한 번 깜빡**이거나, 저장된 테마와 첫 페인트가 잠깐 어긋남 |
| 머릿속 | “서버는 왜 다크를 모르지?”, “\`use client\`인데 왜 서버가 관여하지?” |`,

  `---`,

  `## 하이드레이션: 왜 Next에서 더 체감되나`,

  `클라이언트가 서버가 보낸 HTML에 React 트리를 **붙이는** 과정이 하이드레이션이에요. **서버 DOM**과 **첫 클라 렌더가 기대하는 DOM**이 다르면 경고가 납니다. App Router는 요청마다 서버가 먼저 그리므로, 예전처럼 “클라만”이 아니라 **서버 HTML이 항상 먼저** 있다는 게 느껴집니다.`,

  `자주 나는 원인은 **양쪽이 동시에 알 수 없는 값**으로 UI를 나눈 경우예요.`,

  `- \`window\`, \`document\`, \`localStorage\``,
  `- OS/저장값에만 의존하는 **테마**`,

  `\`next-themes\`는 \`<html class="dark">\` 같은 걸 **클라에서만** 맞추기 때문에, 서버가 보낸 첫 \`<html>\`과 첫 하이드레이션 순간이 어긋날 수 있어요. 그때 \`suppressHydrationWarning\`을 문서에서 권하는 이유입니다.`,

  `---`,

  `## 이 프로젝트에서 한 일 (세 가지)`,

  `1. **\`<html>\`**: \`suppressHydrationWarning\`으로 *알려진* 클래스 불일치를 경고에서 제외`,
  `2. **CSS**: \`:root\` / \`.dark\`에 토큰을 두고 \`bg-background\`처럼 이름만 씀`,
  `3. **\`ThemeProvider\`**: \`attribute="class"\`, \`defaultTheme\`, \`enableSystem\`, \`disableTransitionOnChange\`로 동작과 번쩍임 조정`,

  `### 1. 루트 \`<html>\` (\`src/app/layout.tsx\`)`,

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

  `> \`suppressHydrationWarning\`은 불일치를 “고쳐 주는” 게 아니라, **테마처럼 클라에서만 확정되는 속성**에 대해 React에게 미리 알려 주는 힌트에 가깝습니다.`,

  `### 2. CSS 토큰 (\`src/shared/styles/index.css\` 발췌)`,

  `하드코딩 색(\`#22264b\` 등)을 쓰면 다크 전환 시 **일부만** 바뀌는 버그가 나기 쉬워요. \`:root\`와 \`.dark\`에 변수를 두고 Tailwind \`dark:\`와 연결했습니다.`,

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

  `### 3. \`ThemeProvider\` (\`src/app/providers.tsx\`)`,

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

  `| 옵션 | 역할 |
| --- | --- |
| \`attribute="class"\` | \`<html>\`에 \`dark\` 등을 붙여 Tailwind \`dark:\`와 짝 맞춤 |
| \`defaultTheme="dark"\` + \`enableSystem\` | 첫 방문은 다크 기본, 시스템 테마도 후보 |
| \`disableTransitionOnChange\` | 전환 순간 전역 transition 때문에 화면이 번쩍이는 완화 |`,

  `---`,

  `## 디버깅할 때`,

  `- Hydration 경고 → **서버 HTML과 첫 클라 렌더가 같은지**. \`Date.now()\`, \`Math.random()\`, \`window\`, **저장된 테마** 분기 여부 확인`,
  `- 색이 반만 바뀜 → 하드코딩 줄이고 \`bg-background\` 같은 **토큰**으로 통일`,

  `## 마치며`,

  `Next를 쓰면 **서버가 한 번 그리고 브라우저가 이어 받는다**는 감각이 생깁니다. 테마처럼 **브라우저에만 있는 정보**를 쓰는 순간 그 경계에서 경고가 나올 수 있다는 것도요. 비슷한 증상을 처음 겪는 분에게 이 글이 “내가 이상한 게 아니라 경계를 어디에 두느냐의 문제”로 읽히면 좋겠습니다.`,
].join("\n\n");
