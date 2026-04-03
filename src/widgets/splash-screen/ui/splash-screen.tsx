"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

import { SourceFieldCanvas } from "./source-field-canvas";
import { staggerContainer, staggerItem } from "@/shared/lib/motion";
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
  const { isDark, isReady } = useResolvedTheme();

  const buttonAsset = isReady && isDark ? darkBtn : lightBtn;
  const buttonBgUrl =
    typeof buttonAsset === "string" ? buttonAsset : buttonAsset.src;

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
        // className="pointer-events-auto absolute inset-0 h-full w-full touch-none"
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
          variants={staggerItem} 
          ref={enterButtonRef}
          type="button"
          // className="pointer-events-auto mb-10 px-4 py-6 text-[14px] font-bold text-logo-color"
          className="mb-10 px-4 py-6 text-[14px] font-bold text-logo-color"
          onMouseEnter={syncAttractToButtonCenter}
          onMouseMove={syncAttractToButtonCenter}
          onMouseLeave={clearAttract}
          onTouchStart={syncAttractToTouchPoint}
          // onTouchMove={syncAttractToTouchPoint}
          onTouchEnd={clearAttract}
          onTouchCancel={clearAttract}
          onClick={onEnter}
          transition={{ delay: 0.55 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{
            backgroundImage: `url(${buttonBgUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          Enter portfolio
        </motion.button>
      </motion.div>
    </div>
  );
}
