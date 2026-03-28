import { create } from "zustand";

type UiState = {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
};

/** 포트폴리오 전역 UI (모바일 메뉴 등). 테마는 `next-themes` 사용. */
export const useUiStore = create<UiState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
}));
