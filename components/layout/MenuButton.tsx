"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  controlsId: string;
  onDark?: boolean;
};

/**
 * Custom menu trigger — deliberately NOT a 3-line hamburger.
 * Two asymmetric strokes (a typed "index mark") that grow to match on hover
 * and fold into an X when open. Wrapped in a magnetic field on fine pointers.
 */
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton({ isOpen, onClick, controlsId, onDark = false }, ref) {
    const tone = onDark ? "text-white" : "text-ink";

    return (
      <Magnetic strength={10}>
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={controlsId}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          data-cursor="menu"
          className={`group/menu relative flex h-12 items-center gap-3 rounded-pill px-2 ${tone} cursor-pointer focus-visible:outline-none`}
        >
          <span className="hidden font-mono text-[0.85rem] font-medium uppercase tracking-[0.16em] sm:inline">
            {isOpen ? "Close" : "Menu"}
          </span>

          <span
            aria-hidden="true"
            className="relative flex h-5 w-8 flex-col items-end justify-center"
          >
            {/* Top stroke */}
            <motion.span
              className="absolute right-0 h-[2.5px] rounded-full bg-current"
              initial={false}
              animate={
                isOpen
                  ? { width: 32, rotate: 45, y: 0 }
                  : { width: 32, rotate: 0, y: -5 }
              }
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            />
            {/* Bottom stroke — asymmetric (narrower), grows to match on hover */}
            <motion.span
              className="absolute right-0 h-[2.5px] rounded-full bg-current transition-[width] duration-[240ms] [transition-timing-function:var(--ease-out-soft)] group-hover/menu:w-8"
              initial={false}
              animate={
                isOpen
                  ? { width: 32, rotate: -45, y: 0 }
                  : { width: 20, rotate: 0, y: 5 }
              }
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            />
          </span>
        </button>
      </Magnetic>
    );
  }
);
