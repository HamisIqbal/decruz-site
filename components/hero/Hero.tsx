"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { hero } from "@/content/hero";
import { heroSlides } from "@/content/heroSlides";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* Orchestrated load: eyebrow → headline lines → desc → CTAs. */
const stage: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const rise: Variants = {
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};
const lines: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE_OUT } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax: progress 0 → 1 as the hero scrolls up and out.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Foreground copy drifts up and fades; background layer scales + sinks slower.
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], reduce ? [1, 1] : [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-black text-white"
    >
      {/* Full-bleed background: infinite horizontal image loop (CSS marquee).
          Several portrait images fill the hero height and scroll sideways
          forever; the global reduced-motion gate freezes the track.
          Decorative → aria-hidden. */}
      <motion.div
        aria-hidden="true"
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 overflow-hidden"
      >
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
      </motion.div>

      {/* Legibility scrim — darker toward the bottom-left where the copy sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/55 to-black/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
      />

      {/* Centered hero copy (eyebrow → headline → description → CTAs). */}
      <motion.div
        variants={stage}
        initial={reduce ? false : "hidden"}
        animate="visible"
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-10 mx-auto w-full max-w-5xl px-[var(--gutter)] pt-[calc(var(--nav-h)+1rem)] pb-24"
      >
        <div className="flex flex-col items-center text-center">
            <motion.p variants={rise} className="eyebrow text-white/70">
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={lines}
              className="mt-5 font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white drop-shadow-sm sm:text-[2.6rem] md:text-[3rem] lg:text-[3.4rem]"
            >
              {hero.headline.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                  <motion.span variants={maskUp} className="block md:whitespace-nowrap">
                    {line.map((part, j) => (
                      <span
                        key={j}
                        className={"accent" in part && part.accent ? "text-blush" : ""}
                      >
                        {part.text}
                      </span>
                    ))}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-[44ch] text-[1.0625rem] leading-[1.6] text-white/85 md:text-[1.1875rem]"
            >
              {hero.description}
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <Magnetic strength={16}>
                <Button
                  href={hero.primary.href}
                  variant="inverse"
                  size="md"
                  data-cursor="cta"
                  target="_blank"
                  rel="noreferrer"
                >
                  {hero.primary.label}
                </Button>
              </Magnetic>
              <Button
                href={hero.secondary.href}
                variant="outline"
                size="md"
                data-cursor="cta"
              >
                {hero.secondary.label}
              </Button>
            </motion.div>
          </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6, ease: EASE_OUT }}
        className="pointer-events-none absolute bottom-6 left-0 right-0 z-10"
      >
        <div className="flex items-center gap-3 px-[var(--gutter)]">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/60">
            {hero.scrollCue}
          </span>
          <span className="relative h-10 w-px overflow-hidden bg-white/20">
            {!reduce && (
              <motion.span
                className="absolute inset-x-0 top-0 h-3 bg-blush"
                animate={{ y: ["-100%", "320%"] }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.4,
                }}
              />
            )}
          </span>
        </div>
      </motion.div>

      {/* Cheap static fade at the bottom edge — eases the dark hero imagery into
          the section that follows, with no backdrop-filter repaint cost. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-28 bg-gradient-to-b from-transparent to-black"
      />
    </section>
  );
}
