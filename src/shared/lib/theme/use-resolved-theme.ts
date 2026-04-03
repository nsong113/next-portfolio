"use client";

import { useTheme } from "next-themes";

export type ResolvedTheme = "light" | "dark";

//현재 테마를 가져오되, 아직 준비 안 된 상태도 구분해서 light/dark 여부를 쉽게 쓰게 해주는 훅

export function useResolvedTheme(): {
  theme: ResolvedTheme | null;
  isReady: boolean;
  isDark: boolean;
  isLight: boolean;
} {
  const { resolvedTheme } = useTheme(); //사용자 시스템 설정 값

  const isReady = resolvedTheme === "light" || resolvedTheme === "dark"; //준비 완료 여부(ui 분기 가능 시점)
  const theme = isReady ? (resolvedTheme as ResolvedTheme) : null;

  return {
    theme,
    isReady,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}
