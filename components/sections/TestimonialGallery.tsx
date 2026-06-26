"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  testimonials,
  testimonialIntro,
  type Testimonial,
} from "@/content/testimonials";

/**
 * Insert a Cloudinary transformation into a delivery URL (after `/upload/`).
 * Lets us serve a light, width-capped clip for the hover preview and an
 * optimized full-resolution stream in the spotlight, from the same source.
 */
function cld(url: string | undefined, transform: string): string | undefined {
  return url?.replace("/upload/", `/upload/${transform}/`);
}

// Muted hover loop: width-capped + trimmed to the first 6s → ~0.8MB, so it
// streams in fast. The full clip plays (with sound) in the spotlight.
const PREVIEW_TF = "f_auto,q_auto,w_640,c_limit,du_6";
// Grid posters: cards are narrow (≤3-up), so a smaller width keeps each
// transform light, and `so_0` pulls the first frame — far cheaper for
// Cloudinary to generate than its default mid-clip frame, so they paint fast.
const POSTER_TF = "f_auto,q_auto,w_540,c_limit,so_0";
const FULL_TF = "f_auto,q_auto"; // spotlight playback (with sound)

export function TestimonialGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // GSAP ScrollTrigger: entrance + exit + reverse (both scroll directions).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".tcard");
      gsap.set(cards, { y: 64, opacity: 0 });

      ScrollTrigger.batch(cards, {
        start: "top 86%",
        onEnter: (b) =>
          gsap.to(b, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
          }),
        onLeave: (b) =>
          gsap.to(b, {
            y: -48,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.in",
            overwrite: true,
          }),
        onEnterBack: (b) =>
          gsap.to(b, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true,
          }),
        onLeaveBack: (b) =>
          gsap.to(b, {
            y: 64,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.in",
            overwrite: true,
          }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  // Wrap-around navigation between clips while the spotlight is open.
  const navigate = useCallback(
    (dir: number) =>
      setOpenIndex((i) =>
        i === null
          ? i
          : (i + dir + testimonials.length) % testimonials.length,
      ),
    [],
  );
  const prev = useCallback(() => navigate(-1), [navigate]);
  const next = useCallback(() => navigate(1), [navigate]);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-[var(--nav-h)] bg-white py-[clamp(80px,11vh,160px)] text-ink"
    >
      <div className="px-[var(--gutter)]">
        <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="eyebrow">{testimonialIntro.eyebrow}</span>
          <h2
            id="testimonials-heading"
            className="text-balance font-display text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[2.4rem] lg:text-[3rem]"
          >
            {testimonialIntro.heading}
          </h2>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.id} className="tcard">
              <TestimonialCard t={t} onOpen={() => setOpenIndex(i)} />
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <TestimonialSpotlight
            t={testimonials[openIndex]}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function TestimonialCard({
  t,
  onOpen,
}: {
  t: Testimonial;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);

  // React does not reliably set the `muted` DOM *property* from the attribute,
  // which makes the browser treat hover-autoplay as "unmuted" and block it.
  // Force it muted imperatively so the silent preview is allowed to play.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  // Pause + reset whenever the card scrolls out of view.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
          setActive(false);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(card);
    return () => io.disconnect();
  }, []);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    setActive(true);
    v.play().catch(() => {
      /* network/codec hiccup — poster stays; spotlight click still works */
    });
  };
  const stop = () => {
    setActive(false);
    videoRef.current?.pause();
  };

  const previewSrc = cld(t.videoSrc, PREVIEW_TF);
  const posterSrc = cld(t.poster, POSTER_TF);

  return (
    <button
      ref={cardRef}
      type="button"
      data-cursor="video"
      aria-label={`Watch testimonial from ${t.name}, ${t.company}`}
      onClick={onOpen}
      onPointerEnter={play}
      onPointerLeave={stop}
      onFocus={play}
      onBlur={stop}
      className="group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-md border border-line bg-black text-left text-white focus-visible:outline-none"
    >
      {/* Poster as a real <img>: lazy-loaded (off-screen cards don't fetch
          until near the viewport) and faded in, so the card never sits as a
          bare black box waiting on the video's poster attribute. */}
      {posterSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onLoad={() => setPosterLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            posterLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] [transition-timing-function:var(--ease-out-soft)] ${
          active ? "scale-[1.05]" : "scale-100"
        }`}
      >
        {previewSrc ? <source src={previewSrc} /> : null}
      </video>

      {/* Legibility gradient */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
      />

      {/* Click-to-watch affordance (audio + fullscreen live in the spotlight) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-black/30 backdrop-blur-sm transition-[transform,background-color] duration-300 group-hover:scale-110 group-hover:bg-black/50">
          <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-white" />
        </span>
      </span>

      {/* Live indicator (silent preview playing) */}
      <span
        aria-hidden="true"
        className={`absolute right-4 top-4 flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-blush" />
        Muted preview
      </span>

      {/* Caption */}
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
        <span className="font-display text-lg font-semibold leading-tight">
          {t.name}
        </span>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-paper-muted">
          {t.role ? `${t.role} · ${t.company}` : t.company}
        </span>
        {t.quote ? (
          <span className="mt-2 max-w-[26ch] text-sm text-paper-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            “{t.quote}”
          </span>
        ) : null}
      </span>
    </button>
  );
}

/**
 * Fullscreen spotlight for a single testimonial. Opens on card click with the
 * full-resolution clip and native controls (scrub timeline · volume/mute ·
 * fullscreen), plus a close button, ESC, and click-outside to dismiss. Body
 * scroll is locked while open (scrollbar width compensated to avoid a shift).
 */
function TestimonialSpotlight({
  t,
  onClose,
  onPrev,
  onNext,
}: {
  t: Testimonial;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipe = useRef<{ x: number; y: number; onVideo: boolean } | null>(null);

  // Lock body scroll while open (scrollbar width compensated → no layout shift).
  useEffect(() => {
    const { body, documentElement: html } = document;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, []);

  // Keyboard: ESC closes, ←/→ navigate between clips.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  // Move focus to the close button when the spotlight first opens.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // (Re)start playback with sound on open and on every navigation. Keyed on
  // t.id so it re-runs per clip; combined with the remounting `<video key>`
  // below, each clip gets a fresh, fully-seekable timeline — fixing clips whose
  // scrubber was stuck because the element was reused from a previous source.
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.play().catch(() => {});
    }
  }, [t.id]);

  const src = cld(t.videoSrc, FULL_TF);
  const posterSrc = cld(t.poster, POSTER_TF);

  // Swipe-to-navigate on touch — but ignore gestures that begin on the video
  // so the native scrubber/controls keep working.
  const onPointerDown = (e: React.PointerEvent) => {
    const onVideo = !!(e.target as Element).closest?.("[data-spot-video]");
    swipe.current = { x: e.clientX, y: e.clientY, onVideo };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s || s.onVideo) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) {
      if (dx < 0) onNext();
      else onPrev();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Testimonial from ${t.name}, ${t.company}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* Backdrop — click to close */}
      <button
        type="button"
        aria-label="Close video"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-md"
      />

      {/* Prev / Next — overlaid at the screen edges (works on mobile too). */}
      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={onPrev}
        data-cursor="nav"
        className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black focus-visible:outline-none sm:left-5 sm:h-14 sm:w-14"
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        onClick={onNext}
        data-cursor="nav"
        className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black focus-visible:outline-none sm:right-5 sm:h-14 sm:w-14"
      >
        <ChevronRight className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </button>

      {/* Dialog */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-h-full w-full max-w-[min(1100px,92vw)] flex-col items-center"
      >
        {/* `key` remounts the element per clip → clean, seekable timeline.
            preload="auto" loads enough to make the scrubber usable immediately. */}
        <motion.video
          key={t.id}
          data-spot-video=""
          ref={videoRef}
          src={src}
          poster={posterSrc}
          controls
          autoPlay
          playsInline
          preload="auto"
          controlsList="nodownload noplaybackrate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="max-h-[72vh] w-auto max-w-full rounded-md bg-black shadow-2xl sm:max-h-[82vh]"
        />

        <p className="mt-4 max-w-[80vw] text-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/70">
          {t.name}
          {t.role || t.company ? " · " : ""}
          {t.role ? `${t.role}, ` : ""}
          {t.company}
        </p>

        {/* Close (cross) */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -right-2 -top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black focus-visible:outline-none sm:-right-4 sm:-top-4"
        >
          <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </motion.div>
    </motion.div>
  );
}
