export const DESIGN_SYSTEM_TAILWIND_TOKENS_SHARED_COMPONENTS_MARKDOWN = [
  `> **한 줄 요약**  
>  
> 화면마다 직접 작성하던 색상, 반응형 기준, 타이포그래피, 쉐도우, 라운드 값을 Tailwind 설정으로 모으고, Button·Input·Select·Modal 같은 반복 UI를 공통 컴포넌트로 분리했습니다. 특히 Modal은 Portal 기반으로 통일해 backdrop, 스크롤 잠금, z-index, 레이아웃 규칙을 한곳에서 관리하도록 정리했습니다.`,

  `---`,

  `## 1) 무엇이 문제였는지`,

  `프로젝트 초반에는 화면별로 필요한 UI를 빠르게 구현하는 방식이 효율적이었습니다. 버튼, 인풋, 셀렉트, 모달 같은 요소도 각 화면의 요구사항에 맞춰 직접 마크업과 스타일을 작성하면 기능 구현 속도를 빠르게 가져갈 수 있었습니다.`,

  `하지만 화면이 늘어나면서 같은 역할의 UI가 조금씩 다른 형태로 구현될 가능성이 커졌습니다. 예를 들어 버튼의 높이, 색상, disabled 상태, loading 상태가 화면마다 다르게 처리되면 사용자는 같은 제품 안에서도 일관되지 않은 UI를 보게 됩니다.`,

  `스타일 값도 마찬가지였습니다. 색상, 폰트 크기, 브레이크포인트, 그림자, border-radius 같은 값이 화면마다 직접 작성되면 수정 기준이 분산됩니다. 특정 primary 색상이나 모바일 기준을 바꿔야 할 때, 어떤 화면에서 어떤 값을 사용했는지 모두 찾아야 합니다.`,

  `반응형 기준은 특히 공통화가 필요했습니다. 어떤 화면은 \`768px\`을 태블릿 기준으로 보고, 다른 화면은 다른 값을 사용한다면 같은 디바이스에서도 레이아웃 전환 시점이 달라질 수 있습니다. 폰트 크기나 쉐도우, 라운드 값도 공통 기준 없이 사용하면 화면마다 완성도가 다르게 보일 수 있습니다.`,

  `모달은 더 주의가 필요했습니다. 모달은 단순한 박스가 아니라 화면 위에 떠야 하는 전역 레이어입니다. 각 화면에서 모달을 직접 렌더링하면 z-index, backdrop, 스크롤 잠금, 중앙 정렬, 열림 상태 처리 같은 규칙이 화면마다 달라질 수 있습니다.`,

  `따라서 화면별 구현을 계속 늘리기보다, 디자인 토큰과 공통 컴포넌트를 먼저 정리하고 반복되는 UI와 전역 레이어 규칙을 한곳에서 관리할 필요가 있었습니다.`,

  `---`,

  `## 2) 설계로 고른 기준`,

  `먼저 색상, 브레이크포인트, 타이포그래피, 쉐도우, 라운드 값을 Tailwind 설정으로 통합했습니다. 이 값들은 특정 화면에만 필요한 스타일이 아니라 제품 전체에서 반복해서 쓰이는 디자인 기준이기 때문입니다.`,

  `이렇게 하면 화면에서는 \`#4262ff\` 같은 실제 색상값이나 \`0 2px 14px ...\` 같은 쉐도우 값을 직접 알 필요가 없습니다. 대신 정해진 이름의 유틸리티 클래스를 사용하면 됩니다. 디자인 값이 바뀌어도 Tailwind 설정을 수정하면 같은 토큰을 사용하는 화면에 일관되게 반영할 수 있습니다.`,

  `브레이크포인트도 같은 이유로 공통화했습니다. \`desktop\`, \`laptop\`, \`tablet\`, \`mobile\` 같은 기준을 Tailwind \`screens\`에 정의해두면, 각 화면은 같은 기준으로 레이아웃을 전환할 수 있습니다.`,

  `다음으로 Button, Input, Select 같은 반복 UI를 공통 컴포넌트로 분리했습니다. 이 컴포넌트들은 여러 화면에서 반복되지만, 매번 새로 구현할 필요는 없습니다. 공통 컴포넌트로 만들면 disabled, loading, className 확장, ref 전달 같은 기본 동작을 한곳에서 관리할 수 있습니다.`,

  `모달은 Portal 기반으로 통일했습니다. 모달은 현재 화면의 DOM 구조 안에 갇히기보다, 정해진 루트 노드에 렌더링되는 전역 레이어로 다루는 편이 안정적입니다. 그래서 Modal과 Backdrop을 각각 Portal로 렌더링하고, backdrop 클릭, 스크롤 잠금, show 상태, centered 상태 같은 공통 동작을 한곳에서 처리했습니다.`,

  `정리하면 Tailwind 설정은 디자인 기준을 담당하고, 공통 컴포넌트는 반복 UI의 구조와 상태 처리를 담당하며, Portal 기반 Modal은 전역 레이어와 배경 제어를 담당하도록 역할을 나눴습니다.`,

  `---`,

  `## 3) Tailwind 설정에 디자인 토큰을 모았습니다`,

  `색상, 브레이크포인트, 폰트, 쉐도우, 라운드 값을 Tailwind 설정에 등록했습니다. 화면에서는 실제 값을 직접 쓰기보다, 프로젝트에서 정한 이름의 토큰을 사용하도록 했습니다.`,

  `\`\`\`js
// tailwind.config.js (요지)
theme: {
  fontFamily: {
    display: ["var(--font-display)"],
    body: ["var(--font-body)"],
  },
  extend: {
    screens: {
      desktop: { max: "1920px" },
      "desktop-sm": { max: "1680px" },
      laptop: { max: "1280px" },
      "laptop-sm": { max: "1024px" },
      tablet: { max: "768px" },
      mobile: { max: "450px" },
      "mobile-sm": { max: "375px" },
      xl: "1440px",
      "2xl": "1780px",
      "3xl": "1850px",
    },
    fontSize: {
      "4xl": "3.0rem",
      "5xl": "6.0rem",
      inherit: "inherit",
    },
  },
}
\`\`\``,

  `컬러, 쉐도우, 라운드 값도 같은 기준으로 확장했습니다.`,

  `\`\`\`js
// tailwind.config.js (요지)
extend: {
  colors: {
    blue: "#4262ff",
    orange: "#fd8a17",
    red: "#ff4d4d",
    default: "#222",
    lightGray: "#f2f5f9",
    inputTextbg: "#f2f3f8",
    // [중략] primary / border / shadow 팔레트
  },
  boxShadow: {
    "secThree-shadow": "0 2px 14px 0 rgba(18, 44, 72, 0.15)",
    "case-study-card": "0 2px 14px 0 rgba(18, 44, 72, 0.4)",
    // [중략]
  },
  borderRadius: {
    "4xl": "2rem",
    small: "0.188rem",
    medium: "0.375rem",
    large: "0.625rem",
  },
}
\`\`\``,

  `이렇게 하면 스타일 값이 컴포넌트 안에 흩어지지 않고, Tailwind 설정을 통해 같은 이름과 기준으로 재사용됩니다.`,

  `---`,

  `## 4) Button, Input, Select를 공통 컴포넌트로 분리했습니다`,

  `반복해서 쓰이는 UI는 공통 컴포넌트로 분리했습니다. Button은 loading, disabled, ref 전달, className 확장을 기본으로 지원하도록 했습니다.`,

  `\`\`\`tsx
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      name,
      disabled = false,
      children,
      type,
      loading,
      className,
      onClick,
    } = props;

    const CLASSES = \`btn \${className}\`;

    return (
      <button
        name={name}
        type={type}
        disabled={disabled || loading}
        className={CLASSES}
        onClick={onClick}
        ref={ref}
      >
        {loading && null /* spinner [중략] */}
        {children}
      </button>
    );
  }
);
\`\`\``,

  `Input도 기본 class와 ref 전달을 공통화했습니다. 화면에서는 필요한 id, placeholder, disabled 같은 값만 넘기면 됩니다.`,

  `\`\`\`tsx
export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, type = "text", id, className, value, placeholder, ...args }, ref) => {
    return (
      <input
        id={id}
        ref={ref}
        type={type}
        className={\`form-control \${className ? className : ""}\`}
        defaultValue={value}
        disabled={disabled}
        placeholder={placeholder}
        {...args}
      />
    );
  }
);
\`\`\``,

  `Select는 선택된 라벨과 목록 열림 상태를 컴포넌트 내부에서 관리했습니다. 이렇게 하면 각 화면에서 직접 select 열림/닫힘 클래스를 반복해서 작성하지 않아도 됩니다.`,

  `\`\`\`tsx
const Select = forwardRef<HTMLDivElement, SelectProps>((props) => {
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>("");
  const [isSelectHide, setIsSelectHide] = useState("select-hide");

  const handleSelectList = () => {
    if (isSelectHide === "select-hide") {
      setIsSelectHide("");
      // [중략] active class 부여
    } else {
      setIsSelectHide("select-hide");
      // [중략]
    }
  };

  // [중략]
});
\`\`\``,

  `이 구조를 통해 반복 UI의 기본 동작과 스타일 규칙을 한곳에서 관리할 수 있었습니다.`,

  `---`,

  `## 5) Modal은 Portal 기반 전역 레이어로 통일했습니다`,

  `Modal은 특정 화면 내부에 묶이지 않고, 정해진 DOM 노드에 Portal로 렌더링되도록 했습니다. 이렇게 하면 부모 컴포넌트의 레이아웃이나 stacking context 영향을 줄이고, 모달 레이어를 일관되게 관리할 수 있습니다.`,

  `\`\`\`tsx
function Modal(props: ModalProps & PropsWithChildren) {
  return ReactDOM.createPortal(
    <div
      className={\`modal overflow-y-auto \${props.className} \${props.isShow ? "show" : ""} \${props.centered ? "centered" : ""}\`}
    >
      <div className="modal-dialog">
        <div
          className={twMerge(
            "modal-content flex justify-center w-full",
            props.contentClassName
          )}
        >
          {props.children}
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
}
\`\`\``,

  `Backdrop도 Portal로 분리했습니다. 모달이 열릴 때 body scroll을 잠그고, 닫힐 때 원래 상태로 되돌리도록 처리했습니다.`,

  `\`\`\`tsx
function Backdrop(props: BackdropProps) {
  useEffect(() => {
    if (!props.isShow) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [props.isShow]);

  return ReactDOM.createPortal(
    <div
      className={
        props.isShow
          ? \`backdrop !block \${props.className}\`
          : "invisible-and-take-no-space"
      }
      onClick={props.onClick}
    />,
    document.getElementById("backdrop") as Element
  );
}
\`\`\``,

  `Modal과 Backdrop을 분리하면서 콘텐츠 레이어와 배경 레이어의 책임도 나눌 수 있었습니다. 모달 내용은 Modal이 담당하고, 배경 클릭과 스크롤 잠금은 Backdrop이 담당합니다.`,

  `---`,

  `## 6) Modal 스타일 규칙을 한곳에 정리했습니다`,

  `모달의 표시 상태, 위치, 크기, 중앙 정렬 규칙은 공통 SCSS에 모았습니다. \`show\`, \`centered\` 같은 상태 class를 기준으로 visibility, opacity, 위치를 제어했습니다.`,

  `\`\`\`scss
.modal {
  @apply invisible w-2/3 opacity-0 fixed top-[5%] left-1/2 tablet:w-[90%];

  &.show {
    z-index: 10000;
    @apply visible opacity-100;

    > .modal-dialog {
      @apply mt-16;
    }

    &.centered {
      @apply top-[30%];
    }
  }

  .modal-dialog {
    @apply -mt-16 mb-16 mx-auto;

    .modal-content {
      @apply relative;
      // [중략]
    }
  }
}
\`\`\``,

  `이렇게 하면 모달을 사용하는 화면마다 z-index, 위치, 너비, 중앙 정렬 규칙을 다시 정의하지 않아도 됩니다.`,

  `---`,

  `## 7) 정리`,

  `디자인 시스템을 구축한다는 것은 단순히 예쁜 컴포넌트를 만드는 일이 아니었습니다. 제품 전체에서 반복되는 스타일 값과 UI 동작을 한곳으로 모아, 화면마다 다른 기준이 생기지 않도록 만드는 일이었습니다.`,

  `Tailwind 설정에는 색상, 브레이크포인트, 타이포그래피, 쉐도우, 라운드 값을 통합했고, Button, Input, Select는 반복 UI의 기본 동작을 공통화했습니다. Modal은 Portal 기반으로 통일해 backdrop, 스크롤 잠금, z-index, 레이아웃 규칙을 한곳에서 처리했습니다.`,

  `그 결과 화면별 코드는 세부 스타일 구현보다 화면의 역할에 집중할 수 있었고, 디자인 값이나 인터랙션 규칙이 바뀌었을 때 수정 범위도 줄일 수 있었습니다.`,
].join("\n\n");
