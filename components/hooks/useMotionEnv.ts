"use client";

import { useEffect, useState } from "react";

/**
 * Client-only environment flags for graceful 3D-animation degradation:
 * - `small`: viewport < 768px → halve entrance rotation intensity.
 * - `touch`: pointer can't hover → skip the JS mousemove tilt entirely.
 *
 * Defaults are the "full effect" values (small: false) so SSR/first paint
 * matches the desktop case; the effect corrects on mount before any
 * scroll-triggered entrance fires.
 */
export function useMotionEnv() {
  const [env, setEnv] = useState({ small: false, touch: false });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const touch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const update = () => setEnv({ small: mq.matches, touch });
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return env;
}
