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
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-sm text-foreground transition-colors hover:bg-background"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
