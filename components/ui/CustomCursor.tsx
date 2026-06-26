"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "normal" | "cta" | "nav" | "menu" | "video";

/** Per-state targets (transform-scale + opacity only). */
const GLOW: Record<CursorState, { scale: number; opacity: number }> = {
  normal: { scale: 1, opacity: 0.32 },
  nav: { scale: 1.12, opacity: 0.42 },
  menu: { scale: 1.18, opacity: 0.46 },
  cta: { scale: 1.35, opacity: 0.55 },
  video: { scale: 1.5, opacity: 0.6 },
};
const RING: Record<CursorState, { scale: number; opacity: number }> = {
  normal: { scale: 0.4, opacity: 0 },
  nav: { scale: 1, opacity: 0.9 },
  menu: { scale: 1.25, opacity: 0.9 },
  cta: { scale: 1.6, opacity: 1 },
  video: { scale: 2.1, opacity: 1 },
};

function resolveState(target: EventTarget | null): CursorState {
  if (!(target instanceof Element)) return "normal";
  const tagged = target.closest<HTMLElement>("[data-cursor]");
  if (tagged) return (tagged.dataset.cursor as CursorState) ?? "normal";
  if (target.closest('a, button, [role="button"], label, summary, input'))
    return "nav";
  return "normal";
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("normal");

  const glowEl = useRef<HTMLDivElement>(null);
  const ringEl = useRef<HTMLDivElement>(null);

  // Mutable pointer + interpolated positions (no React state → no re-renders).
  const target = useRef({ x: -200, y: -200 });
  const glow = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const raf = useRef(0);

  // ---- Capability gate (touch + reduced motion), reactive to changes ----
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setEnabled(fine.matches && !reduce.matches);
    evaluate();
    fine.addEventListener("change", evaluate);
    reduce.addEventListener("change", evaluate);
    return () => {
      fine.removeEventListener("change", evaluate);
      reduce.removeEventListener("change", evaluate);
    };
  }, []);

  // ---- rAF lerp loop + lightweight listeners ----
  useEffect(() => {
    if (!enabled) return;

    // pointermove only records coordinates — cheap, no render, no DOM write.
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    const onOver = (e: PointerEvent) => setState(resolveState(e.target));
    const onLeave = () => {
      target.current.x = -200;
      target.current.y = -200;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const tick = () => {
      // No trailing: the lens + ring sit exactly where the pointer is, so the
      // effect "appears wherever the mouse goes" rather than chasing the arrow.
      glow.current.x = target.current.x;
      glow.current.y = target.current.y;
      ring.current.x = target.current.x;
      ring.current.y = target.current.y;

      if (glowEl.current)
        glowEl.current.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0)`;
      if (ringEl.current)
        ringEl.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      {/* SVG turbulence + displacement that gives the lens its liquid wobble.
          The animated baseFrequency keeps the refraction gently flowing. */}
      <svg
        width="0"
        height="0"
        className="absolute"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <filter id="cursor-liquid" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.014"
            numOctaves={2}
            seed={4}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="16s"
              values="0.012 0.014; 0.02 0.018; 0.012 0.014"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Transparent liquify lens — a glassy circle that refracts and ripples the
          page behind it (backdrop-filter + the SVG displacement). No colour. */}
      <div ref={glowEl} className="absolute left-0 top-0 will-change-transform">
        <div
          className="transition-[transform] duration-[350ms] [transition-timing-function:var(--ease-out-soft)]"
          style={{ transform: `translate(-50%, -50%) scale(${GLOW[state].scale})` }}
        >
          <div
            className="h-[120px] w-[120px] rounded-full border border-white/25 [background:radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_58%,transparent_72%)] [box-shadow:inset_0_1px_12px_rgba(255,255,255,0.22),inset_0_-8px_22px_rgba(255,255,255,0.06),0_10px_34px_rgba(0,0,0,0.12)] [backdrop-filter:blur(3px)_saturate(1.45)_brightness(1.05)] [-webkit-backdrop-filter:blur(3px)_saturate(1.45)_brightness(1.05)]"
            style={{ filter: "url(#cursor-liquid)" }}
          />
        </div>
      </div>

      {/* State ring + contextual label (crisp, not blended) */}
      <div ref={ringEl} className="absolute left-0 top-0 will-change-transform">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/55 transition-[transform,opacity] duration-300 [transition-timing-function:var(--ease-out-soft)]"
          style={{
            transform: `translate(-50%, -50%) scale(${RING[state].scale})`,
            opacity: RING[state].opacity,
          }}
        >
          <span
            className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/85 transition-opacity duration-200"
            style={{ opacity: state === "video" ? 1 : 0 }}
          >
            Play
          </span>
        </div>
      </div>
    </div>
  );
}
