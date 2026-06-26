"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Thin blush bar pinned to the top of the page whose width is scroll-linked:
 * `scaleX` tracks overall page scroll progress (0 → 1), lightly spring-smoothed
 * so it glides rather than jitters. Purely a position indicator (decorative →
 * aria-hidden); it reflects scroll position, so it stays meaningful even under
 * reduced-motion.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  // Reduced-motion: bind directly to scroll (no spring catch-up).
  const scaleX = reduce ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[50] h-[3px] origin-left bg-blush"
    />
  );
}
