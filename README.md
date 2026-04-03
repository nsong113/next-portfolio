# next-portfolio

프론트엔드 포트폴리오 사이트 (Next.js App Router).

배포: https://next-portfolio-phi-topaz.vercel.app/

## 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router), React 19 |
| 스타일 | Tailwind CSS 4 |
| UI·모션 | Framer Motion |
| 테마 | next-themes (`class` 전략) |
| 데이터·상태 | TanStack React Query, Zustand |
| 기타 | Pretendard, Supabase 클라이언트(준비) |

## 폴더 구조 (요약)

루트 기준으로 `src/` 아래를 주로 사용합니다.

```
next-portfolio/
├── public/                    # 정적 파일 (있을 경우)
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── src/
    ├── app/                   # Next.js App Router — 라우트·레이아웃·프로바이더
    │   ├── layout.tsx         # 루트 레이아웃, 폰트·글로벌 CSS
    │   ├── page.tsx           # `/` — 스플래시 게이트 후 포트폴리오
    │   ├── providers.tsx      # QueryClient, SplashGate, ThemeProvider 등
    │   ├── app-chrome.tsx     # 헤더/푸터·레이아웃 셸 (스플래시 시 크롬 숨김)
    │   ├── splash-gate-context.tsx
    │   ├── icon.png
    │   └── projects/
    │       └── [id]/
    │           ├── page.tsx   # 프로젝트 상세 (SSG)
    │           └── not-found.tsx
    │
    ├── entities/              # 도메인 데이터·상수 (UI 거의 없음)
    │   ├── contact/model/
    │   ├── navigation/model/
    │   ├── project/model/     # PROJECTS 등
    │   └── skill/model/
    │
    ├── features/              # 단일 사용자 기능 단위
    │   └── theme-toggle/      # 다크/라이트 전환 (next/dynamic으로 분할 가능)
    │
    ├── shared/                # 앱 전역 재사용
    │   ├── api/supabase/      # Supabase 클라이언트
    │   ├── assets/            # 이미지, 아이콘(SVG)
    │   ├── config/            # env 등
    │   ├── lib/               # motion 변형, query-client, theme 훅
    │   ├── model/             # 전역 UI 스토어 등
    │   ├── styles/index.css   # 디자인 토큰·폰트·글로벌 스타일
    │   └── ui/                # ImageWithFallback, 섹션 제목, 커서 등 공용 UI
    │
    └── widgets/               # 페이지를 구성하는 큰 블록(합성 UI)
        ├── portfolio-page/    # 메인 랜딩 본문
        │   └── ui/
        │       ├── portfolio-page.tsx
        │       └── sections/  # hero, skills, projects, contact, ticker 등
        ├── site-header/
        ├── site-footer/
        └── splash-screen/     # 진입 스플래시 + 캔버스 파티클(lib)
```

## 아키텍처

[Feature-Sliced Design](https://feature-sliced.design/)에 가깝게 **레이어를 나눈 구조**입니다. 의존 방향은 상위 레이어가 하위만 참조하는 형태를 지향합니다.

| 레이어 | 역할 |
|--------|------|
| **app** | 라우팅, `layout`/`page`, 전역 프로바이더, 메타·경계. URL과 1:1인 진입점. |
| **widgets** | 여러 섹션을 묶은 **페이지 단위 UI** (예: `PortfolioPage`, `SplashScreen`, `SiteHeader`). |
| **features** | 재사용 가능한 **기능 한 덩어리** (예: 테마 토글). |
| **entities** | 프로젝트·스킬·네비 등 **도메인 데이터와 타입**. |
| **shared** | UI 키트, 유틸, 설정, 에셋 등 **도메인에 묶이지 않는 공통 코드**. |

### 데이터 흐름 (개략)

- **정적 콘텐츠**: `entities/*/model`의 상수·데이터를 `widgets`·`app`의 페이지가 읽어 렌더링.
- **테마**: `next-themes` + `shared/lib/theme/use-resolved-theme` — HTML `class="dark"`와 연동.
- **스플래시**: `SplashGateProvider`로 “한 번 닫으면 본문” 상태를 유지하고, 첫 화면은 `SplashScreen`만 표시.

### 기술적 메모

- **이미지**: `shared/ui/image-with-fallback`에서 `next/image` 사용; 외부 도메인은 `next.config.ts`의 `images.remotePatterns`에 등록.
- **코드 분할**: `SiteHeader`의 `ThemeToggle`은 `next/dynamic` + `ssr: false`로 지연 로딩(클라이언트 전용·번들 분리).

## 스크립트

```bash
yarn dev      # 개발 서버
yarn build    # 프로덕션 빌드
yarn start    # 프로덕션 서버
yarn lint     # ESLint
```
