"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useMotionEnv } from "@/components/hooks/useMotionEnv";

// easeOutExpo — the classic premium "arrive fast, settle softly" curve.
const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;
const MAX_TILT = 9; // degrees the card leans toward the cursor
const CARD_PERSPECTIVE = 900; // px — baked into each 3D transform (see note below)

/**
 * Scroll entrance for a single card: fade up with a slight rotateX + scale.
 * `custom` carries the card index so cards cascade ~110ms apart across the row.
 *
 * `transformPerspective` is set so the rotateX renders in real 3D *on this
 * element itself*. We can't rely on a `perspective` on an ancestor: this element
 * animates `opacity`, and opacity < 1 turns an element into a flattening group
 * that cancels `transform-style: preserve-3d` — so an ancestor's perspective
 * would never reach it. Baking perspective into the transform sidesteps that.
 */
export const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 12, scale: 0.96, transformPerspective: CARD_PERSPECTIVE },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transformPerspective: CARD_PERSPECTIVE,
    transition: { duration: 0.65, ease: ENTRANCE_EASE, delay: i * 0.11 },
  }),
};

/**
 * Premium interactive card shell shared by the "Why Choose" and "Services"
 * sections. It layers independent, GPU-only transforms on separate elements so
 * none overwrite each other:
 *
 *   parallax wrapper  → translateY tied to scroll (subtle, per-column depth)
 *     entrance wrapper → the staggered fade/rotate/scale reveal (variants)
 *       tilt wrapper   → rotateX/rotateY following the cursor (±9°, spring reset)
 *         children     → the actual card; owns its CSS hover lift/shadow/icon
 *
 * Each 3D-rotated element carries its own `transformPerspective`, so the 3D is
 * robust regardless of ancestor opacity/filter (which would otherwise flatten a
 * shared perspective context). The radial highlight is an overlay using
 * mix-blend-multiply (matching the site's cursor aura) so blush only tints the
 * white surface, never the text.
 *
 * Motion degrades gracefully: cursor tilt + glow are skipped on touch /
 * reduced-motion; parallax + entrance are skipped under reduced-motion.
 */
export function MotionCard({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const { touch } = useMotionEnv();
  const interactive = !touch && !reduce;

  const tiltRef = useRef<HTMLDivElement>(null); // measured for cursor math

  // --- Cursor tilt (-0.5…0.5 across the card → ±MAX_TILT°) ---
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltSpring = { stiffness: 150, damping: 15, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), tiltSpring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), tiltSpring);

  // --- Cursor-following radial highlight ---
  const glowX = useSpring(useMotionValue(50), { stiffness: 120, damping: 20 });
  const glowY = useSpring(useMotionValue(50), { stiffness: 120, damping: 20 });
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 30 });
  const glow = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, var(--color-blush-wash) 0%, transparent 65%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = tiltRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
    glowX.set(((e.clientX - r.left) / r.width) * 100);
    glowY.set(((e.clientY - r.top) / r.height) * 100);
  };
  const onEnter = () => glowOpacity.set(0.9);
  const onLeave = () => {
    px.set(0);
    py.set(0);
    glowOpacity.set(0);
  };

  return (
    <div className="h-full">
      <motion.div
        custom={index}
        variants={cardEntrance}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className="h-full"
      >
        <motion.div
          ref={tiltRef}
          onMouseMove={interactive ? onMove : undefined}
          onMouseEnter={interactive ? onEnter : undefined}
          onMouseLeave={interactive ? onLeave : undefined}
          style={
            interactive
              ? { rotateX, rotateY, transformPerspective: CARD_PERSPECTIVE, transformStyle: "preserve-3d" }
              : undefined
          }
          className="relative h-full"
        >
          {children}
          {interactive && (
            <motion.div
              aria-hidden="true"
              style={{ background: glow, opacity: glowOpacity }}
              className="pointer-events-none absolute inset-0 rounded-md mix-blend-multiply"
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
