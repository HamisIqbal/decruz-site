"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cta } from "@/content/cta";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { useMotionEnv } from "@/components/hooks/useMotionEnv";

// three.js is the heaviest dependency on the site. Loading it statically would
// ship it in every page's bundle even though the fluid only renders on desktop.
// Deferring it here keeps three.js out of the initial bundle entirely — it is
// fetched on demand, and only when `showFluid` actually mounts the effect.
const LiquidEther = dynamic(
  () => import("@/components/reactbits/LiquidEther"),
  { ssr: false },
);

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const rise: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};
const lines: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const maskUp: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE_OUT } },
};
const rule: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

export function CtaSection() {
  const reduce = useReducedMotion();
  const { small, touch } = useMotionEnv();
  // The WebGL fluid is the heaviest effect on the site; only run it where it
  // pays off (desktop, fine pointer, motion allowed). Phones/tablets skip it.
  const showFluid = !reduce && !touch && !small;

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-white text-ink"
    >
      {/* Faint blueprint texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--color-black)_1px,transparent_1px),linear-gradient(90deg,var(--color-black)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_78%)]"
      />

      {/* Living blush fluid behind the CTA (React Bits LiquidEther). Idle
          auto-motion draws soft blush → rose streaks; cursor movement stirs it.
          pointer-events disabled so the buttons stay clickable; reduced-motion
          drops it entirely. */}
      {showFluid && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_80%)]"
        >
          <LiquidEther
            colors={["#FAD2E3", "#F4A8C7", "#C8366B"]}
            mouseForce={16}
            cursorSize={90}
            resolution={0.3}
            iterationsPoisson={14}
            autoDemo
            autoSpeed={0.4}
            autoIntensity={1.8}
            autoResumeDelay={1200}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      <motion.div
        variants={stage}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-[var(--gutter)] py-[clamp(96px,16vh,200px)] text-center lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:text-left"
      >
        {/* Left column — eyebrow + headline */}
        <div className="flex flex-col items-center gap-6 lg:items-start">
          <motion.span variants={rise} className="eyebrow text-ink-muted">
            {cta.eyebrow}
          </motion.span>

          <motion.h2
            id="cta-heading"
            variants={lines}
            className="max-w-[16ch] font-display text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.03em] sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.75rem]"
          >
            {cta.headline.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={maskUp} className="block">
                  {line.map((part, j) => (
                    <span key={j}>{part.text}</span>
                  ))}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Right column — supporting copy + CTAs */}
        <div className="flex max-w-[42ch] flex-col items-center gap-7 lg:items-start lg:shrink-0">
          <motion.div
            variants={rule}
            className="h-px w-16 origin-center bg-ink/20 lg:origin-left"
            aria-hidden="true"
          />

          <motion.p
            variants={rise}
            className="text-[1.0625rem] leading-[1.6] text-ink-soft md:text-[1.1875rem]"
          >
            {cta.subhead}
          </motion.p>

          <motion.div variants={rise} className="mt-2 flex flex-col items-center gap-4 lg:items-start">
            <Magnetic strength={18}>
              <Button
                href={cta.primary.href}
                variant="primary"
                size="lg"
                data-cursor="cta"
                target="_blank"
                rel="noreferrer"
              >
                {cta.primary.label}
              </Button>
            </Magnetic>

            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
              {cta.reassure}
            </p>
          </motion.div>

          <motion.p variants={rise} className="text-sm text-ink-soft">
            {cta.secondaryLabel}{" "}
            <a
              href={cta.secondaryHref}
              className="font-medium text-ink underline decoration-blush decoration-2 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-[3px]"
            >
              {cta.secondaryLinkText}
            </a>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
