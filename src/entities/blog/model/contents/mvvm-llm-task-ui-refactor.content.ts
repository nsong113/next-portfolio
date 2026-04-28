/**
 * 블로그 글 본문 — `blog-posts.ts`에서 참조
 */
export const MVVM_LLM_TASK_UI_REFACTOR_MARKDOWN = [
  `![비슷한 task 카드·화면 패턴이 반복되는 목록(위와 같은 유형이 다수)](https://blog.kakaocdn.net/dna/cQhQa5/btsMiIdHL41/AAAAAAAAAAAAAAAAAAAAAIxfm_3r9nbiSDVoNc7jp6gvnJMJylTaKXqD7UiJ58dX/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=G2iAjvd4Gj1sYnMNgzQw9UiOGo4%3D)`,
  `![단일 task 화면 예시 — 입력 영역과 생성 결과](https://blog.kakaocdn.net/dna/6z3UJ/btsMg4vsDhR/AAAAAAAAAAAAAAAAAAAAAJ05wkX0fnymhtVVvCiRBaCAt3Z6XANAn2mYtmZjMMe2/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=RNfhcxJ4iprv4jqXPqX1LcUVXHk%3D)`,

  `## 상황`,
  `<br />`,
  `**LLM TASK UI**는 태스크마다 폼·검증·소켓·API·생성 결과·공통 카드·레이아웃이 **한 컴포넌트 안에 섞이기 쉬운** 구조였습니다. 위 스크린샷처럼 **한 화면의 패턴**이 비슷하게 **스무 개 안팎** 이어지는데, 코드도 비슷하게 반복되면서도 필드·페이로드만 조금씩 달랐습니다.`,

  `## 문제`,
  `<br />`,
  `혼재된 책임은 **한곳을 고치면 다른 태스크나 공통 UI까지 연쇄적으로 흔들리는** 경우가 많아, 변경 영향 범위를 머릿속으로만 추적해야 하는 부담이 컸습니다.`,

  `<details>
<summary>MVVM 아키텍처란 — 배경 설명 (클릭하여 펼치기)</summary>
<p><strong>MVVM(Model–View–ViewModel)</strong>은 화면(UI)와 데이터·비즈니스 로직을 <strong>역할별로 나누는</strong> 아키텍처 패턴입니다.</p>
<ul>
<li><strong>Model</strong>: 애플리케이션 데이터와 <strong>도메인·비즈니스 규칙</strong>, 외부와의 <strong>데이터 교환</strong>(조회·저장 등). 어떻게 그려질지보다 무엇이 참인지·무엇을 주고받는지에 가깝게 두는 층입니다.</li>
<li><strong>View</strong>: <strong>사용자에게 보이는 UI</strong>. 입력과 표시를 담당하고, 가능하면 표현에 집중해 사용자 동작은 아래층으로 넘깁니다.</li>
<li><strong>ViewModel</strong>: Model이 주는 정보를 View가 쓰기 좋게 <strong>가공</strong>하고, 로딩·에러 등 <strong>프레젠테이션 상태</strong>와 사용자 시나리오에 따른 흐름을 <strong>중간에서</strong> 조율합니다. Microsoft 문서 등에서도 MVVM을 <strong>View와 Model 사이의 분리</strong>·테스트 용이성을 높이는 패턴으로 설명합니다 (<a href="https://learn.microsoft.com/en-us/archive/msdn-magazine/2009/february/patterns-wpf-apps-with-the-model-view-viewmodel-design-pattern">The MVVM Pattern</a>).</li>
</ul>
<p>React에는 <strong>MVVM이라는 이름의 프레임워크가 내장되어 있지 않습니다.</strong> 그래서 이 글 뒤에서는 <strong>컴포넌트(View)</strong>와 <strong>커스텀 훅(Model / ViewModel에 대응)</strong>으로 같은 세 역할을 <strong>어떻게 옮겼는지</strong>를 이어갑니다.</p>
</details>`,

  `> **요약**  
>
> • **상태·API 호출·UI 로직**이 섞여 복잡도가 높았던 영역을 **MVVM**으로 나누고, 문서에서는 **\`useModel\` / \`useViewModel\` / View**처럼 일반화해 쓰되, **컴포넌트 책임을 계층별로 고정**하려 했습니다.  
> • **화면 간 데이터 흐름**을 **Recoil의 \`selector\`**로 파생 상태를 나누고, 태스크 안 로직은 **커스텀 훅** 등으로 묶어 **상태 변경의 영향 범위**를 짚기 쉽게 하려 했습니다.  
> • **기능(태스크) 단위로 순차 리팩터링**을 진행하며 **약 92개 파일**을 정비하고, 이후 기능 추가 시 **수정 범위를 특정 레이어로 한정**하려 했습니다.`,

  `<br />`,

  `아래는 그걸 **코드와 커밋으로 어떻게 뒷받침하는지**, 그리고 **고민·애매함·장단**을 솔직히 남긴 글입니다. 같은 주제를 더 짧게 쓴 메모는 [티스토리 글](https://nsong113.tistory.com/130?pidx=0)에 있고, **이 글은 그중에서도 위 세 줄의 근거만** 가져왔습니다.`,

  `---`,

  `## MVVM을 React에서 이렇게 풀어 봤다`,
  `<br />`,

  `React에는 MVVM **프레임워크가 없으니**, Model·ViewModel·View를 **커스텀 훅 + TSX**로 대응해 보기로 했습니다. 외부 통신·데이터는 \`useTask*Model\`, 폼·시나리오는 \`useTask*ViewModel\`, 화면은 \`Task*.tsx\` 같은 식입니다. 포트폴리오에 적어 둔 \`useModel\` / \`useViewModel\`은 **역할만 짧게 부른 이름**이고, 같은 맥락입니다.`,

  `- **Model**: \`useTask{이름}Model.ts\` — 예: \`useTaskEmailModel\`
- **ViewModel**: \`useTask{이름}ViewModel.ts\` — 예: \`useTaskEmailViewModel\`
- **View**: \`Task{이름}.tsx\` 또는 \`Writing*.tsx\` 등`,

  `ViewModel 훅이 Model 훅을 import해 쓰는 형태입니다.`,

  `\`\`\`ts
import useTaskEmailModel from "pages/maum-gpt/llm-task/task-ui/taskEmail/useTaskEmailModel";
// …
const { isConnect, llmRes /* … */ } = useTaskEmailModel();
\`\`\``,

  `---`,

  `### 1. MVVM — Model / ViewModel / View`,
  `<br />`,

  `Model(\`useTask*Model\`)에는 연결 상태, 소켓 송수신, 서버와의 데이터 교환처럼 **외부 시스템과 로직**을 모았습니다. ViewModel(\`useTask*ViewModel\`)에는 폼 스키마·기본값, 제출·재생성 흐름, 버튼 비활성 조건, i18n 등 **화면 규칙과 사용자 시나리오**를 담았습니다. **View**는 ViewModel이 넘기는 값과 핸들러만 받아 **레이아웃·마크업**에 집중하도록 정리했습니다.`,

  `### 2. Recoil \`selector\`와 커스텀 훅 — 영향 범위`,
  `<br />`,

  `여기서 말하는 **selector**는 [Recoil](https://recoiljs.org/)이 제공하는 **\`selector\` API**입니다. atom 등 **원천 상태**를 읽어 **파생 값**을 만들고, 의존하는 atom이 바뀔 때만 다시 계산됩니다. **selector 파일(또는 모듈) 하나**에 모아 두면, “이 파생 값이 바뀌려면 **어떤 atom**이 움직였는지”가 읽기 쉬워집니다.`,

  `태스크 **한 화면 안**의 폼·검증·소켓 응답을 엮는 일은 **\`useTask*ViewModel\` 같은 커스텀 훅**에 두고, **여러 화면이 같이 보는 조각**이나 **atom에서 한 번 더 가공해 쓰는 값**은 Recoil \`selector\`로 빼는 식으로 역할을 나눴습니다. 그래서 “데이터가 어디서 와서 어디까지 파생되는지”가 **selector / 훅 경계**로 나뉘어, 변경 영향을 **파일 단위로 예측**하기 쉬워졌다고 말할 수 있습니다.`,

  `### 3. 순차 리팩터링과 파일 수`,
  `<br />`,

  `메일·뉴스·프로모션·스크립트·질문, 배송·테이블·요약·회의, 번역·분석·코드, 이미지·엑셀·표준화 등으로 나뉘어 진행된 것은, 한 번에 전체를 갈아엎지 않고 **리스크를 쪼개 검증 가능한 단위**로 리팩토링을 진행했습니다.`,

  `---`,

  `## 가장 애매했던 점: Model과 ViewModel 경계`,
  `<br />`,

  `리팩터링 당시 “**이 로직이 화면 규칙인가, 외부와의 통신인가?**”를 한 번에 판별하기 어려운 순간이 많았습니다. 그래서 아래처럼 기준을 두고 나눴습니다.`,

  `- **Model에 둔 것**: 서버·소켓·파일 같은 외부 시스템과의 계약 — 연결 여부, 페이로드, 스트림 초기화, 호출 자체.<br />“버튼을 눌렀을 때 사용자에게 무엇을 보여줄지”보다 **백엔드와 무엇을 주고받는지**에 가깝면 Model입니다.
- **ViewModel에 둔 것**: 폼·검증·로케일·제출·재생성 시나리오·로컬 UI state. **Model이 “연결됐다 / 응답이 왔다”는 사실만 주면,** 그 결과를 **어떤 화면 상태로 반영할지**는 ViewModel이 결정합니다.`,
  `<br />`,
  `- **헷갈릴 때 쓴 질문**

  - 같은 API를 쓰는 **다른 태스크 UI에 그대로 옮겨도 의미가 있나?** → 있으면 Model에 가깝고, 문구·필드·검증에 묶이면 ViewModel.
  - **React·폼·i18n 없이 순수 TS로 설명할 수 있나?** → 가능하면 Model, 아니면 ViewModel.
  - **버그가 서버/연결 쪽인지, 입력·시나리오 쪽인지**로 나뉘면 수정 범위가 좁아진다는 기대로 정리했습니다.`,

  `---`,

  `## React에는 MVVM 프레임워크가 없다`,
  `<br />`,
  `Android나 WPF처럼 **MVVM이라는 이름이 박힌 프레임워크는 없어서**, “무엇을 Model이라 부를지”부터 스스로 정해야 했습니다. **폴더·파일·훅 이름**으로 역할을 고정하는 쪽으로 접근했고, 화면은 \`Task*\`, 로직은 \`useTask*Model\` / \`useTask*ViewModel\` **두 개의 커스텀 훅**으로 쪼갰습니다. **React에 맞게** “**훅 = Model/ViewModel 자리**”로 해석한 적용에 가깝습니다.`,

  `처음에는 “**전부 커스텀 훅 하나로 빼면 되지 않나?**”까지 갔는데, 훅 하나가 길어지면서 **소켓·API와 폼·검증이 다시 한 파일에 섞이는** 문제가 그대로 돌아왔습니다. 그때부터 바깥과 통신하는 쪽(**Model 훅**)과 폼·검증·시나리오를 엮는 쪽(**ViewModel 훅**)을 나눴습니다.`,

  `고민이 길었던 점은, 레이어를 나누면 **파일 수가 늘고** 읽는 사람이 **훅을 여러 번 타야** 한다는 비용이 든다는 것이었습니다. 그래서 **무조건 세 겹**보다는 태스크(기능) 단위로만 패턴을 강제하고, 공통으로 빼면 **추상화만 두꺼워지는** 코드는 컴포넌트에 남기는 **타협**도 했습니다. 완벽한 단방향보다 “**수정할 때 Model만 보면 되는지, ViewModel만 보면 되는지**”가 나오는지를 기준으로 조정했습니다.`,

  `---`,

  `## 장점과 단점`,
  `<br />`,
  `MVVM으로 나누면 **파일이 늘고**, 처음엔 **여러 파일을 왔다 갔다** 하며 이해해야 해서 읽는 비용이 생깁니다.`,

  `- **장점**: 책임이 파일명에 드러나고, 기능 추가 시 건드릴 층을 정하기 쉬우며, 리뷰 때 “이 PR은 ViewModel만”처럼 **범위를 나누기 좋다**.`,
  `- **단점**: 줄 수·간접 참조·초기 학습 비용. 과도한 추상화면 추적이 더 어려워질 수 있다.`,

  `그래도 도입한 이유는 단순합니다. 위에서 정리한 **[문제](한곳을 고치면 다른 태스크/공통 UI까지 흔들려서, 영향 범위를 머릿속으로만 추적해야 했던 부담)를** 줄이는 데에는, “파일이 늘어나는 단점”보다 “수정 범위가 레이어로 좁혀지는 장점”이 더 크게 느껴졌기 때문입니다.`,

  `---`,

  `## 마치며`,
  `<br />`,
  `티스토리에는 [당시의 목표·결과·기타 리팩토링한 부분도](https://nsong113.tistory.com/130) 더 넣어 두었습니다.`,
].join("\n\n");
