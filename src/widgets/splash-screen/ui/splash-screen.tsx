"use client";

import { useRef } from "react";

import { SourceFieldCanvas } from "./source-field-canvas";

type SplashScreenProps = {
  onEnter: () => void;
};

export function SplashScreen({ onEnter }: SplashScreenProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const attractPointRef = useRef<{ x: number; y: number } | null>(null);

  const syncAttractToButtonCenter = () => {
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
        className="pointer-events-auto absolute inset-0 h-full w-full touch-none"
      />

      <div
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
        style={{ pointerEvents: "none" }}
      >
        <p className="font-mono text-sm text-logo-color md:text-base">
          Jiu&apos;s Portfolio
        </p>
        <button
          ref={enterButtonRef}
          type="button"
          onClick={onEnter}
          onMouseEnter={syncAttractToButtonCenter}
          onMouseMove={syncAttractToButtonCenter}
          onMouseLeave={clearAttract}
          className="pointer-events-auto rounded-full border border-primary/40 bg-background/80 px-10 py-3 text-sm font-medium text-primary shadow-[0_0_24px_rgba(158,5,255,0.15)] backdrop-blur-md transition hover:border-primary hover:bg-background/90 hover:shadow-[0_0_32px_rgba(158,5,255,0.22)] dark:shadow-[0_0_24px_rgba(88,187,246,0.12)] dark:hover:shadow-[0_0_32px_rgba(88,187,246,0.18)]"
        >
          Enter portfolio
        </button>
      </div>
    </div>
  );
}
