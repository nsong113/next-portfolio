export const MAIN_LANDING_SCROLL_PERFORMANCE_MARKDOWN = [
  `메인 랜딩에서 **스크롤·휠**로 섹션과 카드가 연동되는 화면을 다룰 때, **연속 휠 입력**과 **스크롤 위치 기반 레이아웃** 때문에 프레임이 끊기거나 상태 갱신이 과해지는 문제가 있었습니다.  
아래는 **문제와 진단 → 구현 → 트레이드오프** 순으로 정리한 글입니다.`,

  `> **요약**  
>  
> **1. 휠 처리**  
> 사용자가 휠을 굴릴 때마다 상태를 바로바로 바꾸지 않고, \`requestAnimationFrame\`으로 한 프레임 단위로 묶어서 처리했습니다. 스크롤 방향이 이전과 같으면 상태를 안 바꾸고, 위에서 아래로 또는 아래에서 위로 방향이 바뀔 때만 \`setState\`를 호출했습니다. 같은 방향으로 계속 휠을 굴릴 때는 쓸데없는 리렌더가 줄었습니다.  
>  
> **2. 섹션 연동**  
> 페이지를 내릴 때 카드나 섹션이 같이 움직이는 효과를 만들었는데, 단순히 “스크롤 이벤트가 올 때마다 조금씩 움직였습니다”가 아니라, 특정 기준 섹션이 지금 화면 안에 얼마나 들어와 있는지를 \`getBoundingClientRect\`로 계산해서 그 비율에 맞춰 움직였습니다. 그리고 그 값으로 Framer Motion의 \`controls.set\`을 써서 카드와 섹션 위치를 갱신했습니다.  
>  
> **3. 로딩 최적화**  
> 이미지는 화면에 바로 안 보이는 것들은 \`loading="lazy"\`로 늦게 불러오고, 자주 안 들어가는 인증·온보딩 페이지는 \`React.lazy\`로 코드 자체를 나중에 불러오게 해서 처음 페이지 진입 시 부담을 줄였습니다. 여기서 중요한 건 메인 랜딩 페이지 자체를 분리한 건 아닙니다.  
>  
> 특히 휠 쪽은 **방향 상태 갱신**을 덜 하여 **리렌더 부담**을 낮추는 효과가 컸고, **FMStackSection** 쪽은 **위치 계산**과 **갱신**을 **화면 주기**에 맞춰 움직임이 더 **안정적으로** 보이게 정리한 데 초점이 있었습니다.`,

  `---`,

  `## 1. 문제와 진단`,

  `<br />`,

  `메인 스크롤 구간에서 **화면이 버벅**인다는 체감이 되었습니다.`,
  `**React Profiler**는 스크롤·휠과 맞물려 **특정 컴포넌트가 과하게 리렌더**되는지 보는 용도로 켰습니다. 리렌더만 보지 않고 **DOM 계산·스타일 반영 타이밍**도 같이 봤습니다.`,

  `- **휠과 방향 상태**  
  
  **문제:** 메인 랜딩에서 스크롤·휠 사용 시 **버벅임**이 체감됐습니다.  
  
  **진단:** \`wheel\`은 짧은 시간에 **많이** 올 수 있는데, **이벤트마다** 방향을 갱신하면 \`setState\`·**리렌더**가 **과해질** 수 있다고 봤습니다. \`wheel\`이 올 때마다 곧바로 반응하면, 페인트보다 먼저 핸들러·상태 갱신이 쌓일 수 있다고 봤습니다.  
  
  **방향:** **\`requestAnimationFrame\`과 \`ticking\` 플래그**로 **한 프레임에 한 번만** 처리하도록 정리했습니다.`,

  `<br />`,
  `- **레이아웃 읽기·쓰기**  
  
  **문제:** 카드·섹션을 스크롤에 맞춰 움직이는 구간에서 **움직임이 끊기거나** 타이밍이 **어긋난다**고 느껴질 수 있었습니다.  
  
  **진단:** \`scroll\` **이벤트** 타이밍이 **페인트**와 맞지 않을 수 있고, \`getBoundingClientRect\` **읽기** 뒤 \`transform\`·**스타일** **쓰기**를 **짧은 간격**으로 **자주** 이어 쓰면 **레이아웃·스타일** 쪽 **메인 스레드** 부담이 커질 수 있다고 봤습니다. 이 축은 **Profiler**로 스크롤·휠과 겹쳐 봤습니다.  
  
  **방향:** \`scroll\` **리스너**로 매 이벤트마다 읽는 대신, \`requestAnimationFrame\`으로 이어 잡는 **연속 rAF 루프** 안에서 **기준 섹션** \`getBoundingClientRect()\`로 **진입도**를 읽고 \`controls.set\`으로 **카드·섹션** 위치를 갱신하는 쪽으로 정리했습니다(**2절** \`FMStackSection\`).`,

  `<br />`,
  `- **이미지·리소스**  
  
  **문제:** **첫 로드**에 **뷰포트 밖** 이미지·자주 쓰지 않는 **하위 라우트** 코드까지 **한꺼번에** 싣는다면 **체감 부담**이 커질 수 있었습니다.  
  
  **진단:** **한꺼번에** 디코딩·네트워크·**JS 파싱**이 몰리면 메인이 바빠질 수 있다고 봤고, **스크롤 애니메이션**과는 **별도**로 **이미지·번들** 축을 같이 짚었습니다.  
  
  **방향:** \`loading="lazy"\`로 당장 화면에 안 보이는 이미지는 늦게 불러오고, 인증·온보딩 등 **하위 라우트**는 \`React.lazy\`로 **해당 경로**를 열 때까지 **청크**를 나눴습니다. **메인 랜딩** 본문은 정적 \`import\`로 두었습니다(**2절**).`,

  `---`,

  `## 2. 구현`,

  `### 휠 처리`,

  `\`wheel\`에 \`ticking\` 플래그(이미 예약된 작업이 있으면 또 예약하지 않게 막는 플래그)와 \`requestAnimationFrame\`을 써 **연속 입력**을 **한 프레임에 한 번**으로 묶었습니다. rAF 콜백에서 \`deltaY\`로 방향을 읽고, **\`newDir !== lastDir\`일 때만** \`setDirNum\`을 호출했습니다.
  
  **디바운스**는 입력이 **멈춘 뒤**에만 쓰기 쉬운 모델이고, **고정 스로틀**은 **디스플레이** 주기와 **항상** 맞지 않을 수 있어, **계속** 방향을 읽어야 할 때는 rAF 쪽이 이번 케이스에 맞다고 봤습니다.`,

  `<details>
<summary>rAF, 스로틀, 디바운스 — 참고 (클릭하여 펼치기)</summary>
<p><code>requestAnimationFrame</code>은 브라우저가 <strong>다음 화면을 그리기 직전</strong>에 콜백을 한 번 실행해 주는 API입니다. 자동으로 반복되지 않고, 다시 돌리려면 콜백 안(또는 그 후)에서 <code>requestAnimationFrame</code>을 <strong>다시 호출</strong>해야 합니다. (<a href="https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame">MDN — requestAnimationFrame</a>)</p>
<p><strong>스로틀</strong>은 이벤트가 아무리 많이 와도 <strong>일정 간격마다 한 번</strong>만 실행하는 방식입니다.


<strong>디바운스</strong>는 입력이 <strong>잠잠해질 때까지</strong> 기다렸다가 <strong>한 번</strong> 실행하는 방식입니다. (<a href="https://developer.mozilla.org/en-US/docs/Glossary/Throttle">Throttle</a>, <a href="https://developer.mozilla.org/en-US/docs/Glossary/Debounce">Debounce</a>)</p>

</details>`,

  `\`\`\`ts
useEffect(() => {
    let ticking = false;
    let lastDir = dirNum;
    const handleWheel = (e: WheelEvent) => {
      // 스와이퍼 내부면 return
      if (!ticking) {
        requestAnimationFrame(() => {
          const newDir = e.deltaY > 0 ? 1 : -1;
          if (newDir !== lastDir) {
            setDirNum(newDir);
            lastDir = newDir;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [dirNum]);
\`\`\``,

  `### FMStackSection`,

  `\`FMStackSection\`은 \`scroll\` **리스너 기반이 아니라** \`handleScrollAnimation\` 끝에서 \`requestAnimationFrame(handleScrollAnimation)\`으로 **자기 자신을 다시 잡는** **연속 rAF 루프**로 동작했습니다. 루프 안에서 **기준 섹션** \`getBoundingClientRect()\`로 진입도(0~1)를 읽고 \`controls.set\`으로 카드·섹션 **위치**를 갱신했습니다. 그래서 이 구간은 “\`scroll\` 이벤트를 **줄였다**”기보다, **진입도**와 **모션**을 **디스플레이 주기**에 맞춰 **같이** 둔 구조에 가깝다고 봤습니다.`,

  `### 이미지 lazy loading`,

  `<details>
<summary>loading="lazy"란? — 참고 (클릭하여 펼치기)</summary>
<p><code>&lt;img loading="lazy"&gt;</code>는 <strong>지금 화면에 바로 안 보이는 이미지</strong>는 나중에 불러오게 하는, HTML <code>img</code>에 붙이는 <strong>브라우저 옵션</strong>입니다. “당장은 안 보여도 되니, 화면에 가까워질 때쯤 불러와도 된다”는 뜻에 가깝습니다. (<a href="https://developer.mozilla.org/ko/docs/Web/HTML/Reference/Elements/img#loading">MDN — <code>img</code> · <code>loading</code></a>)</p>
<p>아래쪽에만 있는 이미지까지 <strong>첫 로딩에 전부</strong> 받으면 네트워크·디코딩 부담이 커질 수 있어, 이럴 때 <code>lazy</code>를 쓰면 <strong>뒤쪽은 미뤄서</strong> 불러올 수 있습니다.</p>
<p>이건 <strong>React 기능이 아닙니다</strong>. <code>React.lazy</code>·<code>Suspense</code>는 <strong>JS 컴포넌트 코드</strong>를 나눠 늦게 가져오는 쪽이고, <code>loading="lazy"</code>는 <strong>이미지 파일</strong>을 늦게 가져오는 쪽입니다.</p>
</details>`,

  `\`MainCard.tsx\` 등에서 \`<img loading="lazy" … />\`로 **뷰포트 근처까지** 디코딩·네트워크를 늦췄습니다.`,

  `### LCP·UX와 lazy`,
  `<br />`,

  `\`loading="lazy"\`는 **항상 LCP를 좋게 만드는 속성이 아닙니다.** 폴드 아래·비필수만 미루면 초기 바이트·디코딩이 줄어 도움이 될 수 있지만, **히어로·상단 대형 비주얼까지 lazy**로 밀면 LCP가 나빠질 수 있습니다. **LCP 후보 이미지는 lazy 대상에서 빼고**, 필요하면 선로딩·우선순위 옵션을 검토하는 편이 안전합니다.`,

  `**상단 비주얼**은 lazy 없이, **카드 하단** 등은 lazy로 나눴고, Lighthouse·Performance로 **LCP 후보**는 lazy에서 뺐습니다. 빨리 스크롤하면 그래픽이 늦게 뜰 수 있어, 카드 **레이아웃**을 먼저 잡아 흐름이 끊기지 않게 했습니다.`,

  `### \`React.lazy\`로 라우트 분리`,

  `<details>
<summary>React.lazy — 짧은 참고</summary>
<p><code>React.lazy</code>는 <strong>필요할 때만</strong> <code>import()</code>로 쪼갠 <strong>컴포넌트 JS</strong>를 받는 React 쪽 방법이며, 본문은 <strong>메인이 아닌</strong> 하위 라우트에만 썼다는 뜻입니다. (<a href="https://react.dev/reference/react/lazy">React Docs — lazy</a>)</p>
</details>`,

  `\`routers/index.tsx\`에서 **Greeting, FindPassword, Withdrawal, Register, Farewell** 등 **인증·온보딩**은 \`lazy(() => import(...))\`로 **해당 경로**를 열 때까지 쪼갰습니다. **메인 랜딩**은 **정적 import**로 두었습니다.`,

  `---`,

  `## 3. 트레이드오프`,

  `- **휠 rAF**  
  같은 **프레임** 안에 위·아래를 **아주 빠르게** 바꾸면, **한 번**만 읽는 쪽이면 **중간**이 빠질 수 있습니다(콜백이 무거우면 그 **프레임** 비용은 그대로).`,

  `- **FMStackSection rAF 루프**  
  \`scroll\`이 **멈춰도** 마운트 동안 **프레임**마다 루프가 **돌 수** 있어 **CPU**를 쓸 **수** 있습니다(디스플레이에 맞추는 **대가**).`,

  `---`,

  `## 마치며`,

  `이 경험은 메인 랜딩의 스크롤 인터랙션을 무작정 “\`scroll\` 이벤트 최적화”로 묶기보다, 휠 입력, 기준 섹션 진입도 계산, 이미지·코드 로딩을 각각 나눠 조정했던 작업에 가까웠습니다. 이 글은 그 당시 선택과 트레이드오프를 코드 기준으로 정리한 기록입니다.`,
].join("\n\n");
