export type Particle = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  r: number;
};

export type PointerState = { x: number; y: number } | null;

const TAU = Math.PI * 2;

function wrapAngle(a: number) {
  let x = a % TAU;
  if (x < -Math.PI) x += TAU;
  if (x > Math.PI) x -= TAU;
  return x;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export type CreateParticlesOptions = {
  clusterRadius?: number;
};

export function createParticles(
  w: number,
  h: number,
  count: number,
  options?: CreateParticlesOptions,
): Particle[] {
  const particles: Particle[] = [];
  const cx = w / 2;
  const cy = h / 2;
  const clusterR = options?.clusterRadius;

  for (let i = 0; i < count; i++) {
    let x: number;
    let y: number;
    if (clusterR != null && clusterR > 0) {
      const t = Math.random() * TAU;
      const rad = clusterR * Math.sqrt(Math.random());
      x = cx + Math.cos(t) * rad;
      y = cy + Math.sin(t) * rad;
    } else {
      x = Math.random() * w;
      y = Math.random() * h;
    }
    /* Large (r ≥ 6): ~1/7 so total count can double while small stars ~2× */
    const r =
      Math.random() < 1 / 7
        ? 6 + Math.floor(Math.random() * 5)
        : 1 + Math.floor(Math.random() * 5);

    particles.push({
      x,
      y,
      angle: Math.random() * TAU,
      speed: 0.35 + Math.random() * 0.55,
      /** simulation radius tier; canvas maps r ≥ 6 to “large” disks */
      r,
    });
  }
  return particles;
}

export function resizeParticles(
  particles: Particle[],
  w: number,
  h: number,
  prevW: number,
  prevH: number,
) {
  if (prevW <= 0 || prevH <= 0) return;
  const sx = w / prevW;
  const sy = h / prevH;
  for (const p of particles) {
    p.x *= sx;
    p.y *= sy;
    p.x = clamp(p.x, 0, w);
    p.y = clamp(p.y, 0, h);
  }
}

type StepOptions = {
  wander: number;
  pointerSteer: number;
  speedJitter: number;
};

export type ClusterMode = {
  cx: number;
  cy: number;
  radius: number;
};

export type StepParticlesOptions = Partial<StepOptions> & {
  clusterMode?: ClusterMode | null;
};

const defaultStep: StepOptions = {
  wander: 0.05,
  pointerSteer: 0.07,
  speedJitter: 0.018,
};

/** Faster drift + higher cap while a pointer/attractor is active */
const POINTER_STEP_MULT = 1.48;
const POINTER_MAX_SPEED_MULT = 1.28;
const POINTER_MIN_SPEED_MULT = 1.06;

export function stepParticles(
  particles: Particle[],
  w: number,
  h: number,
  pointer: PointerState,
  opts: StepParticlesOptions = {},
): void {
  const { clusterMode, ...rest } = opts;
  const o = { ...defaultStep, ...rest };
  const minS = pointer ? 0.28 * POINTER_MIN_SPEED_MULT : 0.28;
  const maxS = pointer ? 1.25 * POINTER_MAX_SPEED_MULT : 1.25;
  const stepMult = pointer ? POINTER_STEP_MULT : 1;

  for (const p of particles) {
    p.angle += (Math.random() - 0.5) * o.wander;

    if (pointer) {
      const target = Math.atan2(pointer.y - p.y, pointer.x - p.x);
      const diff = wrapAngle(target - p.angle);
      p.angle += clamp(diff, -o.pointerSteer, o.pointerSteer);
    }

    p.speed += (Math.random() - 0.5) * o.speedJitter;
    p.speed = clamp(p.speed, minS, maxS);

    const step = p.speed * stepMult;
    p.x += Math.cos(p.angle) * step;
    p.y += Math.sin(p.angle) * step;

    if (clusterMode) {
      const { cx, cy, radius } = clusterMode;
      const dx = p.x - cx;
      const dy = p.y - cy;
      const d = Math.hypot(dx, dy);
      if (d > radius && d > 1e-6) {
        p.x = cx + (dx / d) * radius;
        p.y = cy + (dy / d) * radius;
      }
    } else {
      if (p.x < 0) p.x += w;
      else if (p.x > w) p.x -= w;
      if (p.y < 0) p.y += h;
      else if (p.y > h) p.y -= h;
    }
  }
}
