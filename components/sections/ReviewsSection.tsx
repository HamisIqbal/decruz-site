"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Star } from "lucide-react";
import { reviews, reviewsIntro, type Review } from "@/content/reviews";

/**
 * Text-based 5-star reviews, themed to match the site's editorial card sections
 * (white surface · hairline border · blush accent quote mark · ink stars).
 *
 * The reveal is scroll-LINKED, not just triggered: a single `useScroll` progress
 * for the grid is sliced into one window per card, so the six cards uncover one
 * by one as you scroll — and re-cover if you scroll back up. Reduced-motion
 * renders them all static.
 */
export function ReviewsSection() {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLUListElement>(null);

  // 0 as the grid enters from the bottom → 1 as its centre reaches the centre
  // of the viewport. Each card claims a slice of that range below.
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "center center"],
  });

  return (
    <section
      aria-labelledby="reviews-heading"
      className="bg-white py-[clamp(80px,11vh,160px)] text-ink"
    >
      <div className="px-[var(--gutter)]">
        <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="eyebrow">{reviewsIntro.eyebrow}</span>
          <h2
            id="reviews-heading"
            className="text-balance font-display text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[2.4rem] lg:text-[3rem]"
          >
            {reviewsIntro.heading}
          </h2>
        </header>

        <ul
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reviews.map((r, i) => (
            <li key={r.id} className="h-full">
              <ReviewCard
                review={r}
                index={i}
                count={reviews.length}
                progress={scrollYProgress}
                reduce={!!reduce}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  index,
  count,
  progress,
  reduce,
}: {
  review: Review;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Each card owns a slice of scroll progress; windows overlap slightly so the
  // cascade reads as a smooth one-by-one uncover rather than hard pop-ins.
  const seg = 1 / count;
  const start = index * seg;
  const end = Math.min(start + seg * 1.6, 1);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [56, 0]);

  return (
    <motion.article
      style={reduce ? undefined : { opacity, y }}
      className="flex h-full flex-col items-center rounded-md border border-line bg-white p-7 text-center shadow-xs sm:p-8"
    >
      <span
        aria-hidden="true"
        className="font-display text-5xl leading-none text-blush"
      >
        &ldquo;
      </span>

      <div
        className="mt-2 flex items-center justify-center gap-1 text-ink"
        role="img"
        aria-label="Rated 5 out of 5 stars"
      >
        {Array.from({ length: 5 }).map((_, s) => (
          <Star
            key={s}
            aria-hidden="true"
            fill="currentColor"
            strokeWidth={0}
            className="h-5 w-5"
          />
        ))}
      </div>

      <blockquote className="mt-4 text-[1.1875rem] leading-[1.6] text-ink-soft sm:text-[1.3125rem]">
        {review.quote}
      </blockquote>

      <footer className="mt-6 flex flex-col items-center gap-0.5">
        <span className="font-display text-lg font-semibold leading-tight text-ink">
          {review.name}
        </span>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
          {review.company}
        </span>
      </footer>
    </motion.article>
  );
}
