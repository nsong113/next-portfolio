/**
 * 블로그 글 본문 — `blog-posts.ts`에서 참조
 */
export const RESPONSIVE_TAILWIND_BREAKPOINTS_AUTOPREFIXER_MARKDOWN = [
  `> **한 줄 요약**  
>  
> 데스크톱 기준으로 만든 화면을 단순히 줄이는 것만으로는 다양한 디바이스에서 같은 사용성을 보장하기 어려웠습니다. Tailwind 커스텀 브레이크포인트로 반응형 기준을 공통화하고, 타이포그래피·여백·버튼 위치 같은 요소를 디바이스별로 조정했습니다. 또한 PostCSS 파이프라인에 Autoprefixer를 포함해 브라우저별 CSS prefix 처리를 자동화했습니다.`,

  `---`,

  `## 1) 무엇이 문제였는지`,

  `초기에는 데스크톱 화면을 기준으로 레이아웃을 맞추는 것만으로도 충분해 보였습니다. 하지만 실제 사용 환경은 데스크톱, 노트북, 태블릿, 모바일처럼 다양하고, 화면 크기에 따라 같은 UI도 다르게 느껴질 수 있습니다.`,

  `큰 화면에서 적절해 보이는 제목 크기나 여백이 모바일에서는 과하게 커 보일 수 있습니다. 반대로 데스크톱 기준의 버튼 위치를 그대로 유지하면 작은 화면에서는 누르기 어렵거나 콘텐츠를 가리는 위치에 배치될 수 있습니다. 반응형 대응은 단순히 화면을 줄이는 일이 아니라, 읽기와 탐색, 클릭 경험을 다시 맞추는 일이었습니다.`,

  `또한 반응형 기준이 화면마다 흩어지면 UI 일관성이 깨질 수 있었습니다. 어떤 화면은 \`768px\`을 태블릿 기준으로 보고, 다른 화면은 다른 기준을 사용한다면 같은 디바이스에서도 레이아웃 전환 시점이 달라질 수 있습니다.`,

  `브라우저별 CSS 처리 차이도 고려해야 했습니다. 일부 CSS 속성은 브라우저에 따라 vendor prefix가 필요할 수 있는데, 이를 개발자가 직접 관리하면 누락되거나 중복될 가능성이 있습니다. 프로젝트가 커질수록 어떤 스타일에 prefix가 필요한지 매번 확인하는 방식은 유지보수에 적합하지 않았습니다.`,

  `따라서 반응형 기준은 Tailwind 설정에서 공통화하고, 브라우저별 CSS 보정은 빌드 단계에서 자동으로 처리하는 구조가 필요했습니다.`,

  `---`,

  `## 2) 설계로 고른 기준`,

  `먼저 Tailwind 설정에 프로젝트 기준의 커스텀 브레이크포인트를 정의했습니다. \`desktop\`, \`laptop\`, \`tablet\`, \`mobile\` 같은 이름을 공통 기준으로 두면, 각 화면은 같은 전환 시점을 기준으로 레이아웃을 조정할 수 있습니다.`,

  `이 방식을 선택한 이유는 화면마다 직접 media query를 작성하지 않기 위해서였습니다. \`tablet:\`, \`mobile:\`, \`laptop:\` 같은 Tailwind 변형을 사용하면 같은 브레이크포인트 체계를 공유하면서도, 컴포넌트 단위로 필요한 스타일을 조정할 수 있습니다.`,

  `반응형 처리는 레이아웃뿐 아니라 타이포그래피, 여백, 인터랙션 요소의 위치까지 함께 다뤘습니다. 제목 크기, 섹션 간격, 모달 패딩, TOP 버튼 위치는 화면 크기에 따라 사용자 체감이 크게 달라지는 요소입니다. 그래서 breakpoint별 클래스를 활용해 디바이스별로 읽기 쉽고 조작하기 쉬운 형태를 유지하도록 했습니다.`,

  `크로스 브라우징 대응은 PostCSS 파이프라인에 Autoprefixer를 포함하는 방식으로 처리했습니다. CSS vendor prefix를 직접 작성하지 않고, 빌드 과정에서 필요한 prefix가 자동으로 붙도록 구성했습니다. 이렇게 하면 컴포넌트 코드는 표준 CSS와 Tailwind 클래스 중심으로 유지할 수 있습니다.`,

  `정리하면 Tailwind 커스텀 screens는 디바이스별 레이아웃 기준을 담당하고, 각 컴포넌트의 responsive class는 실제 화면별 조정을 담당하며, Autoprefixer는 브라우저 호환성 처리를 빌드 단계에서 담당하도록 역할을 나눴습니다.`,

  `---`,

  `## 3) Tailwind 커스텀 브레이크포인트를 정의했습니다`,

  `반응형 기준을 프로젝트 전역에서 재사용할 수 있도록 \`tailwind.config.js\`의 \`screens\`에 커스텀 브레이크포인트를 정의했습니다.`,

  `\`\`\`js
// tailwind.config.js (요지)
extend: {
  screens: {
    desktop: { max: "1920px" },
    "desktop-sm": { max: "1680px" },
    laptop: { max: "1280px" },
    "laptop-sm": { max: "1024px" },
    tablet: { max: "768px" },
    mobile: { max: "450px" },
    "mobile-sm": { max: "375px" },
    // [중략]
  },
}
\`\`\``,

  `이렇게 정의해두면 각 컴포넌트에서 \`tablet:\`, \`mobile:\`, \`laptop:\` 같은 변형을 동일한 기준으로 사용할 수 있습니다.`,

  `---`,

  `## 4) 타이포그래피와 배경도 디바이스별로 조정했습니다`,

  `반응형 대응은 레이아웃의 열 개수만 바꾸는 일이 아니었습니다. 화면 크기에 따라 제목 크기와 여백, 배경도 함께 조정했습니다.`,

  `\`\`\`tsx
<CaseStudyWrapper className="bg-[#ededed] tablet:bg-white">
  {/* [중략] */}
  <h1 className="mb-20 text-4xl font-extrabold text-center tablet:mb-10 tablet:text-20">
    Case Study
  </h1>
</CaseStudyWrapper>
\`\`\``,

  `데스크톱에서는 큰 제목과 넓은 여백을 유지하고, 태블릿 이하에서는 여백과 글자 크기를 줄여 화면 밀도를 조정했습니다. 배경도 breakpoint에 따라 바꿔 작은 화면에서 더 자연스럽게 보이도록 했습니다.`,

  `---`,

  `## 5) 인터랙션 요소의 위치도 화면 크기에 맞췄습니다`,

  `사용자가 직접 누르는 요소는 화면 크기에 따른 위치 조정이 중요했습니다. 예를 들어 TOP 버튼은 데스크톱에서는 여유 있는 간격을 둘 수 있지만, 모바일에서는 화면 가장자리와 콘텐츠 영역을 고려해 더 가까운 위치로 조정했습니다.`,

  `\`\`\`tsx
<button
  className={\`\${visibleGoToTopButton ? "opacity-100" : "opacity-0 pointer-events-none"}
  transition-opacity duration-300 right-8 bottom-12 mobile:right-4 mobile:bottom-4 z-10 fixed
  justify-center items-center bg-white shadow-main-top rounded-full w-12 select-none aspect-square outline-none\`}
>
  {/* [중략] */}
</button>
\`\`\``,

  `이처럼 반응형 처리는 보이는 레이아웃뿐 아니라 사용자가 실제로 조작하는 요소의 위치까지 포함했습니다.`,

  `---`,

  `## 6) 모달도 breakpoint별 여백과 글자 크기를 조정했습니다`,

  `모달은 작은 화면에서 여백이 과하면 콘텐츠가 답답해지고, 텍스트가 크면 줄바꿈이 많아질 수 있습니다. 그래서 패딩과 타이포그래피를 \`laptop:\`, \`tablet:\`, \`mobile:\` 기준으로 세분화했습니다.`,

  `\`\`\`tsx
<article className="laptop:px-16 bg-blue px-28 mobile:px-4 tablet:px-10 py-14">
  <p className="font-bold text-[2rem] text-center text-white laptop:text-3xl tablet:text-2xl wrap-break-word">
    {/* [중략] */}
  </p>
</article>
\`\`\``,

  `이렇게 하면 큰 화면에서는 여백과 강조감을 유지하고, 작은 화면에서는 콘텐츠가 화면 안에 안정적으로 들어오도록 조정할 수 있습니다.`,

  `---`,

  `## 7) Autoprefixer로 vendor prefix를 자동 처리했습니다`,

  `브라우저별 CSS 차이는 컴포넌트마다 직접 대응하지 않고 PostCSS 파이프라인에서 처리했습니다. \`postcss.config.js\`에 \`autoprefixer\`를 포함해 필요한 vendor prefix가 빌드 단계에서 자동으로 붙도록 구성했습니다.`,

  `\`\`\`js
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [postcssImport(), tailwindcss(), autoprefixer()],
};
\`\`\``,

  `의존성도 함께 명시했습니다.`,

  `\`\`\`json
{
  "devDependencies": {
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.4"
  }
}
\`\`\``,

  `이 구조에서는 개발자가 브라우저별 prefix를 직접 기억하지 않아도 됩니다. 컴포넌트 코드는 Tailwind 클래스와 표준 CSS 중심으로 작성하고, 호환성 보정은 빌드 도구가 담당합니다.`,

  `---`,

  `## 8) 정리`,

  `사용자 경험을 개선하려면 화면 크기에 따라 레이아웃만 줄이는 것으로는 부족했습니다. 타이포그래피, 여백, 배경, 버튼 위치처럼 사용자가 읽고 조작하는 요소까지 디바이스별로 조정해야 했습니다.`,

  `Tailwind 커스텀 브레이크포인트를 통해 반응형 기준을 공통화했고, 각 컴포넌트에서는 \`tablet:\`, \`mobile:\`, \`laptop:\` 같은 변형으로 필요한 요소를 조정했습니다. 여기에 Autoprefixer를 적용해 브라우저별 CSS prefix 처리를 자동화했습니다.`,

  `그 결과 다양한 화면 크기와 브라우저 환경에서도 더 일관된 레이아웃과 사용자 경험을 제공할 수 있는 기반을 만들 수 있었습니다.`,
].join("\n\n");
