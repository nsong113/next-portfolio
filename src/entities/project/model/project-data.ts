import homePage from "@/shared/assets/projects/homePage.webp";
import taskUI from "@/shared/assets/projects/taskUI.webp";
import temi_general from "@/shared/assets/projects/temi_general.webp";
import temi from "@/shared/assets/projects/temi.webp";
import rms from "@/shared/assets/projects/rms.webp";
import rmsMap from "@/shared/assets/projects/rmsMap.webp";
import anz1 from "@/shared/assets/projects/anz1.webp";
import nextDark from "@/shared/assets/projects/nextDart.webp";
import nextLight from "@/shared/assets/projects/nextLight.webp";
import musinsa from "@/shared/assets/projects/musinsa.png";

/** 카드·상세 공통 필드는 `portfolio`만. 카드 썸네일 = `portfolio.image[0]`. */
export const PROJECTS = [
  {
    id: 1,
    tags: ["유지보수", "구조", "성능 최적화", "SEO 정합성"],
    liveUrl: "https://maum.ai/",
    codeUrl: "",
    portfolio: {
      title: "메인 홈페이지 고도화 및 리팩토링",
      subTitle: "유지보수, 구조, 성능 최적화, SEO 정합성",
      description:
        "메인 홈페이지 고도화와 리팩토링을 수행하며 구조 개선·성능 최적화·SEO 정합성까지 개선했습니다.",
      technologies: [
        "TypeScript",
        "React",
        "Vite",
        "Tailwind CSS",
        "Recoil",
        "Socket.IO",
      ],
      period: "2024.02 ~ 현재",
      contribution: 100,
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      image: [homePage, taskUI],
      problems: [
        {
          id: 1,
          title: "메인 섹션 스크롤 인터랙션 개선 및 성능 최적화",
          problem:
            "스크롤 구간에서 프레임 드랍이 발생하고, 초기 로딩 부담이 큼.",
          solution:
            "- 렌더링 분석을 바탕으로 애니메이션 처리 구조를 단순화해 스크롤 구간의 프레임 드랍을 완화\n- requestAnimationFrame을 활용해 스크롤 기반 애니메이션의 실행 타이밍을 최적화하여 렌더링 부담을 줄임\n- Lazy Loading을 적용해 이미지 및 리소스의 초기 로딩 시점을 지연시키고 초기 로딩 부담을 낮춤",
          result:
            "스크롤 인터랙션 구간의 프레임 드랍 완화 및 초기 로딩 부담 감소에 기여.",
        },
        {
          id: 2,
          title: "MVVM 적용을 통한 컴포넌트 구조 리팩토링",
          problem:
            "상태·API·UI 로직이 혼재된 컴포넌트로 인해 변경 영향 범위가 커지고 유지보수가 어려움.",
          solution:
            "- 복잡도가 높았던 특정 기능 영역에 MVVM 패턴을 적용하여 상태, API, UI 로직이 혼재된 컴포넌트를 역할별로 분리\n- React 컴포넌트 구조를 재설계하여 공통 입력 및 결과 영역을 재사용 가능한 컴포넌트로 추상화하고 중복 코드를 제거\n- 상태 관리 구조를 정리해 화면 간 데이터 흐름을 명확히 하고 기능 변경 시 수정 범위를 줄임\n- 공통 컴포넌트화와 구조 정비를 중심으로 92개 파일 규모의 리팩토링 수행",
          result:
            "상태·API·UI 책임이 분리되고 공통 컴포넌트 기반으로 중복이 줄어, 변경 시 영향 범위가 축소됨.",
        },
        {
          id: 3,
          title: "메타데이터 정합성 개선 및 검색 스니펫 최적화",
          problem: "네이버 검색 스니펫이 반영되지 않는 이슈가 발생함.",
          solution:
            "- meta description, Open Graph, JSON-LD 구조화 데이터를 기준으로 페이지 메타데이터를 일관된 형태로 정비\n- SPA 환경에서도 검색엔진이 핵심 내용을 수집할 수 있도록 초기 HTML 및 noscript 영역에 크롤링 가능한 텍스트를 보강\n- 네이버 검색 스니펫 미반영 이슈 대응을 위해 메타 태그뿐 아니라 구조화 데이터와 본문 노출 구조를 함께 점검하고 서치어드바이저 수집 요청을 병행\n- 검색엔진별 스니펫 생성 방식 차이를 고려해 메타데이터와 크롤링 가능한 콘텐츠 관리 기준을 정비",
          result:
            "Lighthouse SEO 100점 달성 및 네이버 검색 CTR 2.3% → 2.7%, 검색 유입 클릭 수 16% 증가에 기여.",
        },
      ],
    },
  },
  {
    id: 2,
    tags: ["구조", "Voice/Robot 분리", "온디바이스 UI 안정성"],
    liveUrl: "",
    codeUrl: "",
    portfolio: {
      title: "안내용 로봇 UI 개발 및 고도화",
      subTitle: "구조 설계, Voice/Robot 분리, 온디바이스 UI 안정성",
      description:
        "전시·매장·로비 등 안내 로봇 WebView UI를 기획 단계부터 참여해 요구사항 정리와 Voice/Robot 2-Layer 구조·상태 기반 UI·공통 메시지 중앙화를 설계·구현했습니다. ModalManager·React Context로 모달을 비동기와 분리해 온디바이스·지연·장애 상황에서도 안내 흐름이 끊기지 않도록 다듬었습니다.",
      technologies: [
        "TypeScript",
        "React",
        "Vite",
        "Recoil",
        "Socket.IO",
        "Tailwind CSS",
        "Framer Motion",
      ],
      period: "2025.07 ~ 2026.02",
      contribution: 100,
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      image: [temi_general, temi],
      problems: [
        {
          id: 1,
          title: "서비스 요구사항 기반 구조 설계",
          problem:
            "대화(Voice)와 이동(Robot) 흐름이 한 덩어리로 설계되기 쉽고, 단계·모달·공통 메시지 UX를 일관되게 제어하기 어려움.",
          solution:
            "- 대화(Voice)와 이동(Robot) 도메인을 상태와 흐름 단위로 분리해 2-Layer 구조로 설계하고, 각 도메인을 독립적으로 다루되 필요한 지점에서 조합할 수 있도록 구현\n- 상태 기반 UI 구조를 활용하여 단계별 인터랙션, 모달, 오버레이가 현재 상태에 따라 일관되게 표시되도록 구현\n- 공통 메시지를 중앙에서 관리하는 구조를 설계해 화면 전반의 UX 일관성을 높이고, 문구 및 플로우 수정이 쉬운 확장 기반을 마련해 운영 변경에 유연하게 대응할 수 있도록 개선",
          result:
            "Voice/Robot 도메인 분리와 상태 기반 UI, 공통 메시지 중앙 관리로 확장·운영 변경에 대응하기 쉬운 구조를 마련함.",
        },
        {
          id: 2,
          title: "온디바이스 로봇 환경 UI 안정성 개선",
          problem:
            "비동기 작업 완료에 모달 제어가 종속되어 네트워크 지연·장애 시 안내 UI가 누락되고 사용자 흐름이 끊기는 경우가 발생함.",
          solution:
            "- 비동기 작업 완료 이벤트에 종속돼 있던 모달 제어 구조를 ModalManager와 React Context 기반의 전역 상태 구조로 재설계\n- 안내/진행/에러 모달을 비동기 작업과 분리하여 사용자 흐름에 따라 필요한 시점에 독립적으로 노출될 수 있도록 구현\n- 모달 호출 방식과 표시 로직을 중앙화해 장애·지연 상황에서도 안내 UI가 일관되게 노출되도록 개선하고, 예외 상황에서도 사용자 흐름이 끊기지 않도록 안정성을 높임",
          result:
            "비동기 이벤트와 무관하게 안내·진행·에러 모달이 노출되어 온디바이스·온프레미스 환경에서도 UI 안정성이 향상됨.",
        },
      ],
    },
  },
  {
    id: 3,
    tags: ["canvas", "시각화", "인터랙션", "편집 UX"],
    liveUrl: "",
    codeUrl: "",
    portfolio: {
      title: "인터랙티브 맵 기반 시각화 UI 개발",
      subTitle: "캔버스 렌더링, 맵 편집 인터랙션, 구조 개선",
      description:
        "이미지 기반 맵 위에 좌표와 인터랙션을 직접 렌더링하고, 맵에서 확대·축소/팬/드래그/경로 편집이 자연스럽게 동작하는 편집 UX를 구현했습니다. 캔버스 생명주기·기능 로직을 훅 단위로 분리해 복잡도를 낮추고 확장·유지보수 기반을 마련했습니다.",
      technologies: [
        "TypeScript",
        "React",
        "Vite",
        "Fabric.js",
        "Zustand",
        "Tanstack Query",
        "MQTT",
        "WebRTC",
      ],
      period: "2025.12 - 현재",
      contribution: 100,
      video: "",
      image: [rms, rmsMap],
      problems: [
        {
          id: 1,
          title: "커스텀 캔버스 기반 맵 렌더링 구조 설계",
          problem:
            "지도 SDK에 의존하지 않으면서도 이미지 기반 맵 위에 좌표와 인터랙션을 정확하게 렌더링하고, 실시간 위치 시각화에서 불필요한 중복 렌더를 줄일 필요가 있었음.",
          solution:
            "- 지도 SDK에 의존하지 않고, 이미지 기반 맵 위에 좌표와 인터랙션을 직접 렌더링하는 구조로 설계\n- 좌표 변환 유틸을 분리해 위치 계산과 인터랙션 흐름을 정리하고, 객체 위치를 정확하게 표시할 수 있도록 구현\n- 실시간 데이터 수신 처리와 업데이트 제어 로직을 적용해 중복 메시지와 동일 좌표 렌더를 스킵하고, 실시간 위치 시각화 과정의 불필요한 렌더를 줄임",
          result:
            "좌표계/인터랙션 흐름이 정리된 렌더링 구조를 확보하고, 실시간 업데이트 시 중복 렌더를 줄여 성능을 개선함.",
        },
        {
          id: 2,
          title: "맵 기반 편집 인터랙션 구현",
          problem:
            "맵에서 줌/팬/드래그/경로 편집이 자연스럽게 동작하면서도, 포인트 생성·선택·이동·연결선 표시가 상태와 동기화되고 확대·축소 중 선택 기준이 흔들리지 않도록 보정이 필요했음.",
          solution:
            "- Fabric.js 인터랙션 API와 커스텀 훅을 활용해 줌, 팬, 드래그, 경로 편집 기능을 맵 기반 편집 UI로 구현\n- 포인트 렌더링과 이벤트 처리 훅을 분리해 생성, 선택, 이동, 연결선 표시 기능이 상태와 동기화되도록 설계\n- 확대·축소 중에도 선택 객체 기준이 흔들리지 않도록 보정 로직을 적용해, 맵에서도 편집 흐름이 끊기지 않도록 UX를 개선",
          result:
            "확대·축소/이동 상황에서도 편집 흐름이 안정적으로 유지되어, 맵 기반 편집 UX의 사용성이 개선됨.",
        },
        {
          id: 3,
          title: "인터랙티브 캔버스 구조 개선",
          problem:
            "캔버스 생명주기와 기능 로직이 한 컴포넌트에 응집되며 복잡도가 상승했고, 이미지 로딩/배경 맵 기준이 흔들리면 좌표계와 정렬이 깨질 수 있었음.",
          solution:
            "- 캔버스 생명주기와 기능 로직을 훅 단위로 분리해 인터랙티브 맵 컴포넌트의 복잡도를 낮춤\n- 이미지 로딩과 배경 맵의 크기·위치 기준을 일관되게 관리해 렌더링 정렬과 좌표계 기준이 유지되도록 구현\n- 기능 로직을 구조적으로 분리해 맵 편집 기능 확장과 유지보수가 용이한 기반을 마련",
          result:
            "기능 확장/유지보수성이 개선되고, 배경 맵 기준이 일관되게 유지되어 좌표계와 정렬이 안정화됨.",
        },
      ],
    },
  },
  {
    id: 4,
    tags: ["마케팅", "다국어", "전환", "폼"],
    liveUrl: "",
    codeUrl: "",
    portfolio: {
      title: "글로벌 마케팅 웹사이트 프론트엔드 개발",
      subTitle: "다국어 UI, 전환 플로우, 인터랙티브 UX",
      description:
        "다국어 지원과 문의 전환 흐름을 고려해 마케팅 웹사이트를 설계·구현했습니다. i18next로 언어 전환을 구성하고, 메인 CTA 중심의 사용자 흐름과 캐러셀/문의 폼 등 인터랙티브 UI를 안정적으로 제공했습니다.",
      technologies: [
        "TypeScript",
        "React",
        "Vite",
        "Tailwind CSS",
        "i18next",
        "Swiper",
        "React Hook Form",
        "Yup",
      ],
      period: "2024.02 - 2024.06",
      contribution: 100,
      video: "",
      image: [anz1],
      problems: [
        {
          id: 1,
          title: "글로벌 대응을 고려한 다국어 UI 구조 구현",
          problem:
            "언어 전환 시 콘텐츠와 UI가 페이지 전반에서 일관되게 반영되도록 구조화가 필요했음.",
          solution:
            "- i18next를 활용해 영어·독일어 전환 기능을 구현하고, 페이지 언어 설정에 따라 콘텐츠와 UI가 일관되게 반영되도록 설계",
          result:
            "언어 전환이 자연스럽게 동작하고, 페이지 전반의 텍스트/레이아웃 일관성이 유지됨.",
        },
        {
          id: 2,
          title: "마케팅 목적에 맞는 사용자 흐름 기반 UI 구조 설계",
          problem:
            "마케팅 목적(문의 전환)에 맞게 사용자가 자연스럽게 다음 단계로 이동하는 흐름 설계가 필요했음.",
          solution:
            "- 메인 CTA를 중심으로 서비스 소개 → 상세 정보 → 문의로 이어지는 사용자 흐름을 설계",
          result:
            "CTA 중심의 흐름이 정리되어 사용자 여정이 명확해지고 문의 단계로의 이동이 자연스러워짐.",
        },
        {
          id: 3,
          title: "인터랙티브 UI 및 사용자 경험 개선",
          problem:
            "콘텐츠 정렬/가독성, 문의 폼 입력/제출 안정성, 반응형 대응까지 함께 개선이 필요했음.",
          solution:
            "- Swiper 기반 캐러셀과 카드 높이 동기화 로직을 구현해 콘텐츠 정렬과 가독성을 개선\n- React Hook Form과 Yup을 활용한 문의 폼 검증 및 API 연동으로 사용자 입력과 제출 흐름을 안정적으로 처리\n- 반응형 레이아웃을 정비해 다양한 디바이스 환경에서 일관된 UI를 제공",
          result:
            "캐러셀 가독성/정렬이 개선되고, 폼 제출 흐름이 안정화되며, 다양한 디바이스에서 일관된 UI를 제공함.",
        },
      ],
    },
  },
  {
    id: 5,
    tags: ["기능", "테스트", "CI", "Playwright"],
    liveUrl: "https://playwright-reports-eight.vercel.app/",
    codeUrl: "https://github.com/nsong113/musinsa",
    portfolio: {
      title: "무신사 Playwright 기능 Test",
      subTitle: "테스트 설계, 세션 재사용, CI 관측성",
      description:
        "무신사 웹사이트를 대상으로 Playwright 기반 기능 테스트 환경을 구축한 개인 프로젝트입니다. 유지보수 가능한 테스트 구조(Page Object/컴포넌트 객체 분리)와 인증 세션 재사용(storageState), CI(리포트/아티팩트/실패 분석)까지 전체 실행 체계를 설계·구현했습니다.",
      contentBoxText: `
[테스트 케이스 문서]
요구사항 기반으로 정의한 검색 플로우 테스트 케이스 정리
https://docs.google.com/spreadsheets/d/1MV3zCdSLq4Eb7XZCN4ltTse4kCpJpTJE1423JpVSCIM/edit?gid=0#gid=0

[로컬 실행 리포트 예시]
로컬 환경에서 실행한 Playwright HTML Report
https://playwright-reports-eight.vercel.app/`,
      technologies: ["TypeScript", "Playwright", "GitHub Actions"],
      period: "2026.01 - 2026.01",
      contribution: 100,
      video: "",
      image: [musinsa],
      problems: [
        {
          id: 1,
          title: "유지보수 가능한 테스트 설계",
          problem:
            "UI 변경에 취약한 기능 테스트를 최소화하고, 회귀 테스트로서 의미 있는 핵심 플로우를 일관된 규칙으로 유지할 구조가 필요했음.",
          solution:
            "- Page Object와 공통 컴포넌트 객체를 분리해 UI 변경에 상대적으로 강한 구조로 설계\n- 검색 핵심 플로우를 회귀 테스트 시나리오로 정의하고, 요구사항 ID 기반 네이밍과 Arrange–Act–Assert 패턴 적용",
          result:
            "변경에 강한 테스트 구조와 명명/작성 규칙이 정리되어 시나리오 추가·유지보수가 쉬워짐.",
        },
        {
          id: 2,
          title: "인증 세션 재사용과 실행 분리",
          problem:
            "반복 로그인 비용이 크고, 인증 단계가 테스트 시나리오와 섞이면 실패 원인 분리가 어려워 실행 구조가 복잡해질 수 있었음.",
          solution:
            "- setup 프로젝트에서 로그인 후 storageState를 저장·재사용하도록 구성해 반복 로그인 비용 절감\n- 인증 절차를 별도 실행 흐름으로 분리해 테스트 시나리오와 세션 관리 책임 분리",
          result:
            "테스트 실행 시간이 단축되고, 인증/시나리오 실패 원인이 분리되어 디버깅이 쉬워짐.",
        },
        {
          id: 3,
          title: "CI 관측성과 실서비스 한계 인식",
          problem:
            "CI 환경에서 실패 원인 추적이 어려울 수 있고, 실서비스 자동화는 환경 차이(리다이렉트 등)로 로컬과 동일 조건 재현이 어렵다는 리스크가 있었음.",
          solution:
            "- GitHub Actions를 통해 push 및 pull request 시 테스트가 자동 실행되도록 구성하고, HTML Report를 아티팩트로 업로드\n- 실패 시 screenshot·video, retry 시 trace를 수집하도록 설정해 테스트 실패 원인 추적 가능하도록 설계\n- locale, time zone, geolocation, Accept-Language 설정으로 한국 서비스 환경 재현을 시도했으나, CI 환경에서는 글로벌 도메인 리다이렉트 이슈로 로컬과 동일한 조건의 실서비스 자동화에 한계가 있음을 확인",
          result:
            "실패 분석에 필요한 증거(리포트/비디오/트레이스)가 남도록 CI 관측성을 확보했고, 실서비스 자동화의 환경 제약을 명확히 인지함.",
        },
        {
          id: 4,
          title: "프로젝트 컨텐츠",
          problem:
            "프로젝트의 코드·테스트 케이스 문서·실행 리포트를 한곳에서 바로 확인할 수 있는 컨텐츠 구성이 필요했음.",
          solution:
            "[소스코드]\nhttps://github.com/nsong113/musinsa\n\n[테스트 케이스 문서]\n요구사항 기반으로 정의한 검색 플로우 테스트 케이스 정리\nhttps://docs.google.com/spreadsheets/d/1MV3zCdSLq4Eb7XZCN4ltTse4kCpJpTJE1423JpVSCIM/edit?gid=0#gid=0\n\n[로컬 실행 리포트 예시]\n로컬 환경에서 실행한 Playwright HTML Report\nhttps://playwright-reports-eight.vercel.app/",
          result:
            "코드, 테스트 설계 문서, 실행 리포트를 상세 페이지에서 빠르게 확인할 수 있게 되었음.",
        },
        {
          id: 5,
          kind: "retro",
          title: "회고",
          learnings:
            "- 기능 테스트는 인증 상태, 실행 환경, 실패 분석까지 포함한 전체 테스트 구조 설계가 중요하다는 점을 배움\n- Playwright의 storageState, trace, HTML Report, CI 연동을 적용하며 자동화 테스트의 실무적인 구성 방식을 익힘",
          improvements:
            "- 글로벌 도메인 리다이렉트 이슈로 CI에서 로컬과 동일한 조건의 실서비스 테스트 재현에 한계가 있었고, 향후에는 환경 제어가 가능한 대체 전략도 함께 검토할 필요가 있음을 확인함",
        },
      ],
    },
  },
  {
    id: 6,
    tags: ["Next.js", "SSG", "다크모드", "성능", "구조"],
    liveUrl: "https://next-portfolio-phi-topaz.vercel.app/",
    codeUrl: "https://github.com/nsong113/next-portfolio",
    portfolio: {
      title: "Next Portfolio",
      subTitle: "FSD 구조, 성능 최적화, App Router 정적 콘텐츠",
      description:
        "Next.js App Router 기반으로 메인 인터랙션과 정적 콘텐츠(블로그/프로젝트 상세)를 서비스 형태로 구성했습니다. 구조(FSD), 성능(LCP 후보 프리로드/이미지 최적화), 테마(next-themes/하이드레이션 대응), SSG(generateStaticParams/Metadata)까지 함께 설계·구현했습니다.",
      technologies: [
        "TypeScript",
        "Next.js (App Router)",
        "Tailwind CSS",
        "Framer Motion",
        "next-themes",
      ],
      period: "2026. 04 - 2026. 04",
      contribution: 100,
      video: "",
      image: [nextDark, nextLight],
      problems: [
        {
          id: 1,
          title: "유지보수성과 사용자 경험을 고려한 프론트엔드 구조 설계",
          problem:
            "인터랙티브 메인 페이지와 정적 콘텐츠(블로그/프로젝트 상세)를 함께 확장해나가기 위해 관심사 분리와 UX 강화를 동시에 만족하는 구조가 필요했음.",
          solution:
            "- FSD(app / widgets / features / entities / shared) 구조로 관심사를 분리해 기능 확장 시 영향 범위를 줄일 수 있도록 설계\n- Framer Motion과 Canvas 기반 시뮬레이션, 랜딩 화면을 적용해 메인 페이지 인터랙션과 초기 진입 경험을 강화",
          result:
            "기능 확장 시 영향 범위를 줄이는 구조를 확보하고, 인터랙티브한 메인 경험으로 진입 UX를 강화함.",
        },
        {
          id: 2,
          title: "성능 최적화 및 클라이언트 전용 UI 분리",
          problem:
            "초기 렌더링(LCP)과 테마(다크/라이트) 전환, 하이드레이션 이슈를 함께 고려하면서도 초기 로딩 부담을 낮출 필요가 있었음.",
          solution:
            '- 메인 배경 이미지(LCP 후보)를 rel="preload"로 우선 로드하고 WebP 포맷으로 전환해 초기 렌더링 성능을 최적화\n- media와 prefers-color-scheme를 조합해 디바이스·테마별 필요 이미지 한 장만 프리로드되도록 분기 처리\n- dynamic import와 next/dynamic의 ssr: false 옵션을 활용해 클라이언트 전용 UI를 분리하고 하이드레이션 이슈를 방지하며 초기 로딩 부담을 줄임\n- next-themes를 적용해 라이트·다크 모드를 구현',
          result:
            "초기 로딩 부담을 낮추고, 클라이언트 전용 UI 분리로 하이드레이션 관련 리스크를 줄이며 테마 UX를 안정화함.",
        },
        {
          id: 3,
          title: "Next.js App Router 기반 정적 콘텐츠 구조 설계",
          problem:
            "블로그/프로젝트 상세를 정적 경로로 생성하면서도 메타데이터를 일관되게 관리할 구조가 필요했음.",
          solution:
            "- generateStaticParams, generateMetadata를 적용해 블로그·프로젝트 상세 페이지의 정적 경로와 메타데이터 생성 구조를 설계",
          result:
            "정적 콘텐츠 페이지의 경로/메타데이터 생성 흐름이 정리되어 관리가 쉬워짐.",
        },
        {
          id: 4,
          kind: "retro",
          title: "회고",
          learnings:
            "- Next.js App Router와 SSG를 적용하며 정적 콘텐츠 기반 페이지 구조와 메타데이터 생성 흐름을 이해함\n- 인터랙션, 성능, 구조를 함께 고려한 설계의 중요성을 체감했고, 다크 모드 구현 과정에서 하이드레이션 이슈를 고려한 UI 분리 전략을 경험함",
          improvements:
            "- 테스트 코드와 에러 핸들링 구조를 추가해 안정성을 보완할 계획임",
        },
      ],
    },
  },
] as const;
