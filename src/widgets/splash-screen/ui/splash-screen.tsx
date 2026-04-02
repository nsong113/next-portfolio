"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

import { SourceFieldCanvas } from "./source-field-canvas";
import { staggerContainer, staggerItem } from "@/shared/lib/motion";
import { useResolvedTheme } from "@/shared/lib/theme/use-resolved-theme";

import darkBtn from "@/shared/assets/ico/darkBtn.svg";
import lightBtn from "@/shared/assets/ico/lightBtn.svg";

type SplashScreenProps = {
  onEnter: () => void;
};

export function SplashScreen({ onEnter }: SplashScreenProps) {
  const { isDark } = useResolvedTheme();
 
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const buttonAsset = isClient && isDark ? darkBtn : lightBtn;
  const buttonBgUrl =
    typeof buttonAsset === "string" ? buttonAsset : buttonAsset.src;

  const shellRef = useRef<HTMLDivElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const attractPointRef = useRef<{ x: number; y: number } | null>(null);
  const releaseClusterRef = useRef(false);

  const syncAttractToButtonCenter = () => {
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

  const clearAttract = () => {
    attractPointRef.current = null;
  };

  return (
    <div
      ref={shellRef}
      className="fixed inset-0 z-5 flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#262840]"
    >
      <SourceFieldCanvas
        attractPointRef={attractPointRef}
        releaseClusterRef={releaseClusterRef}
        className="pointer-events-auto absolute inset-0 h-full w-full touch-none"
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
          className="pointer-events-auto mb-10 px-4 py-6 text-[14px] font-bold text-logo-color"
          onMouseEnter={syncAttractToButtonCenter}
          onMouseMove={syncAttractToButtonCenter}
          onMouseLeave={clearAttract}
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
