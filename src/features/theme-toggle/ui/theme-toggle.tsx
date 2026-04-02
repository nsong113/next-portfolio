"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isReady = resolvedTheme === "dark" || resolvedTheme === "light";
  const isDark = resolvedTheme === "dark";

  useEffect(() => {}, []);

  if (!isReady) {
    return (
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-sm text-muted-foreground"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-logo-color text-xl text-[#26293d] shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-[0_4px_20px_rgba(4,201,191,0.38)] dark:hover:shadow-[0_4px_28px_rgba(249,123,253,0.42)] active:scale-[0.97] active:brightness-100"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
