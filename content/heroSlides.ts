/**
 * Hero background images for the full-bleed horizontal scroll loop.
 *
 * These are vertical (portrait) captures. Several show at once across the hero,
 * each filling the hero height, and the infinite horizontal loop slides them
 * sideways forever.
 *
 * TO CHANGE: drop image files into `public/hero/` and list their paths below.
 * Any web format works (jpg/png/webp/avif). The loop stays seamless.
 */
export type HeroSlide = { src: string };

export const heroSlides: HeroSlide[] = [
  // Ordered so no two shots from the same scene (kitchen 1-2-3, woodshop 4-5,
  // pool 6-7, garage 8) ever sit side by side — including across the loop seam,
  // since the marquee repeats this track end-to-end.
  { src: "/hero/hero-1.webp" },
  { src: "/hero/hero-4.webp" },
  { src: "/hero/hero-2.webp" },
  { src: "/hero/hero-6.webp" },
  { src: "/hero/hero-3.webp" },
  { src: "/hero/hero-5.webp" },
  { src: "/hero/hero-8.webp" },
  { src: "/hero/hero-7.webp" },
];

/** Time each slide is held before crossfading to the next (ms). */
export const SLIDE_INTERVAL = 6500;
