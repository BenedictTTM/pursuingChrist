"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Blob config ────────────────────────────────────────────────────────────
// Each blob has a "home" position (x/y as viewport fractions), size, color,
// opacity, and individual drift/phase so they never move in sync.
const BLOBS = [
  // Primary deep-blue anchor — bottom-left, large, slow
  { x: 0.14, y: 0.78, rx: 0.54, ry: 0.46, color: [11, 94, 215] as const,  alpha: 0.30, phase: 0.00, speed: 0.00048, driftX: 0.065, driftY: 0.045 },
  // Secondary — top-right, medium
  { x: 0.80, y: 0.18, rx: 0.44, ry: 0.38, color: [61, 108, 185] as const,  alpha: 0.20, phase: 2.10, speed: 0.00036, driftX: 0.055, driftY: 0.060 },
  // Centre diffusion — mid, subtle
  { x: 0.52, y: 0.52, rx: 0.38, ry: 0.30, color: [28, 56, 140] as const,   alpha: 0.14, phase: 4.30, speed: 0.00060, driftX: 0.040, driftY: 0.035 },
  // Accent — bottom-right, smaller
  { x: 0.86, y: 0.80, rx: 0.28, ry: 0.24, color: [80, 130, 220] as const,  alpha: 0.10, phase: 1.20, speed: 0.00042, driftX: 0.050, driftY: 0.042 },
  // White bloom — top area, very faint
  { x: 0.30, y: 0.14, rx: 0.26, ry: 0.22, color: [200, 215, 255] as const, alpha: 0.06, phase: 3.50, speed: 0.00054, driftX: 0.045, driftY: 0.050 },
  // Deep charcoal haze — centre-left
  { x: 0.08, y: 0.42, rx: 0.32, ry: 0.28, color: [40, 50, 70] as const,    alpha: 0.18, phase: 5.80, speed: 0.00033, driftX: 0.038, driftY: 0.030 },
] as const;

const GRAIN_SIZE   = 192;  // noise tile px
const GRAIN_UPDATE = 3;    // refresh every N frames (lower = more film-like)

// ─── Component ──────────────────────────────────────────────────────────────
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const tickRef   = useRef(0);

  // Pre-baked grain tile so we're not allocating on every frame
  const grainTileRef = useRef<string[]>([]);

  // Build a pool of grain tiles once
  const buildGrainPool = useCallback(() => {
    const pool: string[] = [];
    for (let i = 0; i < 8; i++) {
      const off = document.createElement("canvas");
      off.width = off.height = GRAIN_SIZE;
      const oc  = off.getContext("2d")!;
      const id  = oc.createImageData(GRAIN_SIZE, GRAIN_SIZE);
      for (let j = 0; j < id.data.length; j += 4) {
        const v = (Math.random() * 255) | 0;
        id.data[j] = id.data[j + 1] = id.data[j + 2] = v;
        id.data[j + 3] = 255;
      }
      oc.putImageData(id, 0, 0);
      pool.push(off.toDataURL());
    }
    grainTileRef.current = pool;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2); // cap at 2× for perf
    canvas.width  = canvas.offsetWidth  * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
  }, []);

  const drawFrame = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    const grain  = grainRef.current;
    if (!canvas || !grain) return;

    const ctx = canvas.getContext("2d")!;
    const w   = canvas.offsetWidth;
    const h   = canvas.offsetHeight;
    tickRef.current++;

    // 1 ── Base gradient
    ctx.clearRect(0, 0, w, h);
    const base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0,   "#0d0d0f");
    base.addColorStop(0.5, "#10131a");
    base.addColorStop(1,   "#09090d");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    // 2 ── Atmospheric blobs
    for (const b of BLOBS) {
      const angle   = ts * b.speed;
      const ox      = Math.sin(angle + b.phase) * b.driftX;
      const oy      = Math.cos(angle * 0.71 + b.phase) * b.driftY;
      const breath  = 1 + Math.sin(angle * 1.27 + b.phase * 0.5) * 0.055;
      const bx      = (b.x + ox) * w;
      const by      = (b.y + oy) * h;
      const srx     = b.rx * w * breath;
      const sry     = b.ry * h * breath;
      const radius  = Math.max(srx, sry);
      const alphaV  = b.alpha * (0.88 + Math.sin(angle * 0.93 + b.phase) * 0.12);

      const [r, g, bl] = b.color;
      const grad = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
      grad.addColorStop(0,    `rgba(${r},${g},${bl},${alphaV})`);
      grad.addColorStop(0.35, `rgba(${r},${g},${bl},${alphaV * 0.52})`);
      grad.addColorStop(0.70, `rgba(${r},${g},${bl},${alphaV * 0.14})`);
      grad.addColorStop(1,    `rgba(${r},${g},${bl},0)`);

      ctx.save();
      // GPU-only: translate+scale avoids layout.
      ctx.translate(bx, by);
      ctx.scale(srx / radius, sry / radius);
      ctx.translate(-bx, -by);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bx, by, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3 ── Vignette
    const vig = ctx.createRadialGradient(w*0.5, h*0.5, 0, w*0.5, h*0.5, Math.max(w,h)*0.72);
    vig.addColorStop(0,   "rgba(0,0,0,0)");
    vig.addColorStop(0.6, "rgba(0,0,0,0)");
    vig.addColorStop(1,   "rgba(0,0,0,0.55)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);

    // 4 ── Animated grain (pool swap)
    if (tickRef.current % GRAIN_UPDATE === 0 && grainTileRef.current.length) {
      const idx = (tickRef.current / GRAIN_UPDATE) % grainTileRef.current.length | 0;
      grain.style.backgroundImage   = `url(${grainTileRef.current[idx]})`;
      grain.style.backgroundPosition = `${(Math.random()*GRAIN_SIZE)|0}px ${(Math.random()*GRAIN_SIZE)|0}px`;
    }

    rafRef.current = requestAnimationFrame(drawFrame);
  }, []);

  useEffect(() => {
    buildGrainPool();
    resize();
    rafRef.current = requestAnimationFrame(drawFrame);

    const ro = new ResizeObserver(resize);
    if (canvasRef.current) ro.observe(canvasRef.current);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [buildGrainPool, resize, drawFrame]);

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      {/* Main render surface */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          willChange: "transform", // hint GPU layer
        }}
      />

      {/* Film grain overlay */}
      <div
        ref={grainRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.030,
          backgroundSize: `${GRAIN_SIZE}px ${GRAIN_SIZE}px`,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

// ─── Usage ──────────────────────────────────────────────────────────────────
//
//   // app/layout.tsx  (or any root layout)
//   import AmbientBackground from "@/components/AmbientBackground";
//
//   export default function RootLayout({ children }) {
//     return (
//       <html>
//         <body style={{ background: "#09090d" }}>
//           <AmbientBackground />
//           <main style={{ position: "relative", zIndex: 1 }}>
//             {children}
//           </main>
//         </body>
//       </html>
//     );
//   }