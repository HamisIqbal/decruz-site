"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Target,
  BarChart3,
  Share2,
  Camera,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { services, servicesIntro, servicesCta } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { MotionCard } from "@/components/ui/MotionCard";

// easeOutExpo — matches the card entrance curve for a cohesive feel.
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const icons: Record<string, LucideIcon> = {
  Target,
  BarChart3,
  Share2,
  Camera,
};

// Header: fade in + slide up 50px → 0, 0.8s easeOutExpo, animates before the cards.
const header: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

// CTA: fade + scale up from 0.8 → 1, 0.5s, after the four cards have cascaded in.
const ctaPop: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.6 },
  },
};

/**
 * "Our Marketing Services" — four service verticals as icon cards. The heading
 * reveals first, then the cards cascade in (fade + rise + slight 3D rotate/scale)
 * via the shared {@link MotionCard}, which also adds cursor-follow tilt, a soft
 * blush highlight, and gentle scroll parallax. Layout, type, and copy are
 * unchanged — this is motion only. (Intentionally no SEO offering.)
 */
export function ServicesSection() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="services-heading"
      className="bg-white py-[clamp(80px,11vh,160px)] text-ink"
    >
      <div className="px-[var(--gutter)]">
        <motion.header
          variants={header}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
        >
          <span className="eyebrow">{servicesIntro.eyebrow}</span>
          <h2
            id="services-heading"
            className="text-balance font-display text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[2.4rem] lg:text-[3rem]"
          >
            {servicesIntro.heading}
          </h2>
        </motion.header>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <li key={service.title} className="[perspective:800px]">
                <MotionCard index={i}>
                  <div className="group relative flex h-full flex-col items-center rounded-md border border-line bg-white p-7 text-center transition-[transform,box-shadow,border-color] duration-[280ms] [transition-timing-function:var(--ease-out-soft)] hover:-translate-y-2.5 hover:scale-[1.02] hover:border-black/25 hover:shadow-xl sm:p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-line text-ink transition-[background-color,transform] duration-[280ms] [transition-timing-function:var(--ease-out-soft)] group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blush-wash">
                      <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold leading-tight tracking-[-0.01em]">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.6] text-ink-soft">
                      {service.description}
                    </p>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="absolute right-6 top-7 h-5 w-5 translate-y-1 text-ink-muted opacity-0 transition-[opacity,transform] duration-[250ms] group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </div>
                </MotionCard>
              </li>
            );
          })}
        </ul>

        <motion.div
          variants={ctaPop}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Magnetic strength={18}>
            <Button
              href={servicesCta.href}
              variant="primary"
              size="lg"
              data-cursor="cta"
              target="_blank"
              rel="noreferrer"
            >
              {servicesCta.label}
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
