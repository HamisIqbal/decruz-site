"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type MagneticProps = {
  children: React.ReactNode;
  /** Max pixel travel toward the cursor. */
  strength?: number;
  className?: string;
};

/**
 * Wraps content so it eases toward the cursor while hovered (fine pointers
 * only). Uses motion values + springs so pointer movement never triggers a
 * React re-render. Disabled under reduced-motion.
 */
export function Magnetic({
  children,
  strength = 14,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 30, mass: 0.5 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const max = Math.max(rect.width, rect.height);
    x.set((relX / max) * strength * 2);
    y.set((relY / max) * strength * 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
