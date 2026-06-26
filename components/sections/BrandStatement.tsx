"use client";

import { useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

const STATEMENT =
  "We turn builders into brands clients can't ignore — brand, website, and demand that compound into a pipeline you can count on.";

/**
 * Editorial brand-statement band. As the section scrolls through the viewport,
 * each word un-blurs and lifts to full opacity while the line settles from a
 * slight rotation (React Bits ScrollReveal, GSAP ScrollTrigger / scrubbed).
 *
 * Under reduced-motion the scrubbed reveal would leave words stuck at low
 * opacity, so we render the sentence as plain, fully-legible type instead.
 */
export function BrandStatement() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="What deCRUZ does"
      className="bg-white py-[clamp(80px,13vh,180px)] text-ink"
    >
      <div className="mx-auto max-w-[88rem] px-[var(--gutter)] text-center">
        {reduce ? (
          <p className="font-display text-[clamp(2.8rem,8vw,8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
            {STATEMENT}
          </p>
        ) : (
          <ScrollReveal
            baseOpacity={0.08}
            baseRotation={4}
            blurStrength={8}
            enableBlur
            containerClassName="!my-0"
            textClassName="font-display tracking-[-0.03em] !text-[clamp(2.8rem,8vw,8rem)] !leading-[1.05] !text-ink"
          >
            {STATEMENT}
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
