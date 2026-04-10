# next-portfolio

Next.js App Router로 만든 **개인 웹사이트**입니다. 
레포 이름은 portfolio이지만, **공부한 것을 적용해 보는 실험장**입니다.
인터랙션·모션·UI 패턴 등, 당시에 익힌 주제를 메인·섹션에 그대로 옮겨 보는 용도로 씁니다.

정리·기록은 **Blog**에 두고, 방문자에게 “프로젝트 나열”보다는 **학습의 흔적**이 드러나게 만드는 쪽을 우선시 합니다.

배포: https://next-portfolio-phi-topaz.vercel.app/

## 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router), React 19 |
| 스타일 | Tailwind CSS 4 |
| UI·모션 | Framer Motion |
| 테마 | next-themes (`class` 전략) |
| 데이터·상태 | TanStack React Query, Zustand |
| 기타 | Resend(연락 폼), Supabase JS(추후 DB·Auth 등 연동용) |

## 폴더 구조 (요약)

루트 기준으로 `src/` 아래를 주로 사용합니다.

```
next-portfolio/
├── public/                    # 정적 파일 (있을 경우) - 이미지 프리로드 
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── src/
    ├── app/                   # Next.js App Router — 라우트·레이아웃·프로바이더
    │   ├── layout.tsx         # 루트 레이아웃, 폰트·글로벌 CSS
    │   ├── page.tsx           # `/` — 풀스크린 스플래시만
    │   ├── home/page.tsx      # `/home` — 메인 포트폴리오(랜딩 섹션)
    │   ├── providers.tsx      # QueryClient, ThemeProvider 등
    │   ├── opengraph-image.tsx  # OG ImageResponse (`public/og.png`)
    │   ├── twitter-image.tsx    # opengraph-image 재노출
    │   ├── app-chrome.tsx     # 헤더/푸터·레이아웃 셸 (`/` 스플래시일 때 크롬 숨김)
    │   ├── icon.png
    │   ├── api/contact/route.ts   # 연락 폼 POST (Resend, CORS)
    │   ├── blog/
    │   │   ├── page.tsx           # `/blog` — 글 목록
    │   │   └── [slug]/page.tsx    # `/blog/[slug]` — 글 상세 (SSG)
    │   └── projects/
    │       └── [id]/
    │           ├── page.tsx       # 프로젝트 상세 (SSG)
    │           └── not-found.tsx
    │
    ├── entities/              # 도메인 데이터·상수 (UI 거의 없음)
    │   ├── blog/model/        # BLOG_POSTS, 글 메타·본문
    │   ├── contact/model/
    │   ├── navigation/model/  # NAV_ITEMS (헤더 앵커·링크)
    │   ├── project/model/     # PROJECTS 등
    │   └── skill/model/
    │
    ├── features/              # 단일 사용자 기능 단위
    │   ├── theme-toggle/      # 다크/라이트 전환 (next/dynamic으로 분할 가능)
    │   └── contact-form/      # 연락 폼 상태·제출 (`useContactForm`)
    │
    ├── shared/                # 앱 전역 재사용
    │   ├── api/supabase/      # Supabase 브라우저 클라이언트 (미사용 시에도 추후 대비)
    │   ├── config/            # 공개 env (`NEXT_PUBLIC_*` 등)
    │   ├── assets/            # 이미지, 아이콘(SVG)
    │   ├── lib/               # motion 변형, query-client, theme 훅
    │   ├── model/             # 전역 UI 스토어 등
    │   ├── styles/index.css   # 디자인 토큰·폰트·글로벌 스타일
    │   └── ui/                # ImageWithFallback, 섹션 제목, 커서 등 공용 UI
    │
    └── widgets/               # 페이지를 구성하는 큰 블록(합성 UI)
        ├── portfolio-page/    # 메인 랜딩 본문
        │   └── ui/
        │       ├── portfolio-page.tsx
        │       └── sections/  # hero, about, skills, blog, projects, contact, ticker 등
        ├── blog-page/         # `/blog`, `/blog/[slug]` 본문 UI
        ├── site-header/
        ├── site-footer/
        └── splash-screen/     # 진입 스플래시 + 캔버스 파티클(lib)
```

## 아키텍처

[Feature-Sliced Design](https://feature-sliced.design/)에 가깝게 **레이어를 나눈 구조**입니다. 의존 방향은 상위 레이어가 하위만 참조하는 형태를 지향합니다.

| 레이어 | 역할 |
|--------|------|
| **app** | 라우팅, `layout`/`page`, 전역 프로바이더, 메타·경계(`opengraph-image` 등). URL과 1:1인 진입점. |
| **widgets** | 여러 섹션을 묶은 **페이지 단위 UI** (예: `PortfolioPage`, `SplashScreen`, `SiteHeader`). |
| **features** | 재사용 가능한 **기능 한 덩어리** (예: 테마 토글, 연락 폼). |
| **entities** | 프로젝트·스킬·네비 등 **도메인 데이터와 타입**. |
| **shared** | UI 키트, 유틸, 설정, 에셋 등 **도메인에 묶이지 않는 공통 코드**. |

### 데이터 흐름 (개략)

- **정적 콘텐츠**: `entities/*/model`의 상수·데이터를 `widgets`·`app`의 페이지가 읽어 렌더링.
- **블로그**: `entities/blog/model/blog-posts.ts`의 `BLOG_POSTS`를 메인의 `BlogSection`(프리뷰)과 `app/blog` 목록·상세가 공유한다. 글 추가·수정은 데이터 파일을 편집하면 된다.
- **내비게이션**: `entities/navigation/model/nav-items.ts` — 헤더는 `next/link`로 `/home#…` 형태에 두어 메인(`/home`)의 해당 섹션으로 이동한다(예: `#blog` → 블로그 프리뷰 섹션). 글 목록·상세는 `/blog`, `/blog/[slug]`.
- **연락 폼**: `features/contact-form`의 `useContactForm` → `POST /api/contact`(Resend). 서버 env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` 등(`.env.example` 참고). Supabase는 이 흐름에 아직 연결하지 않았고, `shared/api/supabase`는 추후 DB·Auth 등을 붙일 때 쓸 수 있게 둔 자리다.
- **테마**: `next-themes` + `shared/lib/theme/use-resolved-theme` — HTML `class="dark"`와 연동.
- **스플래시**: `/`는 `SplashScreen`만 두고, 진입 버튼으로 `router.push('/home')` — 메인 포트폴리오는 `/home`에서 렌더한다.

### 기술적 메모

- **이미지**: `shared/ui/image-with-fallback`에서 `next/image` 사용; 외부 도메인은 `next.config.ts`의 `images.remotePatterns`에 등록.
- **OG·Twitter 카드 이미지**: `opengraph-image.tsx`에서 `next/og`의 `ImageResponse`로 `public/og.png` 기반 OG를 만들고, `twitter-image.tsx`는 동일 설정을 재노출한다.
- **코드 분할**: `SiteHeader`의 `ThemeToggle`은 `next/dynamic` + `ssr: false`로 지연 로딩(클라이언트 전용·번들 분리).
- **API Route**: `app/api/contact/route.ts`는 `runtime: nodejs`(Resend), CORS 허용 출처는 코드·`CORS_ALLOWED_ORIGINS` env로 조정.

## 스크립트

```bash
yarn dev      # 개발 서버
yarn build    # 프로덕션 빌드
yarn start    # 프로덕션 서버
yarn lint     # ESLint
```
