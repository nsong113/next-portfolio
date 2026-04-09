/**
 * 블로그 글 본문 — `blog-posts.ts`에서 참조 (백틱·템플릿 이스케이프를 피하기 위해 분리)
 */
export const NEXTJS_FIRST_HYDRATION_THEME_MARKDOWN = [
  `이 포트폴리오는 제가 **Next.js를 처음 써 본 프로젝트**예요. 그 전에는 주로 React만 다뤘고, 번들러는 Vite나 CRA 느낌에 가깝게 썼거든요. App Router, 서버 컴포넌트, **하이드레이션** 같은 단어는 문서에서 봤는데, 실제로 프로젝트를 띄우니 **개발자 도구 콘솔에 빨간 글씨**가 뜨고, “서버에서 그린 거랑 브라우저에서 그린 거랑 왜 같아야 하지?” 하는 질문부터 시작했습니다. 여기서는 그때 **무슨 문제였는지**, **왜 그런 일이 생겼는지**, **지금 코드베이스에서 어떻게 처리했는지**를 최대한 솔직하고 길게 정리해 둡니다.`,

  `## 들어가며: 처음에 겪었던 증상들`,

  `한 줄로 요약하면 이런 것들이었어요.`,

  `- **콘솔**: React가 *Hydration failed* / *Text content does not match* / *Expected server HTML to contain a matching* 같은 메시지를 뱉는다. (문구는 버전에 따라 조금 다를 수 있어요.)`,
  `- **테마**: 배경·글자색이 **한 번 깜빡**이거나, OS/저장된 설정과 첫 화면이 잠깐 어긋나 보인다.`,
  `- **이해**: “내 PC에서는 다크인데 왜 서버는 모르지?”, “\`use client\`를 썼는데도 왜 서버가 관여하지?” 같은 혼란.`,

  `아래에서는 먼저 **하이드레이션**이 왜 Next에서 특히 눈에 띄는지 짚고, 이 레포에서 쓰는 **\`next-themes\`와 루트 \`<html>\`**, **CSS 토큰(\`:root\` / \`.dark\`)**, **\`ThemeProvider\` 옵션** 순으로 코드를 그대로 인용하면서 설명할게요.`,

  `## 하이드레이션이 뭐길래`,

  `React 18+에서 클라이언트에서 트리를 “붙인다”는 건, 서버가 보낸 HTML과 React의 내부 트리를 맞추는 과정이에요. **서버가 만든 DOM**과 **클라이언트 첫 렌더가 기대하는 DOM**이 다르면, React는 경고를 띄우고 가능한 한 클라이언트 쪽으로 덮어씁니다. Next.js App Router는 기본적으로 **요청 시 서버에서 한 번 렌더**를 해 보내기 때문에, 순수 클라이언트만 쓰던 때보다 “**서버 HTML**”이 항상 먼저 존재한다는 점이 체감됩니다.`,

  `문제의 대표적인 원인은 **서버와 브라우저가 동시에 알 수 없는 정보**로 UI를 갈라 놓는 거예요. 예를 들면:`,

  `- 브라우저의 \`window\`, \`document\`, \`localStorage\``,
  `- “지금 사용자 OS가 라이트인지” 같은 **클라이언트에서만 확정되는 테마**`,

  `테마는 특히 \`next-themes\`가 **\`<html class="dark">\` 같은 걸 클라이언트에서 맞춰 주기 때문에**, 서버가 보낸 첫 HTML의 \`<html>\` 속성과 첫 하이드레이션 순간의 속성이 어긋날 수 있어요. 그게 제가 문서에서 \`suppressHydrationWarning\`을 처음 붙이게 된 이유였습니다.`,

  `## 문제 1: \`<html>\`과 \`next-themes\` — 서버는 아직 모르는 \`dark\``,

  `### 무엇이 불편했나`,

  `테마를 붙이고 나서 개발 서버를 돌리면, **\`<html>\` 노드**를 기준으로 한 경고가 나오거나(또는 조용히 mismatch 로그만 남거나), 문서를 읽다 보면 **\`suppressHydrationWarning\`을 \`<html>\`에 달라**는 안내가 나옵니다. “내가 잘못 짠 건가?”보다는, **라이브러리가 클라이언트에서만 \`class\`를 동기화하는 방식**과 맞물린 현상에 가깝습니다.`,

  `### 이 프로젝트의 루트 레이아웃`,

  `실제 \`src/app/layout.tsx\`는 대략 이렇게 되어 있어요. \`<html>\`에 \`suppressHydrationWarning\`이 있고, 폰트 변수는 \`next/font\`로 클래스에 붙습니다.`,

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

  `여기서 \`suppressHydrationWarning\`은 “**이 요소와 그 안의 속성은 서버/클라 첫 렌더가 다를 수 있다**”고 React에 알려 주는 힌트예요. 테마처럼 **저장소·시스템 설정을 읽은 뒤에야 확정되는 값**과 함께 쓸 때 자주 등장합니다. “불일치를 없애는 마법”이 아니라, **알려진 범위의 불일치를 경고에서 제외**하는 쪽에 가깝다고 이해했어요.`,

  `## 문제 2: CSS 변수·\`.dark\`·Tailwind — 색이 테마를 따라가게`,

  `위에서 \`next-themes\`가 \`<html>\`에 \`dark\` 같은 클래스를 맞추면, 그때 바뀌어야 할 **배경·글자색**을 컴포넌트마다 숫자로 쓰지 않고 **변수**로 묶어 두는 단계예요. (클래스를 언제 붙일지는 다음 절의 \`ThemeProvider\`에서 다시 짚습니다.)`,

  `### 무엇이 불편했나`,

  `컴포넌트마다 \`#22264b\`처럼 하드코딩하면 다크/라이트 전환 때 **일부만** 색이 바뀌고 나머지는 그대로인 버그가 나기 쉬워요. 그래서 **토큰**을 \`:root\`와 \`.dark\`에 나눠 두고, UI에서는 \`bg-background\` 같은 이름만 쓰도록 정리했습니다.`,

  `### \`src/shared/styles/index.css\` 발췌`,

  `Tailwind v4에서는 \`@custom-variant dark\`로 \`.dark\` 하위를 \`dark:\`에 묶었고, \`@theme inline\`에서 \`--color-background\` 등을 CSS 변수에 연결합니다.`,

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

  `## 문제 3: \`ThemeProvider\` 옵션과 “왜 이렇게 많이 썼나”`,

  `\`:root\` / \`.dark\`와 \`dark:\`까지 연결해 두었으면, 남는 건 **어떤 기본값·시스템 연동·전환 시 애니메이션**을 쓸지 \`next-themes\`에 넘기는 일이에요.`,

  `### 무엇이 불편했나`,

  `- **시스템 테마**를 존중하고 싶은데, 기본값도 정하고 싶다.`,
  `- 테마를 바꿀 때 **전역 transition**이 걸려 있으면, 배경·글자색이 한 번에 쓸려 가며 **번쩍**하는 느낌이 난다.`,
  `- Tailwind의 \`dark:\` 변형은 보통 **\`.dark\` 클래스가 어딘가 조상에 있을 때** 동작한다 — \`next-themes\`의 \`attribute="class"\`와 짝이 맞아야 한다.`,

  `### \`src/app/providers.tsx\``,

  `\`\`\`tsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { SplashGateProvider } from "@/app/splash-gate-context";
import { createQueryClient } from "@/shared/lib/query-client";
import { CustomCursor } from "@/shared/ui/custom-cursor";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <SplashGateProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CustomCursor />
        </ThemeProvider>
      </SplashGateProvider>
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      ) : null}
    </QueryClientProvider>
  );
}
\`\`\``,

  `- \`attribute="class"\`: \`<html>\`에 \`class="dark"\` 같은 식으로 반영해서, Tailwind v4의 \`dark:\`와 맞춥니다.`,
  `- \`defaultTheme="dark"\` + \`enableSystem\`: 첫 방문·설정 없을 때는 다크 쪽을 기본으로 두되, **시스템**도 후보에 넣었습니다.`,
  `- \`disableTransitionOnChange\`: 테마 전환 순간에 글로벌 CSS 트랜지션이 끼면 화면 전체가 어색하게 번쩍이는 걸 줄이려고 켰어요.`,

  `## 디버깅할 때 도움이 된 체크리스트`,

  `- **콘솔에 hydration 관련 경고가 나오면**: “서버 HTML과 첫 클라 렌더가 같은가?”부터 본다. 특히 \`Date.now()\`, \`Math.random()\`, \`window\`, **저장된 테마**로 분기하는지 본다.`,
  `- **색이 반만 바뀐다**: 하드코딩 색을 줄이고 \`bg-background\` 같은 **토큰**으로 통일한다.`,

  `## 마치며`,

  `Next.js를 처음 쓰면서 **서버가 한 번 그리고, 브라우저가 이어 받는다**는 감각이 생겼어요. 테마처럼 **브라우저에만 있는 정보**를 쓰는 순간, 그 경계에서 버그와 경고가 나온다는 것도 체감으로 이해하게 됐고요. 이 글이 비슷한 증상을 처음 겪는 사람에게 “**내가 이상한 게 아니라, 경계를 어디에 두느냐의 문제**”로 읽히면 좋겠습니다.`,
].join("\n\n");
