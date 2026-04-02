"use client";

import { useEffect, useRef } from "react";
import {
  createParticles,
  resizeParticles,
  stepParticles,
  type PointerState,
} from "../lib/source-field-simulation";


export type AttractPointRef = {
  current: { x: number; y: number } | null;
};

/** Set `current` to true (e.g. Enter button hover) to leave idle cluster */
export type ReleaseClusterRef = { current: boolean };

type SourceFieldCanvasProps = {
  className?: string;
  particleDensity?: number;
  attractPointRef?: AttractPointRef;
  releaseClusterRef?: ReleaseClusterRef;
};

/** ~500×500 area → radius 250px at viewport center */
const SPLASH_CLUSTER_RADIUS = 250;

function particleCountForSize(w: number, h: number, density: number) {
  const area = w * h;
  const base = Math.round((area / 90000) * density);
  return clampInt(base, 48, 160);
}

function clampInt(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, Math.round(n)));
}

export function SourceFieldCanvas({
  className,
  particleDensity = 42,
  attractPointRef,
  releaseClusterRef,
}: SourceFieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<PointerState>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<ReturnType<typeof createParticles> | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const reducedMotionRef = useRef(false);
  /** Canvas pointer / enter / down — leave central cluster */
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onMq = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onMq);

    const canvas = canvasRef.current;
    if (!canvas) {
      mq.removeEventListener("change", onMq);
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      mq.removeEventListener("change", onMq);
      return;
    }

    const markLeftCluster = () => {
      hasInteractedRef.current = true;
    };

    const setPointerFromEvent = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointerRef.current = { x, y };
      }
    };

    const clearPointer = () => {
      pointerRef.current = null;
    };

    const onPointerDown = (e: PointerEvent) => {
      markLeftCluster();
      setPointerFromEvent(e);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (Math.abs(e.movementX) + Math.abs(e.movementY) > 0.5) {
        markLeftCluster();
      }
      setPointerFromEvent(e);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", clearPointer);
    canvas.addEventListener("pointercancel", clearPointer);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const prev = sizeRef.current;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!particlesRef.current || prev.w === 0) {
        const n = particleCountForSize(w, h, particleDensity);
        particlesRef.current = createParticles(w, h, n, {
          clusterRadius: SPLASH_CLUSTER_RADIUS,
        });
      } else {
        resizeParticles(
          particlesRef.current,
          w,
          h,
          prev.w,
          prev.h,
        );
      }
      sizeRef.current = { w, h, dpr };
    };

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);
    resize();

    const render = () => {
      const { w, h } = sizeRef.current;
      const particles = particlesRef.current;
      if (!particles || w <= 0 || h <= 0) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const releasedFromUi = releaseClusterRef?.current ?? false;
      const idleCluster =
        !hasInteractedRef.current && !releasedFromUi;

      if (!reducedMotionRef.current) {
        if (idleCluster) {
          stepParticles(particles, w, h, null, {
            clusterMode: {
              cx: w / 2,
              cy: h / 2,
              radius: SPLASH_CLUSTER_RADIUS,
            },
            wander: 0.032,
          });
        } else {
          const pointer =
            attractPointRef?.current ?? pointerRef.current;
          const attractActive = Boolean(attractPointRef?.current);
          if (attractActive) {
            stepParticles(particles, w, h, pointer, { pointerSteer: 0.14 });
          } else {
            stepParticles(particles, w, h, pointer);
          }
        }
      }

      /* Stronger clear while clustered so glow doesn’t read as full-screen haze */
      ctx.fillStyle = idleCluster
        ? "rgba(38, 40, 64, 0.38)"
        : "rgba(38, 40, 64, 0.22)";
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      for (const p of particles) {
        const core = p.r * 0.75;
        const radius = Math.max(0.5, p.r >= 6 ? core * 4 : core);
        /* Afterglow scales with drawn radius; large stars get 3× longer bloom. */
        const baseGlow = 6 + radius * 9.8;
        const glow = Math.min(
          p.r >= 6 ? baseGlow * 3 : baseGlow,
          p.r >= 6 ? 400 : 138,
        );
        const isLarge = p.r >= 6;
        const shadowA = Math.min(0.36 + radius * 0.05, 0.98);
        const shadowBoost = isLarge ? Math.min(shadowA * 1.28, 0.995) : shadowA;

        /*
         * Radial gradients fade to transparent at the edge, so canvas shadow barely
         * forms — use a uniform-alpha disk first to cast glow, then paint the soft core.
         */
        ctx.shadowBlur = glow;
        ctx.shadowColor = `rgba(180, 205, 255, ${shadowBoost})`;
        const silhouetteA = isLarge ? 0.44 : 0.28;
        ctx.fillStyle = `rgba(255, 250, 245, ${silhouetteA})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
        const warmA = Math.min(0.88 + p.r * 0.008, 0.96);
        const g = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          radius,
        );
        g.addColorStop(0, `rgba(255, 250, 245, ${warmA * 0.92})`);
        g.addColorStop(0.42, `rgba(255, 248, 242, ${warmA * 0.8})`);
        g.addColorStop(0.68, `rgba(248, 244, 252, ${warmA * 0.35})`);
        g.addColorStop(0.88, `rgba(230, 236, 255, ${warmA * 0.08})`);
        g.addColorStop(1, "rgba(255, 250, 245, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      ctx.restore();

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      mq.removeEventListener("change", onMq);
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", clearPointer);
      canvas.removeEventListener("pointercancel", clearPointer);
    };
  }, [particleDensity, attractPointRef, releaseClusterRef]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
    />
  );
}
