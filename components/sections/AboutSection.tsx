"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { about } from "@/content/about";
import { twoLines } from "@/lib/text";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Fade-up (opacity 0 → 1, translateY 30px → 0) with a per-element delay so the
 * headline, narrative, and tagline stagger in. GPU-only props (transform +
 * opacity). The `whileInView` + `once` + `amount: 0.2` viewport config is the
 * framer-motion equivalent of an IntersectionObserver at threshold 0.2 that
 * fires a single time (no re-animate on scroll back up).
 */
const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  },
});

// Accent line widens from 0% → 100% on entry (scaleX, GPU-composited).
const rule: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE_OUT, delay: 0.15 },
  },
};

export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="about-heading"
      className="bg-white py-[clamp(80px,11vh,160px)] text-ink"
    >
      <motion.div
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="mx-auto flex max-w-[72rem] flex-col items-center px-[var(--gutter)] text-center"
      >
        <motion.span variants={fadeUp(0)} className="eyebrow block">
          {about.eyebrow}
        </motion.span>

        <motion.h2
          id="about-heading"
          variants={fadeUp(0)}
          className="mt-4 max-w-[60rem] font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[2.5rem] lg:text-[2.8rem]"
        >
          {twoLines(about.headline).map((line, i) =>
            line ? (
              <span key={i} className="block">
                {line}
              </span>
            ) : null,
          )}
        </motion.h2>

        <motion.div
          variants={rule}
          aria-hidden="true"
          className="mt-8 h-px w-full max-w-[34rem] origin-center bg-ink/15"
        />

        <motion.p
          variants={fadeUp(0.2)}
          className="mt-8 max-w-[60ch] text-[1.0625rem] leading-[1.7] text-ink-soft sm:text-[1.1875rem]"
        >
          {about.narrative}
        </motion.p>

        <motion.p
          variants={fadeUp(0.4)}
          className="mt-7 max-w-[44ch] font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-xl"
        >
          {about.tagline}
        </motion.p>
      </motion.div>
    </section>
  );
}
