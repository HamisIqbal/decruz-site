"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { processIntro, processSteps } from "@/content/process";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const header: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

/**
 * "How we work" as a scroll-driven card stack. The pinning is done with native
 * CSS `position: sticky` (each card sticks just below the header, with ascending
 * z-index + a small per-card top offset so the deck fans), so the browser pins
 * the cards itself — buttery smooth, with none of the rAF/smooth-scroll jitter
 * the earlier lenis-driven version produced.
 *
 * Under reduced-motion the sticky stacking is replaced with a plain card grid.
 */
export function ProcessStack() {
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
      </div>

      {reduce ? (
        <ol className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 px-[var(--gutter)] sm:grid-cols-2">
          {processSteps.map((s) => (
            <li
              key={s.step}
              className="flex flex-col items-center rounded-md border border-line bg-white p-7 text-center shadow-xs"
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
            </li>
          ))}
        </ol>
      ) : (
        <ol className="mx-auto mt-8 flex max-w-2xl flex-col gap-6 px-[var(--gutter)] pb-[14vh]">
          {processSteps.map((s, i) => (
            <li
              key={s.step}
              className="sticky"
              style={{
                top: `calc(var(--nav-h) + 1.5rem + ${i * 0.9}rem)`,
                zIndex: i + 1,
              }}
            >
              <div className="flex min-h-[15rem] flex-col items-center justify-center rounded-3xl border border-line bg-white p-8 text-center shadow-[0_18px_50px_-20px_rgba(0,0,0,0.25)] sm:p-10">
                <span className="font-display text-[3rem] font-semibold leading-none text-blush">
                  {s.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold leading-tight tracking-[-0.01em] sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[40ch] text-[1rem] leading-[1.6] text-ink-soft">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
