"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { heroSlides } from "@/content/heroSlides";
import { twoLines } from "@/lib/text";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};
const rule: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

/**
 * Shared hero band for the inner pages (About / Services / Projects). Carries
 * the same full-bleed infinite horizontal image marquee as the home hero,
 * behind a legibility scrim. Kept on a black surface on purpose: the fixed site
 * header is transparent at the top of the page and renders its logo/menu in
 * light, so a dark hero keeps them legible (a white hero would hide them). Type
 * is rem-based + centered to match the rest of the site.
 */
export function PageHero({
  eyebrow,
  title,
  subtext,
}: {
  eyebrow: string;
  title: string;
  subtext: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      {/* Full-bleed background: infinite horizontal image loop (CSS marquee),
          same as the home hero. Fills the band height; decorative → aria-hidden.
          The global reduced-motion gate freezes the track. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="marquee h-full [--marquee-duration:60s]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex h-full shrink-0">
              {heroSlides.map((slide, i) => (
                <div
                  key={`${copy}-${i}`}
                  className="relative h-full aspect-[3/4] shrink-0"
                >
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    priority={copy === 0 && i === 0}
                    sizes="75vh"
                    className="select-none object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legibility scrim — keeps the centered copy readable over the imagery. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/35"
      />

      <motion.div
        variants={stage}
        initial={reduce ? false : "hidden"}
        animate="visible"
        className="relative z-10 mx-auto flex max-w-[80ch] flex-col items-center gap-6 px-[var(--gutter)] pt-[calc(var(--nav-h)+clamp(72px,14vh,168px))] pb-[clamp(64px,11vh,140px)] text-center"
      >
        <motion.span variants={rise} className="eyebrow text-white/70">
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={rise}
          className="font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.6rem] md:text-[3rem] lg:text-[3.4rem]"
        >
          {twoLines(title).map((line, i) =>
            line ? (
              <span key={i} className="block">
                {line}
              </span>
            ) : null,
          )}
        </motion.h1>

        <motion.div
          variants={rule}
          aria-hidden="true"
          className="h-px w-16 origin-center bg-blush"
        />

        <motion.p
          variants={rise}
          className="max-w-[74ch] text-balance text-[1.0625rem] leading-[1.6] text-white/80 md:text-[1.1875rem]"
        >
          {subtext}
        </motion.p>
      </motion.div>
    </section>
  );
}
