"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { projects, projectsIntro } from "@/content/projects";
import { MotionCard } from "@/components/ui/MotionCard";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const header: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

/**
 * Projects / case-study grid. Reuses the shared {@link MotionCard} so the cards
 * get the same cursor-tilt, blush glow, scroll parallax, and staggered entrance
 * (replays each re-entry) as the home page card sections — keeping the site
 * cohesive. Content centered + rem-typed per the site's layout rules.
 */
export function ProjectsGrid() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="projects-heading"
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
          <span className="eyebrow">{projectsIntro.eyebrow}</span>
          <h2
            id="projects-heading"
            className="text-balance font-display text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[2.4rem] lg:text-[3rem]"
          >
            {projectsIntro.heading}
          </h2>
        </motion.header>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.id} className="[perspective:1000px]">
              <MotionCard index={i}>
                <article className="group flex h-full flex-col items-center rounded-md border border-line bg-white p-7 text-center sm:p-8">
                  <span className="eyebrow">{p.category}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-tight tracking-[-0.01em]">
                    {p.client}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-[1.6] text-ink-soft">
                    {p.summary}
                  </p>
                  <ul className="mt-5 flex flex-wrap justify-center gap-2">
                    {p.services.map((s) => (
                      <li
                        key={s}
                        className="rounded-pill border border-line px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </MotionCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
