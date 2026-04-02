"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const DOT_PX = 20;
const CURSOR_LIGHT = "#04c9bf";
const CURSOR_DARK = "#f97bfd";

const TRAIL_MAX_AGE_MS = 520;
const TRAIL_MAX_AGE_REDUCED_MS = 180;
const TRAIL_MIN_INTERVAL_MS = 38;
const TRAIL_MIN_DIST_PX = 7;

type TrailPoint = { id: number; x: number; y: number; t: number };

function CursorDot({ color, opacity = 1 }: { color: string; opacity?: number }) {
  return (
    <div
      className="shrink-0 rounded-full"
      style={{
        width: DOT_PX,
        height: DOT_PX,
        opacity,
       
        background: `radial-gradient(circle at 50% 50%,
          color-mix(in srgb, ${color} 90%, rgb(255 250 245)) 0%,
          color-mix(in srgb, ${color} 52%, rgb(255 248 242)) 38%,
          color-mix(in srgb, ${color} 22%, rgb(230 236 255 / 0.35)) 68%,
          transparent 88%)`,
        boxShadow: `
          0 0 10px 1px color-mix(in srgb, ${color} 58%, rgb(180 205 255)),
          0 0 22px 4px color-mix(in srgb, ${color} 32%, transparent)
        `,
      }}
      aria-hidden
    />
  );
}

/** Trail **/
function TrailGlow({ color, opacity }: { color: string; opacity: number }) {
  return (
    <div
      className="rounded-full bg-transparent"
      style={{
        width: 1,
        height: 1,
        opacity,
        boxShadow: `
          0 0 12px 9px color-mix(in srgb, ${color} 38%, transparent),
          0 0 26px 16px color-mix(in srgb, ${color} 20%, transparent),
          0 0 40px 22px color-mix(in srgb, ${color} 9%, transparent)
        `,
      }}
      aria-hidden
    />
  );
}

export function CustomCursor() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [finePointer, setFinePointer] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [clock, setClock] = useState(() => Date.now());
  const trailIdRef = useRef(0);
  const lastSampleRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const trailRef = useRef<TrailPoint[]>([]);

  const color = resolvedTheme === "light" ? CURSOR_LIGHT : CURSOR_DARK;
  const maxAge = reduceMotion ? TRAIL_MAX_AGE_REDUCED_MS : TRAIL_MAX_AGE_MS;

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setFinePointer(mqFine.matches);
      setReduceMotion(mqReduce.matches);
    };
    sync();
    mqFine.addEventListener("change", sync);
    mqReduce.addEventListener("change", sync);
    return () => {
      mqFine.removeEventListener("change", sync);
      mqReduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !finePointer) return;
    document.documentElement.classList.add("custom-cursor-active");
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mounted, finePointer]);

  useEffect(() => {
    if (!mounted || !finePointer) return;

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      setClock(now);
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });
      setVisible(true);
      const last = lastSampleRef.current;
      if (!last) {
        lastSampleRef.current = { x, y, t: now };
        return;
      }

      const dist = Math.hypot(x - last.x, y - last.y);
      const dt = now - last.t;
      if (dt < TRAIL_MIN_INTERVAL_MS && dist < TRAIL_MIN_DIST_PX) {
        return;
      }

      trailIdRef.current += 1;
      const ghost: TrailPoint = {
        id: trailIdRef.current,
        x: last.x,
        y: last.y,
        t: now,
      };
      trailRef.current = [
        ...trailRef.current.filter((p) => now - p.t < maxAge),
        ghost,
      ];
      setTrail(trailRef.current);
      lastSampleRef.current = { x, y, t: now };
    };

    const onLeave = () => {
      setVisible(false);
      lastSampleRef.current = null;
      trailRef.current = [];
      setTrail([]);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [mounted, finePointer, maxAge]);

  useEffect(() => {
    if (!mounted || !finePointer || trail.length === 0) return;

    let raf = 0;
    const loop = () => {
      const now = Date.now();
      setClock(now);
      const next = trailRef.current.filter((p) => now - p.t < maxAge);
      if (next.length !== trailRef.current.length) {
        trailRef.current = next;
        setTrail(next);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mounted, finePointer, trail.length, maxAge]);

  if (!mounted || !finePointer) return null;

  const now = clock;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-2147483646 overflow-hidden"
      aria-hidden
    >
      {trail.map((p) => {
        const age = now - p.t;
        const fade = Math.max(0, 1 - age / maxAge);
        if (fade <= 0) return null;
        return (
          <div
            key={p.id}
            className="absolute left-0 top-0 will-change-transform"
            style={{
              transform: `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`,
              opacity: fade * 0.62,
            }}
          >
            <TrailGlow color={color} opacity={1} />
          </div>
        );
      })}
      {visible ? (
        <div
          className="absolute left-0 top-0 will-change-transform"
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          }}
        >
          <CursorDot color={color} />
        </div>
      ) : null}
    </div>
  );
}
