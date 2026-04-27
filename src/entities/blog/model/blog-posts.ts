import { APP_ROUTER_STATIC_CONTENT_MARKDOWN } from "./app-router-static-content.content";
import { MAP_CANVAS_COORDINATE_ALIGNMENT_MARKDOWN } from "./map-canvas-coordinate-alignment.content";
import { MAP_EDIT_FABRIC_ZOOM_STABILITY_MARKDOWN } from "./map-edit-fabric-zoom-stability.content";
import { ROBOT_POSITION_MQTT_RENDER_OPTIMIZATION_MARKDOWN } from "./robot-position-mqtt-render-optimization.content";
import { MAIN_LANDING_SCROLL_PERFORMANCE_MARKDOWN } from "./main-landing-scroll-performance.content";
import { MVVM_LLM_TASK_UI_REFACTOR_MARKDOWN } from "./mvvm-llm-task-ui-refactor.content";
import { NEXTJS_FIRST_HYDRATION_THEME_MARKDOWN } from "./nextjs-first-hydration-theme.content";
import { ROBOT_CHAT_NAVIGATION_2LAYER_ARCHITECTURE_MARKDOWN } from "./robot-chat-navigation-2layer-architecture.content";
import { ROBOT_UI_MODAL_GLOBAL_FLOW_MARKDOWN } from "./robot-ui-modal-global-flow.content";
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
    slug: "map-edit-fabric-zoom-stability",
    title: "맵 편집 캔버스: meta·viewport·선택 포인트 기준으로 줌 안정화",
    date: "2026-04-28",
    excerpt:
      "Fabric 맵에서 pos_x/y는 이미지 기준, 그리기·입력은 canvas.meta와 getScenePoint로 통일하고, 줌 시 선택 포인트가 화면에서 밀리지 않도록 setViewportTransform을 보정하며, 훅·path·pan 충돌·DOM 눈금까지 묶은 편집 흐름을 정리했습니다.",
    content: MAP_EDIT_FABRIC_ZOOM_STABILITY_MARKDOWN,
  },
  {
    slug: "robot-position-mqtt-render-optimization",
    title: "실시간 로봇 pose: MQTT 수신·누적·샘플링·RobotPosition·렌더 절감",
    date: "2026-04-27",
    excerpt:
      "MQTT로 위치가 자주 와도 화면에는 최신만 필요하다는 전제로, 메시지는 쌓아 두고 1초마다 마지막만 골라 반영하며 수신 시각으로 중복을 끊고, u/v·x/y를 RobotPosition으로 맞춘 뒤 숫자가 같으면 state·마커를 건너뛰어 그리기 부담을 줄인 내용을 쉬운 말로 정리했습니다.",
    content: ROBOT_POSITION_MQTT_RENDER_OPTIMIZATION_MARKDOWN,
  },
  {
    slug: "map-canvas-coordinate-alignment",
    title: "캔버스 맵 렌더링: world·pixel·canvas 정합과 공통 meta",
    date: "2026-04-26",
    excerpt:
      "맵 Base64·MQTT·URL 배경을 Fabric에 맞출 때 scale·offset·원본 크기를 canvas.meta로 고정하고, world→pixel→canvas 변환을 유틸로 통일해 포인트·경로·로봇·클릭의 좌표를 한 기준으로 맞춘 정리입니다.",
    content: MAP_CANVAS_COORDINATE_ALIGNMENT_MARKDOWN,
  },
  {
    slug: "robot-ui-modal-global-flow",
    title: "온디바이스 로봇 UI: 모달을 비동기 흐름에서 분리한 사례",
    date: "2026-04-25",
    excerpt:
      "API 성공과 전역 상태 갱신이 있어야만 열리던 모달을, ModalProvider·ModalManager·useModal로 루트에 두고 ‘안내’와 ‘데이터’를 나눠 지연·장애에서도 같은 경로로 보이도록 정리한 온디바이스 WebView 사례입니다.",
    content: ROBOT_UI_MODAL_GLOBAL_FLOW_MARKDOWN,
  },
  {
    slug: "robot-chat-navigation-2layer-architecture",
    title: "요구사항 기반 설계: 대화/이동 2-Layer 구조와 이동 UX 통합",
    date: "2026-04-23",
    excerpt:
      "대화(LLM/음성)와 이동(goTo/도착/실패)을 도메인으로 분리하고, selector로 파생 조건을 단일화한 뒤, dispatchMove·브릿지 이벤트·MovingModal을 상위에서만 조합하도록 고정해 운영 변경의 수정 범위를 줄인 구조를 정리했습니다.",
    content: ROBOT_CHAT_NAVIGATION_2LAYER_ARCHITECTURE_MARKDOWN,
  },
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
