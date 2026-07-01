"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { MenuOverlay } from "./MenuOverlay";
import { Button } from "@/components/ui/Button";
import { primaryCta } from "@/content/nav";

const MENU_ID = "site-menu";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Condense the bar after a small scroll. State only flips on threshold cross,
  // so scrolling does not spam re-renders.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled((prev) => {
          const next = window.scrollY > 24;
          return prev === next ? prev : next;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // Some pages have a light (white) top instead of the dark hero, so the
  // transparent/white-content treatment would render the bar invisible there.
  // Force the solid, dark-on-white treatment on those routes.
  const pathname = usePathname();
  const lightTopRoutes = ["/setting-expectations", "/privacy-policy", "/terms"];
  const lightTop =
    lightTopRoutes.some((route) => pathname?.startsWith(route)) ?? false;
  const solid = scrolled || lightTop;

  // At the top the bar sits over the dark hero → light content; once condensed
  // White-dominant site: nav content is always black on white. The bar is
  // transparent over the white hero and gains a frosted backdrop on scroll.
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[20] border-b transition-colors duration-[240ms] [transition-timing-function:var(--ease-out-soft)] ${
          scrolled
            ? "border-line bg-white/95"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-[var(--nav-h)] items-center justify-between px-[var(--gutter)]">
          <Button
            href={primaryCta.href}
            variant={solid ? "primary" : "inverse"}
            size="md"
            /* Mobile: compact, wraps to two lines, capped width so it can't
               crowd out the logo. Desktop (sm+): single line, full size. */
            className="max-w-[9.5rem] whitespace-normal! px-2.5 py-1.5 h-auto min-h-10 text-center text-[0.72rem] leading-[1.2] sm:max-w-none sm:whitespace-nowrap! sm:h-12 sm:min-h-0 sm:px-7 sm:py-0 sm:text-[0.95rem] sm:leading-normal"
            data-cursor="cta"
            target="_blank"
            rel="noreferrer"
          >
            {primaryCta.label}
          </Button>

          <div className="flex items-center gap-2 sm:gap-4">
            <Logo onDark={!solid} />
            <MenuButton
              ref={triggerRef}
              isOpen={open}
              onClick={toggle}
              controlsId={MENU_ID}
              onDark={!solid}
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MenuOverlay id={MENU_ID} onClose={close} />}
      </AnimatePresence>
    </>
  );
}
