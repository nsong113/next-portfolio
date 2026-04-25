/**
 * 블로그 본문 — `blog-posts.ts`에서 참조
 * 온디바이스 로봇 WebView: 비동기와 모달 제어 분리 사례
 */
export const ROBOT_UI_MODAL_GLOBAL_FLOW_MARKDOWN = [
  `> **한 줄 요약**  
>  
> 도착·투어·에러 등 이벤트 뒤에 “API 성공 → 전역 상태 갱신”이 있어야만 모달이 열리던 구조는 지연·실패에서 안내가 사라질 수 있었습니다. 모달 **열림·닫힘**을 앱 루트의 **전역 UI 계층**(\`ModalProvider\` / \`ModalManager\` / \`useModal\`)으로 모으고, **비동기는 데이터를 채우는 역할**로만 두어 같은 경로로 안내하도록 정리했습니다.`,

  `---`,

  `## 1) 무엇이 문제였는지`,

  `처음에는 “특정 이벤트가 끝난 뒤, 데이터가 준비되면 모달을 연다”는 흐름이 자연스럽다고 느껴졌습니다. 예를 들어 도착 후 장소 상세 API가 성공하면 \`topicInfoState\`가 채워지고, 그 변화를 \`useEffect\`가 감지해 \`ProductDetailModal\`을 엽니다.`,

  `정상 응답이 빠르면 이 패턴만으로도 무방합니다. 다만 온디바이스·전시망 환경에서는 **응답 지연·타임아웃·일시 실패**가 흔하며, 이때 “모달을 열 조건”이 **데이터 갱신 성공에만 묶이면** 사용자는 **도착 뒤 다음 안내를 받지 못한 것처럼** 느끼게 됩니다.`,

  `또 **모달을 직접 열고 닫는 코드**가 도착·투어·에러·타이머·설정·음성 등 **여러 훅과 콜백에 흩어지면**, “지금 어떤 모달이 열려 있어야 하는가”를 파악하기 어렵고, 복구·지연·경합이 섞이면 **일관된 안내**를 유지하기 어렵습니다.`,

  `---`,

  `## 2) 설계로 고른 기준`,

  `**사용자 안내 흐름**(언제 어떤 모달을 띄울지)과 **데이터 획득**(API 성공 여부)을 분리하려고 했습니다. 안내 흐름은 이벤트·정책·복구에 맞춰 **한 계층에서** 결정하고, API는 그 안에서 **제목·본문·이미지 등 내용**을 채우거나, 실패 시 **같은 모달 경로로** 대체 문구를 보여 주는 쪽이 낫다고 판단했습니다.`,

  `이를 위해 “비즈니스 데이터를 오래 쌓는 저장소”가 아니라, **루트에서만 의미 있는 UI 오버레이 제어**에 가깝다고 보았고, 별도의 앱 전역 \`Zustand\`보다 **React Context + 훅**이 단순하다고 보았습니다. **여러 atom을 조합해야 하는 표시 조건**(음성 오버레이, “모달 하나라도 열림” 등)은 **selector/파생**으로 두고, \`isOpen\`과 페이로드는 컨텍스트에서 직접 다루는 식으로 역할을 나누었습니다.`,

  `---`,

  `## 3) 앱 루트: Provider와 Manager를 한곳에`,

  `전역 UI 레이어로 \`ModalProvider\`로 트리를 감싸고, \`AppRouter\`와 같은 루트에 \`ModalManager\`를 두어 **모달이 항상 같은 z-index·포털·레이어**에서만 마운트되게 했습니다(예: 언어·i18n Provider 하위).`,

  `\`\`\`tsx
// App.tsx (요지)
<RecoilRoot>
  <LanguageProvider>
    <ModalProvider>
      <AppRouter />
      <ModalManager />
      <ToastContainer />
    </ModalProvider>
  </LanguageProvider>
</RecoilRoot>
\`\`\``,

  `---`,

  `## 4) 제어 API는 useModal로 통일`,

  `각 기능은 모달마다 \`useState\`를 두지 않고, **이름 기반**으로 \`open\` / \`close\` / \`isOpen\` / \`data\`를 씁니다. 이동·상세·충전 등 역할이 달라도 **호출 형태는 동일**해져서, \`onTourPointArrival\`이든 \`onError\`든 **같은 언어로** 모달을 제어할 수 있습니다.`,

  `\`\`\`tsx
// useModal.ts (요지)
export function useModal<T = unknown>(modalName: string) {
  const { modals, openModal, closeModal } = useModalContext();
  const modalState = modals[modalName] ?? { isOpen: false, data: undefined };

  return {
    isOpen: modalState.isOpen,
    data: modalState.data as T,
    open: (data?: T) => openModal(modalName, data),
    close: () => closeModal(modalName),
  };
}
\`\`\``,

  `\`\`\`tsx
// ModalContext.tsx (요지) — "전체에 모달이 하나라도" 같은 조건을 한곳에
const isAnyModalOpen =
  Object.values(modals).some((m) => m.isOpen) || voiceUiStatus.isOverlayVisible;
// openModal, closeModal, closeAllModals …
\`\`\``,

  `---`,

  `## 5) 실제 UI는 ModalManager에만`,

  `\`MovingModal\`, \`ProductDetailModal\` 등 **어떤 컴포넌트를 켤지**는 \`ModalManager\`가 \`modals.*.isOpen\`과 \`data\`를 읽어 결정합니다. 훅 쪽은 “**이름과 데이터로 요청**”만 하고, 포탈·닫기 핸들·공통 래퍼는 Manager에 모입니다.`,

  `\`\`\`tsx
// ModalManager.tsx (요지)
export function ModalManager() {
  const { modals, closeModal } = useModalContext();

  return (
    <>
      {modals.MovingModal?.isOpen && (
        <MovingModal
          isOpen={modals.MovingModal.isOpen}
          onClose={() => closeModal("MovingModal")}
          customMessage={modals.MovingModal.data?.customMessage}
          errorCode={modals.MovingModal.data?.errorCode}
        />
      )}
      {modals.ProductDetailModal?.isOpen && (
        <ProductDetailModal
          /* data 기반 props … */
        />
      )}
    </>
  );
}
\`\`\``,

  `---`,

  `## 6) 비동기와 안내: 개선 전후`,

  `**이전(문제)**: \`onArrival\` → \`fetchTopicInfo\` 성공 → \`topicInfoState\`에 설명이 들어감 → \`NewGuideWrap\`의 \`useEffect\`가 \`description !== ''\`를 보고 \`productDetailModal.open\`. API가 실패하면 **상태가 안 채워지므로** 모달 경로가 **끊깁니다**.`,

  `**이후(방향)**: 도착(또는 정책이 정한 시점)에서 **안내용 모달을 먼저** 전역 \`useModal\` API로 열고, **성공 시** 상세 데이터로 채우며, **실패 시** fallback 문구(또는 토스트 병행)로 **같은 모달 경로**를 유지합니다. **열림·닫힘**은 **이벤트·정책**이, **채워질 문구**는 **API 응답**이 담당하도록 **역할을 나누었습니다**.`,

  `참고로 \`onTourPointArrival\`처럼 콜백에서 \`productDetailModal.open\`을 직접 부르는 경로는 남을 수 있지만, **open/close의 주소**는 \`useModal\` 하나로 통일했고, \`GOTO\` 오류·타이머 \`isAnyModalOpen\` 같은 **교차 정책**도 \`closeAllModals\`·selector와 함께 **한 틀**에서 다루기 쉬워졌습니다.`,

  `---`,

  `## 7) 정리`,

  `문제는 “API 에러 핸들링이 부족하다”만이 아니라, **다음 단계 UI가 비동기 성공에 묶인 설계**였다는 점이었습니다. \`ModalProvider\` / \`ModalManager\` / \`useModal\`로 **제어권을 전역 UI 흐름으로** 올리고, 데이터 fetch는 **내용**에만 쓰면, 지연·장애에서도 **끊기지 않는 안내**에 가까운 동작을 기대할 수 있습니다.`,
].join("\n\n");
