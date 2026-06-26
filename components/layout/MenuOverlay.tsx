"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { navItems, overlayMeta, primaryCta } from "@/content/nav";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { Button } from "@/components/ui/Button";
import styles from "./MenuOverlay.module.css";

type MenuOverlayProps = {
  id: string;
  onClose: () => void;
};

const EASE = [0.65, 0, 0.35, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Panel slides down from the top; black follows blush for a layered reveal.
const blushPanel: Variants = {
  hidden: { y: "-100%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: EASE } },
  exit: { y: "-100%", transition: { duration: 0.45, ease: EASE, delay: 0.05 } },
};
const blackPanel: Variants = {
  hidden: { y: "-100%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: EASE, delay: 0.08 } },
  exit: { y: "-100%", transition: { duration: 0.45, ease: EASE } },
};

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.22 } },
  exit: {},
};
const item: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
  exit: { y: 16, opacity: 0, transition: { duration: 0.2 } },
};
const fadeUp: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASE_OUT, delay: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function MenuOverlay({ id, onClose }: MenuOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, true);

  // ESC to close + lock body scroll while open (no layout shift: compensate
  // for the removed scrollbar width).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const { body, documentElement: html } = document;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[40]"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Layer 0 — blurred scrim over the page (depth). Click to close. */}
      <motion.button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-white/50 backdrop-blur-md"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.4 } },
          exit: { opacity: 0, transition: { duration: 0.4, delay: 0.1 } },
        }}
      />

      {/* Layer 1 — brief blush wipe (interaction cue, sits behind the panel). */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 origin-top bg-blush"
        variants={blushPanel}
      />

      {/* Layer 2 — white content panel. */}
      <motion.div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="absolute inset-0 origin-top overflow-y-auto border-t border-line bg-white/97 text-ink backdrop-blur-xl"
        variants={blackPanel}
      >
        {/* Faint blueprint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--color-black)_1px,transparent_1px),linear-gradient(90deg,var(--color-black)_1px,transparent_1px)] [background-size:64px_64px]"
        />

        <div className="relative flex min-h-full flex-col">
          {/* Top bar mirrors the header for continuity */}
          <div className="flex h-[var(--nav-h)] items-center justify-between px-[var(--gutter)]">
            <Logo />
            <MenuButton isOpen onClick={onClose} controlsId={id} />
          </div>

          {/* Menu items with spotlight hover */}
          <nav
            aria-label="Primary"
            className="flex flex-1 items-center justify-center px-[var(--gutter)]"
          >
            <motion.ul
              className={`${styles.list} flex flex-col items-start gap-2 py-6`}
              variants={list}
            >
              {navItems.map((nav, i) => (
                <motion.li key={nav.href} variants={item}>
                  <Link
                    href={nav.href}
                    onClick={onClose}
                    className={`${styles.itemLink} font-display text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[2.85rem] md:text-[3rem] lg:text-[3.25rem]`}
                  >
                    <span className={styles.index} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {nav.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          {/* Footer: contact + social + CTA */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-5 border-t border-line px-[var(--gutter)] py-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
              <a href={`mailto:${overlayMeta.email}`} className="hover:text-blush">
                {overlayMeta.email}
              </a>
              <a href={`tel:${overlayMeta.phoneTel}`} className="hover:text-blush">
                {overlayMeta.phone}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
              {overlayMeta.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blush"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <Button
              href={primaryCta.href}
              variant="primary"
              size="md"
              onClick={onClose}
              data-cursor="cta"
              target="_blank"
              rel="noreferrer"
            >
              {primaryCta.label}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
