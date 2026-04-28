export const I18N_GLOBAL_LANGUAGE_UI_STRUCTURE_MARKDOWN = [
  `> **한 줄 요약**  
>  
> 글로벌 대응을 위해 UI 코드 안에 직접 들어가 있던 텍스트를 \`react-i18next\`와 JSON 리소스로 분리했습니다. 영어/독일어 번역 파일은 화면·기능 단위의 **namespace**로 나누고, 사용자가 선택한 언어는 Recoil 전역 상태와 \`recoil-persist\`로 저장해 새로고침 이후에도 유지되도록 정리했습니다.`,

  `---`,

  `## 1) 무엇이 문제였는지`,

  `처음에는 컴포넌트 안에 버튼 문구, 섹션 제목, 모달 안내 문구를 직접 작성해도 큰 문제가 없어 보였습니다. 화면에서 필요한 텍스트를 바로 렌더링하면 구현은 빠르고 단순했습니다.`,

  `하지만 영어와 독일어를 함께 지원해야 하는 상황에서는 이 방식이 유지보수에 불리했습니다. 언어가 추가되거나 번역이 수정될 때마다 컴포넌트 코드를 직접 찾아가야 했고, 같은 버튼 문구가 여러 화면에 반복되면 어느 위치의 텍스트를 바꿔야 하는지도 불명확해질 수 있었습니다.`,

  `특히 버튼, 섹션, 모달처럼 성격이 다른 텍스트가 한곳에 섞이면 번역 리소스의 책임도 흐려집니다. 예를 들어 버튼 문구만 수정하고 싶은데 화면 전체 리소스를 뒤져야 하거나, 특정 섹션의 문장을 바꾸기 위해 컴포넌트 구조까지 함께 확인해야 하는 상황이 생길 수 있었습니다.`,

  `또 하나의 문제는 사용자의 언어 선택 상태였습니다. 사용자가 독일어를 선택했는데 새로고침 후 다시 기본 언어로 돌아간다면, 다국어 기능은 일관된 사용자 경험을 제공하지 못합니다. 언어 선택은 특정 컴포넌트의 임시 상태가 아니라 앱 전체에서 공유되고 유지되어야 하는 값이었습니다.`,

  `따라서 UI 구조와 텍스트 리소스를 분리하고, 사용자가 선택한 언어를 전역에서 관리하며, 새로고침 이후에도 같은 언어가 유지되는 구조가 필요했습니다.`,

  `---`,

  `## 2) 설계로 고른 기준`,

  `먼저 번역 처리는 \`react-i18next\`를 사용하고, 실제 문구는 언어별 JSON 파일로 분리했습니다. 컴포넌트는 더 이상 문장을 직접 들고 있지 않고, \`t()\` 함수로 필요한 key만 참조하도록 했습니다. 이렇게 하면 UI 구조는 유지한 채 텍스트만 언어 리소스에서 교체할 수 있습니다.`,

  `번역 리소스는 하나의 큰 파일로 두지 않고 namespace 단위로 나눴습니다. 버튼 문구는 \`button\`, 문의 화면은 \`contactUs\`, 모달 문구는 \`modal\`, 첫 번째 섹션은 \`sectionFirst\`처럼 화면이나 기능 단위로 분리했습니다. 이렇게 나누면 특정 영역의 문구를 수정할 때 해당 JSON만 확인하면 됩니다.`,

  `언어 선택 상태는 Recoil atom으로 전역 관리했습니다. 언어는 앱 전체 렌더링에 영향을 주는 값이기 때문에 특정 드롭다운 컴포넌트 내부 상태로만 두기에는 적합하지 않았습니다. 여기에 \`recoil-persist\`를 연결해 사용자가 선택한 언어가 새로고침 이후에도 유지되도록 했습니다.`,

  `마지막으로 앱 진입점에서 Recoil에 저장된 언어 값과 i18next의 실제 언어를 동기화했습니다. 사용자가 언어를 선택하면 Recoil 상태를 갱신하고, \`i18n.changeLanguage()\`를 호출해 화면에도 즉시 반영했습니다.`,

  `정리하면 컴포넌트는 화면 구조를 담당하고, JSON 리소스는 텍스트를 담당하며, Recoil은 사용자의 언어 선택 상태를 담당하도록 역할을 나눴습니다.`,

  `---`,

  `## 3) i18n 초기화: 영어/독일어 리소스 주입`,

  `\`src/locale/i18next.ts\`에서 \`i18next\`와 \`initReactI18next\`를 연결하고, 영어와 독일어 리소스를 주입했습니다. 기본 언어는 영어로 두고, fallback 언어도 함께 설정했습니다.`,

  `\`\`\`ts
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./en/index";
import translationGer from "./ger/index";

const resources = {
  ger: translationGer,
  en: translationEn,
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: ["en", "ger"],
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = i18next.language;

export default i18next;
\`\`\``,

  `이 설정을 통해 앱 전체에서 \`useTranslation\`으로 동일한 번역 리소스에 접근할 수 있게 했습니다.`,

  `---`,

  `## 4) 번역 리소스는 namespace 단위로 분리`,

  `언어별 폴더 안에는 \`button.json\`, \`contactUs.json\`, \`modal.json\`, \`section_first.json\`처럼 기능이나 화면 단위의 JSON 파일을 두었습니다. 그리고 각 언어의 \`index.ts\`에서 이를 namespace 객체로 묶었습니다.`,

  `\`\`\`ts
import button from "./button.json";
import contactUs from "./contactUs.json";
import modal from "./modal.json";
import sectionFirst from "./section_first.json";

const translationEn = {
  button,
  contactUs,
  sectionFirst,
  modal,
};

export default translationEn;
\`\`\``,

  `실제 JSON은 key-value 형태로 관리했습니다. 컴포넌트는 문장 자체가 아니라 key를 참조하고, 언어별 파일에서 실제 문구를 제공합니다.`,

  `\`\`\`json
{
  "Learn_more": "Learn more",
  "Send": "Send",
  "downloadPDF": "Download PDF"
}
\`\`\``,

  `이렇게 구성하면 언어를 추가할 때는 \`src/locale/<newLang>\` 폴더와 해당 \`index.ts\`를 추가하면 되고, 특정 화면의 문구를 수정할 때는 관련 namespace JSON만 수정하면 됩니다.`,

  `---`,

  `## 5) 컴포넌트에서는 필요한 namespace만 사용`,

  `컴포넌트에서는 \`useTranslation\`으로 필요한 namespace만 가져왔습니다. 예를 들어 첫 번째 섹션에서는 섹션 전용 문구와 공통 버튼 문구가 필요했기 때문에 \`sectionFirst\`, \`button\` namespace를 함께 사용했습니다.`,

  `\`\`\`tsx
const SectionFirst = () => {
  const { t } = useTranslation(["sectionFirst", "button"]);

  return (
    <>
      <h2>{t("sectionFirst:maum-TOUCH")}</h2>
      <p>{t("sectionFirst:Barrier-free_kiosks")}</p>
      <button>{t("button:Learn_more")}</button>
    </>
  );
};
\`\`\``,

  `이 구조에서는 UI 컴포넌트가 문구를 직접 소유하지 않습니다. 컴포넌트는 어떤 key를 사용할지만 알고, 실제 텍스트는 언어별 JSON 리소스가 담당합니다.`,

  `---`,

  `## 6) 언어 선택 상태는 Recoil과 recoil-persist로 유지`,

  `사용자가 선택한 언어는 Recoil atom으로 관리했습니다. 여기에 \`recoil-persist\`의 \`persistAtom\`을 연결해 새로고침 이후에도 선택 언어가 유지되도록 했습니다.`,

  `\`\`\`ts
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const language = atom<string | undefined>({
  key: "language",
  default: "ENG",
  effects_UNSTABLE: [persistAtom],
});

export { language };
\`\`\``,

  `언어 선택은 특정 화면의 임시 상태가 아니라 앱 전체의 표시 언어를 결정하는 값입니다. 그래서 전역 상태로 관리하고, 브라우저를 새로고침해도 선택한 언어가 유지되도록 했습니다.`,

  `---`,

  `## 7) App 레벨에서 i18next와 전역 상태를 동기화`,

  `앱 진입점에서는 Recoil에 저장된 언어 값을 읽고, 해당 값에 맞춰 \`i18n.changeLanguage()\`를 호출했습니다. 이렇게 하면 저장된 언어 상태와 i18next의 실제 렌더링 언어가 맞춰집니다.`,

  `\`\`\`tsx
function App() {
  const selectLang = useRecoilValue(language);

  useEffect(() => {
    switch (selectLang) {
      case "ENG":
        i18n.changeLanguage("en");
        break;
      case "GER":
        i18n.changeLanguage("ger");
        break;
      default:
        break;
    }
  }, [selectLang]);

  // [중략]
}
\`\`\``,

  `이 동기화가 있기 때문에 사용자가 이전에 선택한 언어가 persist 상태에서 복원되면, 앱 진입 시점에도 같은 언어가 다시 적용됩니다.`,

  `---`,

  `## 8) 언어 선택 UI와 연결`,

  `언어 선택 컴포넌트에서는 Recoil 상태를 갱신하고, 동시에 \`i18n.changeLanguage()\`를 호출했습니다. 상태 저장과 즉시 반영을 함께 처리한 것입니다.`,

  `\`\`\`tsx
function LangSelect(props: LangSelectProps) {
  const [selectLang, setSelectLang] = useRecoilState(language);

  const changeLangEvent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const currentLangValue = e.currentTarget.dataset.value;
    const currentLangLabel = e.currentTarget.dataset.label;

    transSetState(() => {
      setSelectLang(currentLangLabel);
      i18n.changeLanguage(currentLangValue);
    });
  };

  // [중략]
}
\`\`\``,

  `이 흐름에서는 사용자가 언어를 바꾸는 즉시 화면이 변경되고, 선택 값도 전역 상태에 저장됩니다. 따라서 새로고침 후에도 같은 언어를 유지할 수 있습니다.`,

  `---`,

  `## 9) 정리`,

  `다국어 UI에서 중요한 것은 단순히 문장을 번역하는 것이 아니라, UI 구조와 텍스트 리소스의 책임을 분리하는 것이었습니다. 컴포넌트는 화면 구조와 key 참조만 담당하고, 실제 문구는 언어별 JSON 리소스에서 관리하도록 나눴습니다.`,

  `또한 번역 리소스를 namespace 단위로 분리해 버튼, 섹션, 모달처럼 성격이 다른 문구를 독립적으로 관리했습니다. 사용자의 언어 선택은 Recoil 전역 상태와 \`recoil-persist\`로 유지하고, App 레벨에서 i18next와 동기화했습니다.`,

  `이 구조 덕분에 언어 추가, 번역 수정, UI 변경이 서로 덜 영향을 주게 되었고, 새로고침 이후에도 사용자가 선택한 언어를 유지할 수 있었습니다.`,
].join("\n\n");
