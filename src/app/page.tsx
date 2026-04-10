"use client";

import { useRouter } from "next/navigation";

import { SplashScreen } from "@/widgets/splash-screen";

/** 루트 `/`는 스플래시만 — 진입 시 `/home`으로 이동 */
export default function SplashRoute() {
  const router = useRouter();

  return (
    <SplashScreen
      onEnter={() => {
        router.push("/home");
      }}
    />
  );
}
