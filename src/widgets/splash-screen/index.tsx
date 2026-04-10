"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

import { SourceFieldCanvas } from "./ui/source-field-canvas";
import { staggerContainer, staggerItem } from "@/shared/lib/motion";
import { staticImportUrl } from "@/shared/lib/static-import-url";
import { useResolvedTheme } from "@/shared/lib/theme/use-resolved-theme";

import darkBtn from "@/shared/assets/ico/darkBtn.svg";
import lightBtn from "@/shared/assets/ico/lightBtn.svg";

type SplashScreenProps = {
  onEnter: () => void;
};

// 테마에 따라 버튼 이미지를 바꾸고, 
// 버튼에 마우스를 올리면 캔버스 입자들이 버튼 중심으로 끌려오게 하며, 
// 클릭하면 포트폴리오 진입 함수를 실행하는 풀스크린 스플래시 화면

export function SplashScreen({ onEnter }: SplashScreenProps) {
  const { isDark } = useResolvedTheme();

  /** SSR·하이드레이션 첫 페인트는 서버와 동일하게 lightBtn → 이후 테마 반영 (next-themes) */
  //setMounted(true) 대용
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  
  const buttonAsset = isClient && isDark ? darkBtn : lightBtn;
  const buttonBgUrl = staticImportUrl(buttonAsset);

  const shellRef = useRef<HTMLDivElement>(null);//전체 스플레시 화면
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const attractPointRef = useRef<{ x: number; y: number } | null>(null);//마우스 커서 위치
  const releaseClusterRef = useRef<boolean>(false);

  const syncAttractToButtonCenter = () => {
    //버튼 중심 좌표 계산
    releaseClusterRef.current = true;
    const shell = shellRef.current;
    const btn = enterButtonRef.current;
    if (!shell || !btn) return;
    const s = shell.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    attractPointRef.current = {
      x: b.left + b.width / 2 - s.left,
      y: b.top + b.height / 2 - s.top,
    };
  };

  const syncAttractToTouchPoint = (e: React.TouchEvent<HTMLButtonElement>) => {
    //터치 위치 좌표 계산
  releaseClusterRef.current = true;

  const shell = shellRef.current;
  if (!shell) return;

  const touch = e.touches[0];
  if (!touch) return;

  const s = shell.getBoundingClientRect();

  attractPointRef.current = {
    x: touch.clientX - s.left,
    y: touch.clientY - s.top,
  };
};

  const clearAttract = () => {
    //마우스 커서 위치 초기화
    attractPointRef.current = null;
  };

  return (
    <div
      ref={shellRef}
      className="fixed inset-0 z-5 flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#26293D]"
    >
      <SourceFieldCanvas
        attractPointRef={attractPointRef}
        releaseClusterRef={releaseClusterRef}
        className="pointer-events-auto absolute inset-0 h-full w-full"
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
        style={{ pointerEvents: "none" }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={staggerItem} className="font-mono text-2xl font-bold text-logo-color">
          Jiu&apos;s Portfolio
        </motion.p>
        <motion.button
          ref={enterButtonRef}
          type="button"
          className="pointer-events-auto mb-10 px-4 py-6 text-[14px] font-bold text-logo-color"
          initial={{ opacity: 0, y: 16 }}
          animate={isClient ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            delay: 0.55,
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseEnter={syncAttractToButtonCenter}
          onMouseMove={syncAttractToButtonCenter}
          onMouseLeave={clearAttract}
          onTouchStart={syncAttractToTouchPoint}
          onTouchEnd={clearAttract}
          onTouchCancel={clearAttract}
          onClick={onEnter}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{
            backgroundImage: `url(${buttonBgUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          View projects
        </motion.button>
      </motion.div>
    </div>
  );
}
