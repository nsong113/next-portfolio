export const SPA_SEO_METADATA_SEARCH_SNIPPET_MARKDOWN = [
  `**메타데이터 정합성**을 맞추고, **검색엔진이 페이지를 더 일관되게 해석할 수 있도록** 정리한 작업입니다.
  
  핵심은 라우트(URL)마다 전달해야 할 메시지가 다른데, 초기 HTML에 들어가는 전역 메타와 CSR 이후에 갱신되는 페이지별 메타가 엇갈리면 검색엔진이나 미리보기 시스템이 서로 다른 신호를 받게 된다는 점이었습니다.
  
  그래서 **meta description**, **Open Graph**, **JSON-LD** 구성을 다시 정리하고, 분산되어 있던 메타 정보를 **하나의 규칙 아래** 모아 **경로별로 같은 방식**으로 적용했습니다.

동시에 **SPA**라서 첫 응답 HTML이 비어 보일 수 있는 부분은, **크롤러가 JS 없이도 읽을 수 있는** 초기 텍스트와 **noscript** 쪽을 보강하는 쪽으로 보완했습니다.

네이버는 스니펫이 메타를 그대로 따라오지 않는 경우가 있어, **메타·구조화 데이터·본문에 노출되는 문구**를 URL 단위로 정합성을 맞추고 **서치어드바이저에서 재수집**을 거친 뒤 노출이 어떻게 바뀌는지 확인했습니다.  `,
  `---`,

  `## 1. 문제와 진단`,

  `<br/>`,

  `
**문제**:

- 페이지마다 검색엔진에 보여주고 싶은 제목과 설명이 달랐는데, 메타 정보가 **URL 단위로 한 묶음**처럼 정리되어 있지 않아 **같은 URL에서 서로 다른 메시지**가 섞일 수 있었습니다.

여기서 포인트는 “Helmet이 문제”가 아니라, **전역 HTML에 남아 있는 값**과 **진입 후 Helmet이 덮는 값**이 서로 다를 때 생기는 정합성 이슈입니다. 예를 들어 \`/pricing\`은 요금제 안내가 핵심인데, 초기 HTML의 전역 메타는 서비스 소개 톤으로 남아 있고, 진입 후에는 Helmet이 \`title / meta description / canonical\`을 \`/pricing\` 관점으로 바꾸는 식입니다. 사용자가 보는 화면은 정상이라도, 검색·미리보기는 수집 방식에 따라 전역 메타·페이지 메타·본문 중 일부를 참고할 수 있어 **대표 메시지가 분산**될 여지가 있었습니다.

또 하나의 문제는 **SPA 특성상 초기 HTML이 얇아 보일 수 있다는 점**이었습니다. JS 실행 전에는 본문이 비어 있거나 최소한의 마크업만 남는 경우가 있어, 크롤러가 첫 응답에서 읽을 수 있는 텍스트 신호가 약해질 수 있습니다. 그래서 **초기 HTML과 \`noscript\` 영역에 텍스트를 보강**해, “이 URL이 무엇을 말하는 페이지인지”를 더 명확히 남길 필요가 있었습니다.

마지막으로 **네이버 검색 결과 스니펫**에서 문제가 더 분명하게 드러났습니다. **네이버 검색 결과에 보이는 설명문구(스니펫)가 우리가 의도한 메타 내용과 다르게 나와서**, meta description을 변경했는데도 **이전 내용이 계속 노출**되는 케이스가 있었습니다. 그래서 그 원인을 **SEO 관점에서 점검하고 수정한 뒤 네이버 서치어드바이저로 다시 수집시켜 실제 노출 변화까지 확인**하는 것을 작업 범위로 잡았습니다.

<br/>

**진단**:

- 이 작업의 목표는 “Helmet을 쓰느냐 마느냐”가 아니라, **페이지별로 흩어져 상이하게 관리되던 메타 정보** 때문에 검색 반영이 어려웠던 상황을 **정합성 있게 재정비**하는 것이었습니다.

그래서 먼저 URL별로 “이 페이지가 대표적으로 말해야 하는 메시지”를 잡고, 그 기준으로 **meta description, Open Graph, JSON-LD**까지 포함한 메타데이터를 **한 구조로 통합**해 **라우트별로 일관되게 적용**하기로 했습니다. 즉 \`title / description / canonical\`뿐 아니라 OG와 JSON-LD도 페이지의 메시지와 함께 움직이도록 설계했고, 결과적으로 “같은 URL에서 서로 다른 메타 신호가 섞이는 상태”를 줄이는 쪽에 진단의 초점을 뒀습니다.

네이버 스니펫은 메타 설명과 다르게 보일 수 있으니, 메타만 고치는 것으로 끝내지 않고 **구조화 데이터와 본문 노출 구조까지** 함께 보면서 URL 기준으로 정합성을 맞추는 쪽으로 접근했습니다.

<details>
<summary><strong>구현 근거 (서브)</strong></summary>

- **앱 루트**: \`App.tsx\`에서 \`HelmetProvider\`로 앱을 감싸, 페이지(라우트) 단위로 Helmet을 적용할 전제를 만들었습니다.
- **라우트 메타**: \`Pricing.tsx\` 등 주요 페이지에서 \`Helmet\`으로 \`title\`, \`meta name="description"\`, \`canonical\`을 페이지별로 설정했고, 같은 방식으로 **Open Graph와 JSON-LD까지 라우트 단위로 통합**해 적용하는 구조로 정리했습니다.
- **전역 HTML 보강**: \`index.html\`에는 SPA 초기 응답에서 읽힐 수 있는 기본 신호(초기 텍스트/noscript 등)를 두어, JS 없이도 최소한의 의미가 남도록 보완했습니다.

</details>`,

  `---`,

  `## 2. 구현/해결`,

  `**구현**은 세 갈래로 나눕니다.  

첫째, **페이지별로 상이하게 관리되던 메타 정보**로 인해 검색 결과 반영이 어려운 상황을 개선하기 위해, **meta description, Open Graph, JSON-LD 중심**으로 메타데이터 구조를 재정비하고 분산된 메타 정보를 **Helmet으로 통합**해 **라우트별로 일관되게 적용**했습니다. 앱 루트에서 \`HelmetProvider\`로 기반을 만든 뒤, 페이지 컴포넌트의 \`<Helmet>\` 안에 \`title\`, \`meta description\`, \`canonical\`은 물론 \`og:title / og:description / og:url\` 같은 Open Graph와, \`application/ld+json\` 형태의 JSON-LD까지 **한 세트로** 넣어 “한 URL이 말하는 메시지”가 흔들리지 않게 맞췄습니다.

아래는 실제로 적용한 형태(예시)입니다.

\`\`\`tsx
// App.tsx
return (
  <HelmetProvider>
    <BrowserRouter>
      {/* <EventTracker /> */}
      <AppRouter />
      <ScrollToTop />
      <ToastContainer toastStyle={{ backgroundColor: "#4d5562" }} />
    </BrowserRouter>
  </HelmetProvider>
);
\`\`\`

\`\`\`tsx
// Pricing.tsx (예시)
return (
  <div ref={contWrapRef} className="contents-wrap">
    <Helmet>
      <title>마음AI 플랫폼 이용요금 완벽 가이드 – 무료부터 프리미엄까지</title>
      <meta
        name="description"
        content="플랫폼 무료 이용, 사용량 기반 과금 구조와 할인 혜택을 확인하세요."
      />
      <link rel="canonical" href="https://maum.ai/pricing" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="마음AI 이용요금 가이드" />
      <meta
        property="og:description"
        content="플랫폼 무료 이용, 사용량 기반 과금 구조와 할인 혜택을 확인하세요."
      />
      <meta property="og:url" content="https://maum.ai/pricing" />

      {/* JSON-LD (라우트별로 해당 페이지 메시지에 맞춰 구성) */}
      <script type="application/ld+json">{JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "마음AI 플랫폼 이용요금 가이드",
          description:
            "플랫폼 무료 이용, 사용량 기반 과금 구조와 할인 혜택을 확인하세요.",
          url: "https://maum.ai/pricing",
        },
        null,
        2,
      )}</script>
    </Helmet>
  </div>
);
\`\`\`

둘째, **SPA에서도 크롤 가능한 초기 HTML**을 채웠습니다. \`index.html\`의 \`<body>\`에서 \`#root\` **이전**에 **noscript** 블록과 **숨김 텍스트 블록**을 두고, 그 안에 **h1·p** 같은 핵심 문장을 넣었습니다. 결과적으로 **JS가 없어도** HTML 소스만으로 페이지(서비스)의 주제 문장이 읽히는 형태가 됩니다.

\`\`\`html
<!-- index.html -->
<body>
  <!-- 네이버 크롤러를 위한 초기 콘텐츠 (숨김 처리) -->
  <noscript>
    <div
      style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden"
    >
      <h1>마음AI</h1>
      <p>마음AI의 SUDA, MAAL, WoRV가 탑재된 'Physical AI' ...</p>
      <p>마음AI는 Physical AI 전문 기업으로, ...</p>
    </div>
  </noscript>

  <!-- 크롤러가 읽을 수 있는 숨겨진 텍스트 -->
  <div
    style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden"
    aria-hidden="true"
  >
    <h1>마음AI - Physical AI 플랫폼</h1>
    <p>마음AI의 SUDA, MAAL, WoRV가 탑재된 'Physical AI' ...</p>
  </div>
\`\`\`

셋째, **네이버 스니펫 정합성**을 목표로 작업을 마무리했습니다. meta description을 바꿨는데도 검색 결과에는 **이전 설명 문구가 계속 노출**되는 문제가 있었고, 이를 “메타 태그 1개가 안 먹힌 것”으로 보지 않고 **스니펫 후보 신호 전체**를 점검했습니다. 구체적으로는 URL 기준으로 **메타(일반/OG)·JSON-LD·초기 HTML 텍스트(noscript/숨김 본문)·실제 본문 노출 구조**를 같은 메시지로 정렬하고, 수정 후에는 **네이버 서치어드바이저에서 재수집**을 요청해 **실제 노출 변화**까지 확인했습니다. 이 과정은 운영 도구를 포함하므로, 아래 한계에서 말하듯 **레포 코드만으로는 완전 증명은 어렵습니다**.`,

  `<details>
<summary><strong>구현 근거 (서브)</strong></summary>

1. **메타·OG·JSON-LD 재정의·통합·라우트별 적용**  
   - \`App.tsx\`: \`HelmetProvider\`로 감싸 라우트 단위 메타 적용 기반을 만듦.
   - \`Pricing.tsx\` 등: \`Helmet\`에서 \`title\`, \`meta description\`, \`canonical\`을 페이지별로 설정하고, 같은 블록에 \`og:title / og:description / og:url\` 등 **Open Graph**와 \`application/ld+json\` 형태의 **JSON-LD**도 함께 구성(라우트별 “메타 한 세트”로 통합).

2. **초기 HTML + noscript 텍스트 보강**  
   - \`#root\` 앞 **noscript** 안 정적 텍스트, 「네이버 크롤러를 위한 초기 콘텐츠」 주석, **숨김 div**의 h1·p → **JS 없이 읽히는 보조 텍스트**로 해석 가능.

3. **네이버 스니펫 불일치 대응 (구조적 정합성)**  
   - meta description을 변경했는데도 **이전 문구가 스니펫으로 남는 현상**이 있어, URL 기준으로 **메타·OG·JSON-LD·초기 HTML 텍스트·본문 노출 구조**를 점검/정렬.
   - 수정 후 **네이버 서치어드바이저 재수집**을 통해 **실제 노출 변화 확인**(운영 근거 필요).

</details>`,

  `---`,

  `## 3. 성과와 한계`,

  `**성과**로는 **Lighthouse SEO 100점**을 달성했고, **네이버 검색 CTR**이 **2.3%에서 2.7%**로 올랐으며, **검색 유입 클릭 수**는 **약 16% 증가**에 기여한 것으로 보고 있습니다. 다만 이 문장들은 **이력서·회고에서 말하는 효과의 방향**을 적은 것이지, **이 포트폴리오 저장소의 파일만**으로는 **수치의 진위나 인과**를 증명할 수 없습니다.  

**한계**를 분명히 나눕니다. **코드에 남는 것**(Helmet, \`index.html\` 메타·OG·JSON-LD, noscript·숨김 텍스트, 네이버 인증 메타·주석)은 **무엇을 바꿨는지**를 보여 주지만, **Lighthouse 점수**, **CTR**, **클릭 수 증가**, **스니펫 문구가 바뀌었다**는 주장은 **Lighthouse 리포트**, **Search Console·서치어드바이저 캡처**, **내부 대시보드** 같은 **운영 근거**가 있을 때 면접·문서에서 **단정**하기에 안전합니다. **「메타를 맞췄다」**와 **「CTR이 올랐다」**는 증명 난이도가 다르므로, 글에서는 **구현은 코드**, **성과·스니펫 변화는 콘솔·리포트**로 나누어 말하는 것이 맞습니다.`,
].join("\n\n");
