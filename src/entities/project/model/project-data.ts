export const PROJECTS = [
  {
    id: 1,
    title: "마음AI 브랜드 웹사이트 고도화 및 리팩토링",
    description:
      "브랜드 웹 프론트엔드 운영, 스크롤 기반 인터랙션·애니메이션, 성능·SEO·구조 개선까지 담당했습니다.",
    technologies: [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Recoil",
      "Zustand",
      "Framer Motion",
    ],
    image:
      "https://images.unsplash.com/photo-1592323401640-9c24ed330baf?w=1080&q=80",
    liveUrl: "#",
    codeUrl: "#",
    tags: ["ai", "유지보수"],
    portfolio: {
      title: "마음AI | Front-End Developer",
      subTitle: "웹사이트 고도화 개발 및 리팩토링",
      description:
        "기업용 AI 플랫폼·솔루션을 다루는 마음AI에서 브랜드 웹사이트 프론트엔드 개발·운영, 스크롤 인터랙티브 UI·애니메이션, 상태 관리·공통 컴포넌트 리팩토링을 수행했습니다. (경력 약 2년 2개월 · 2024.02 ~ 현재)",
      technologies: [
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Recoil",
        "Zustand",
        "Socket.IO",
        "Framer Motion",
        "MUI",
      ],
      roles: ["Front-End Developer"],
      role: "Front-End Developer",
      period: "2024.02 ~ 현재",
      contribution: 100,
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      image: [
        "https://images.unsplash.com/photo-1592323401640-9c24ed330baf?w=1080&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1080&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&q=80",
      ],
      problems: [
        {
          id: 1,
          problem:
            "메인 히어로에서 다수 이미지와 스크롤 인터랙션이 동시에 동작하며, 저사양 환경에서 스크롤 시 프레임 드랍·렌더링 지연이 발생함.",
          solution:
            "스크롤 이벤트 기반 애니메이션을 requestAnimationFrame 기반으로 전환, Lazy Loading으로 초기 부담 완화, 렌더링 병목 구간 분석 후 초기 로딩·애니메이션 연산 구조 단순화.",
          result:
            "스크롤 인터랙션 구간의 프레임 드랍 완화 및 렌더링 성능 개선. (FLC·LCP 등 수치는 개선 작업 후 보강 예정)",
        },
        {
          id: 2,
          problem:
            "템플릿 기반 UI에서 유사 화면이 20개 이상 개별 컴포넌트로 복제·변형되어 관리되고, 화면별 상태·이벤트 처리가 달라 수정 범위 예측이 어렵고 버그 가능성이 큼.",
          solution:
            "상태·API·UI가 섞인 컴포넌트를 MVVM으로 재구성해 책임 분리 및 처리 방식 통일, 공통 입력·결과 영역을 컴포넌트로 추상화해 중복 제거.",
          result:
            "로직과 UI 경계 분리로 디버깅·기능 확장 시 수정 흐름 단순화. 103개 파일 규모 리팩토링(+5,591 / −6,570 라인) 수행.",
        },
        {
          id: 3,
          problem:
            "meta description 배포 후에도 네이버 검색 스니펫에 반영되지 않고, 서치어드바이저 URL 수집 요청 후에도 동일.",
          solution:
            "메타 태그 단일 수정만으로는 한계로 판단, Open Graph·JSON-LD에 핵심 문구를 동일 반영해 정합성 확보. SPA 한계 보완을 위해 초기 HTML·noscript에 크롤 가능한 동일 메시지 보강.",
          result:
            "네이버 검색 결과에 요청한 description 문구가 반영되어 스니펫 품질 개선. 검색엔진별 스니펫 차이를 고려한 SEO 대응 방식 정립.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "안내용 로봇 UI 프론트엔드 신규 개발 및 고도화",
    description:
      "전시·매장·로비 등 안내 로봇용 WebView UI를 기획 단계부터 설계·고도화했습니다. Voice·이동 흐름 분리와 모달 안정화에 집중했습니다.",
    technologies: [
      "TypeScript",
      "React",
      "Zustand",
      "Socket.IO",
      "Framer Motion",
    ],
    image:
      "https://images.unsplash.com/photo-1678845536613-5cf0ec5245cd?w=1080&q=80",
    liveUrl: "#",
    codeUrl: "#",
    tags: ["ai", "유지보수"],
    portfolio: {
      title: "마음AI | Front-End Developer",
      subTitle: "안내용 로봇 UI 프론트엔드",
      description:
        "반복 안내·질의 응대를 로봇이 1차 처리하도록 하는 서비스로, 서비스 기획 단계부터 설계·고도화까지 참여했습니다. Voice(대화)와 Robot(이동) 흐름을 분리한 구조와 온디바이스 환경에서의 UI 안정성을 다뤘습니다.",
      technologies: [
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Zustand",
        "Socket.IO",
        "Framer Motion",
      ],
      roles: ["Front-End Developer"],
      role: "Front-End Developer",
      period: "2024.02 ~ 현재",
      contribution: 100,
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      image: [
        "https://images.unsplash.com/photo-1678845536613-5cf0ec5245cd?w=1080&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1080&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&q=80",
      ],
      problems: [
        {
          id: 1,
          problem:
            "대화(Voice)와 이동(Robot) 흐름이 한 덩어리로 설계되기 쉽고, 단계·모달·공통 메시지 UX를 일관되게 제어하기 어려운 상태.",
          solution:
            "Voice: 입력→STT→LLM→TTS→완료까지 UI 인터랙션, Robot: 이동·도착·배터리 등 물리 상태 관리로 2-Layer 분리. 단계를 상태로 정의하고 모달·오버레이가 상태에 파생되도록 설계. 공통 메시지는 중앙 관리 구조로 제안.",
          result:
            "Voice와 Robot 흐름 분리 및 상태 기반 UI로 단계별 인터랙션·공통 메시지를 일관 제어할 기반 마련. 고객사별 요구를 반영하기 쉬운 확장 구조 설계.",
        },
        {
          id: 2,
          problem:
            "WebView에서 모달이 TTS·이동 등 비동기 완료 이벤트에 종속됨. 온프레미스 특성상 네트워크 단절이 잦아 이벤트 미완료 시 모달 미표시 → 사용자는 상태를 알 수 없고 UI가 멈춘 것처럼 보임.",
          solution:
            "모달을 비동기 작업과 분리하고 사용자 흐름 기반으로 독립 제어 가능한 전역 상태로 재설계. ModalManager·React Context로 중앙 관리, 공통 Portal로 DOM 렌더링 위치 일원화.",
          result:
            "네트워크 장애와 무관하게 안내·진행·에러 모달 정상 노출로 UI 안정성 확보. prop drilling 감소 및 모달 로직 중앙화로 유지보수성 개선.",
        },
      ],
    },
  },
] as const;
