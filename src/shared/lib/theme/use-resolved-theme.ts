"use client";

import { useTheme } from "next-themes";

export type ResolvedTheme = "light" | "dark";

export function useResolvedTheme(): {
  theme: ResolvedTheme | null;
  isReady: boolean;
  isDark: boolean;
  isLight: boolean;
} {
  const { resolvedTheme } = useTheme();

  const isReady = resolvedTheme === "light" || resolvedTheme === "dark";
  const theme = isReady ? (resolvedTheme as ResolvedTheme) : null;

  return {
    theme,
    isReady,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}

