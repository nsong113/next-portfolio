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

export function createParticles(
  w: number,
  h: number,
  count: number,
): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      angle: Math.random() * TAU,
      speed: 0.35 + Math.random() * 0.55,
      /** radius px, inclusive 1–10 */
      r: 1 + Math.floor(Math.random() * 10),
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

const defaultStep: StepOptions = {
  wander: 0.05,
  pointerSteer: 0.07,
  speedJitter: 0.018,
};

export function stepParticles(
  particles: Particle[],
  w: number,
  h: number,
  pointer: PointerState,
  opts: Partial<StepOptions> = {},
): void {
  const o = { ...defaultStep, ...opts };
  const minS = 0.28;
  const maxS = 1.25;

  for (const p of particles) {
    p.angle += (Math.random() - 0.5) * o.wander;

    if (pointer) {
      const target = Math.atan2(pointer.y - p.y, pointer.x - p.x);
      const diff = wrapAngle(target - p.angle);
      p.angle += clamp(diff, -o.pointerSteer, o.pointerSteer);
    }

    p.speed += (Math.random() - 0.5) * o.speedJitter;
    p.speed = clamp(p.speed, minS, maxS);

    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;

    if (p.x < 0) p.x += w;
    else if (p.x > w) p.x -= w;
    if (p.y < 0) p.y += h;
    else if (p.y > h) p.y -= h;
  }
}
