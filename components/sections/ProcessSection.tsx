"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { processIntro, processSteps } from "@/content/process";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const header: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

const stepVariant: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.1 },
  }),
};

/**
 * "How we work" — four numbered steps in a 1 / 2 / 4-column grid. Heading
 * reveals first, then the steps cascade in (replays each time it re-enters
 * view). Centered, rem-typed, blush step numbers as the accent.
 */
export function ProcessSection() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="process-heading"
      className="bg-white py-[clamp(80px,11vh,160px)] text-ink"
    >
      <div className="px-[var(--gutter)]">
        <motion.header
          variants={header}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
        >
          <span className="eyebrow">{processIntro.eyebrow}</span>
          <h2
            id="process-heading"
            className="text-balance font-display text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[2.4rem] lg:text-[3rem]"
          >
            {processIntro.heading}
          </h2>
        </motion.header>

        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <motion.li
              key={s.step}
              custom={i}
              variants={stepVariant}
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="flex h-full flex-col items-center rounded-md border border-line bg-white p-7 text-center shadow-xs sm:p-8"
            >
              <span className="font-display text-[2.5rem] font-semibold leading-none text-blush">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold leading-tight tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-[1.6] text-ink-soft">
                {s.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
