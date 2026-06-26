"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { stats, statsIntro, type Stat } from "@/content/stats";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/**
 * "Results That Speak For Themselves" — three headline metrics that count up
 * once when the section scrolls into view, with a subtle scale-in on the cards.
 * Bold display type anchors the page between the lighter card sections.
 */
export function StatsSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });

  // Scroll-linked count: the numbers track scroll progress through the section
  // (0 as it enters from the bottom → 1 as it reaches centre). Scrubbing back
  // counts them down again.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-white py-[clamp(80px,11vh,160px)] text-ink"
    >
      <div className="px-[var(--gutter)]">
        <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="eyebrow">{statsIntro.eyebrow}</span>
          <h2
            id="stats-heading"
            className="text-balance font-display text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[2.4rem] lg:text-[3rem]"
          >
            {statsIntro.heading}
          </h2>
        </header>

        <motion.dl
          ref={ref}
          variants={stage}
          initial={reduce ? false : "hidden"}
          animate={inView || reduce ? "visible" : "hidden"}
          className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <dd className="font-display text-[3.25rem] font-semibold leading-none tracking-[-0.03em] sm:text-[4rem] lg:text-[4.75rem]">
                <Counter stat={s} progress={scrollYProgress} reduce={!!reduce} />
              </dd>
              <dt className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
                {s.label}
              </dt>
              <span
                aria-hidden="true"
                className="mt-5 h-px w-10 bg-blush"
              />
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

// easeOutCubic over clamped scroll progress → the displayed integer.
function valueAt(p: number, target: number) {
  const clamped = Math.min(Math.max(p, 0), 1);
  const eased = 1 - Math.pow(1 - clamped, 3);
  return Math.round(eased * target);
}

function Counter({
  stat,
  progress,
  reduce,
}: {
  stat: Stat;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Seed from the current scroll position so a reload already scrolled into the
  // section shows the right number immediately (no flash of 0).
  const [value, setValue] = useState(() =>
    reduce ? stat.value : valueAt(progress.get(), stat.value),
  );

  useMotionValueEvent(progress, "change", (p) => {
    if (reduce) return;
    setValue(valueAt(p, stat.value));
  });

  return (
    <span>
      {value}
      {stat.suffix ? <span aria-hidden="true">{stat.suffix}</span> : null}
    </span>
  );
}
