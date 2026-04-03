"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SplashGateContextValue = {
  splashDismissed: boolean; // 스플래시 화면 닫힘 여부
  dismissSplash: () => void; 
};

const SplashGateContext = createContext<SplashGateContextValue | null>(null);

export function SplashGateProvider({ children }: { children: ReactNode }) {
  const [splashDismissed, setSplashDismissed] = useState<boolean>(false);
  const dismissSplash = useCallback(() => setSplashDismissed(true), []);

  const value = useMemo(
    () => ({ splashDismissed, dismissSplash }),
    [splashDismissed, dismissSplash],
  );

  return (
    <SplashGateContext.Provider value={value}>
      {children}
    </SplashGateContext.Provider>
  );
}

export function useSplashGate() {
  const context = useContext(SplashGateContext);
  if (!context) {
    throw new Error("useSplashGate must be used within SplashGateProvider");
  }
  return context;
}
