"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Award,
  Target,
  Users,
  MessageSquare,
  Headphones,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { whyChooseIntro, whyChooseItems } from "@/content/whyChoose";
import { MotionCard } from "@/components/ui/MotionCard";

// easeOutExpo — matches the card entrance curve for a cohesive feel.
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const icons: Record<string, LucideIcon> = {
  Award,
  Target,
  Users,
  MessageSquare,
  Headphones,
  Wrench,
};

// Header: fade in + slide up 50px → 0, 0.8s easeOutExpo, animates before the cards.
const header: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

/**
 * "Why Contractors Choose deCRUZ" — six trust pillars in a responsive
 * 1 / 2 / 3-column grid. The heading reveals first, then the cards cascade in
 * (fade + rise + slight 3D rotate/scale) via the shared {@link MotionCard},
 * which also adds cursor-follow tilt, a soft blush highlight, and gentle scroll
 * parallax. Layout, type, and copy are unchanged — this is motion only.
 */
export function WhyChooseSection() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="why-heading"
      className="bg-white py-[clamp(80px,11vh,160px)] text-ink"
    >
      <div className="px-[var(--gutter)]">
        <motion.header
          variants={header}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
        >
          <span className="eyebrow">{whyChooseIntro.eyebrow}</span>
          <h2
            id="why-heading"
            className="text-balance font-display text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[2.4rem] lg:text-[3rem]"
          >
            {whyChooseIntro.heading}
          </h2>
        </motion.header>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseItems.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="[perspective:1000px]">
                <MotionCard index={i}>
                  <div className="group relative flex h-full flex-col items-center rounded-md border border-line bg-white p-7 text-center transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-2.5 hover:scale-[1.02] hover:border-black/25 hover:shadow-xl sm:p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-line text-ink transition-[background-color,transform] duration-[280ms] [transition-timing-function:var(--ease-out-soft)] group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blush-wash">
                      <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold leading-tight tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.6] text-ink-soft">
                      {item.description}
                    </p>
                  </div>
                </MotionCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
