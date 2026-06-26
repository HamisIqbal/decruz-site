"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { footer } from "@/content/footer";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rise: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE_OUT } },
};
export function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();
  // Measure the (untransformed) wordmark wrapper so progress tracks the mark
  // itself as it crosses the viewport — anchoring to the whole footer left it
  // stuck near 0 (the mark sits at the very bottom of the page) and invisible.
  const markRef = useRef<HTMLDivElement>(null);

  // Scroll-linked wordmark: rises, scales up, and fades in as it scrolls from
  // the bottom of the viewport (progress 0) to its centre (progress 1).
  const { scrollYProgress } = useScroll({
    target: markRef,
    offset: ["start end", "start center"],
  });
  const markY = useTransform(scrollYProgress, [0, 0.5], reduce ? [0, 0] : [56, 0]);
  const markScale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [0.93, 1]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.4], reduce ? [1, 1] : [0, 1]);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="relative isolate overflow-hidden bg-white text-ink">
      {/* Faint blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-black)_1px,transparent_1px),linear-gradient(90deg,var(--color-black)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_50%_120%,black,transparent_80%)]"
      />

      <motion.div
        variants={stage}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: false, margin: "-10% 0px" }}
        className="relative px-[var(--gutter)] pt-[clamp(56px,8vh,112px)] pb-8"
      >
        {/* Top row: tagline + back to top */}
        <div className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-start sm:justify-between">
          <motion.p
            variants={rise}
            className="max-w-[34ch] font-display text-[1.4rem] font-medium leading-[1.15] tracking-[-0.01em] sm:text-[1.75rem]"
          >
            {footer.tagline}
          </motion.p>

          <motion.button
            variants={rise}
            type="button"
            onClick={toTop}
            data-cursor="nav"
            aria-label="Back to top"
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink"
          >
            Back to top
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-[240ms] [transition-timing-function:var(--ease-out-soft)] group-hover:-translate-y-1"
            >
              ↑
            </span>
          </motion.button>
        </div>

        {/* Spec-sheet columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:grid-cols-3 lg:grid-cols-4">
          {footer.columns.map((col) => (
            <motion.nav
              key={col.title}
              variants={rise}
              aria-label={col.title}
              className="flex flex-col gap-3"
            >
              <span className="eyebrow [color:var(--color-ink-muted)]">
                {col.title}
              </span>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-soft transition-colors hover:text-blush"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}

          {/* Contact */}
          <motion.div variants={rise} className="flex flex-col gap-3">
            <span className="eyebrow [color:var(--color-ink-muted)]">
              Contact
            </span>
            <ul className="flex flex-col gap-2 text-sm text-ink-soft">
              <li>
                <a
                  href={`mailto:${footer.contact.email}`}
                  className="transition-colors hover:text-blush"
                >
                  {footer.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footer.contact.phoneTel}`}
                  className="transition-colors hover:text-blush"
                >
                  {footer.contact.phone}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.nav
            variants={rise}
            aria-label="Social"
            className="flex flex-col gap-3"
          >
            <span className="eyebrow [color:var(--color-ink-muted)]">
              Social
            </span>
            <ul className="flex flex-col gap-2 text-sm text-ink-soft">
              {footer.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-blush"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        {/* Signature wordmark */}
        <div
          ref={markRef}
          aria-hidden="true"
          className="overflow-hidden border-t border-line pt-8"
        >
          <motion.div
            style={{ y: markY, scale: markScale, opacity: markOpacity }}
            className="flex origin-left items-end leading-[0.8]"
          >
            <span className="font-display text-[4rem] font-semibold tracking-[-0.04em] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[13rem]">
              deCRUZ
            </span>
            <span className="mb-[0.18em] ml-[0.12em] h-[0.22em] w-[0.22em] rounded-[2px] bg-blush sm:mb-[0.22em]" />
          </motion.div>
        </div>

        {/* Title-block legal row */}
        <motion.div
          variants={rise}
          className="mt-4 grid grid-cols-2 overflow-hidden rounded-sm border border-line font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-muted sm:grid-cols-4"
        >
          <span className="border-b border-line px-4 py-3 sm:border-b-0 sm:border-r">
            © {year} deCRUZ
          </span>
          <span className="border-b border-line px-4 py-3 sm:border-b-0 sm:border-r">
            {footer.legal.studio}
          </span>
          <span className="border-r border-line px-4 py-3">
            {footer.legal.est}
          </span>
          <span className="px-4 py-3">{footer.legal.place}</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
