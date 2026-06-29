/**
 * Meta (Facebook) Pixel — typed browser-side helpers.
 *
 * The pixel base code (loaded in `components/analytics/MetaPixel.tsx`) defines
 * the global `fbq()` function. These wrappers give us a type-safe way to fire
 * events from anywhere in the app without sprinkling `window.fbq` casts around.
 *
 * Pixel ID comes from `NEXT_PUBLIC_META_PIXEL_ID`. When it's unset (e.g. local
 * dev, or before the client provides one) every helper is a safe no-op, so the
 * site works identically with or without tracking configured.
 *
 * Adding a new conversion event later is a one-liner at the call site, e.g.:
 *   import { track } from "@/lib/meta-pixel";
 *   track("Lead", { content_name: "Contact form" });
 * No change to this file or the loader is needed.
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** Standard events Meta recognises out of the box (used for optimisation/reporting). */
export type MetaStandardEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "CompleteRegistration"
  | "Contact"
  | "Schedule"
  | "SubmitApplication"
  | "Search";

/** Loosely-typed event parameters — Meta accepts an open-ended object. */
export type MetaEventParams = Record<string, unknown>;

type Fbq = (
  command: "init" | "track" | "trackCustom" | "consent",
  ...args: unknown[]
) => void;

declare global {
  interface Window {
    fbq?: Fbq & { callMethod?: (...args: unknown[]) => void; queue?: unknown[] };
    _fbq?: unknown;
  }
}

/** True once the pixel is configured and `fbq` is available on the page. */
function ready(): boolean {
  return typeof window !== "undefined" && !!META_PIXEL_ID && typeof window.fbq === "function";
}

/** Fire a Meta *standard* event (recommended — these power ad optimisation). */
export function track(event: MetaStandardEvent, params?: MetaEventParams): void {
  if (!ready()) return;
  window.fbq!("track", event, params);
}

/** Fire a *custom* event — use only when no standard event fits the action. */
export function trackCustom(event: string, params?: MetaEventParams): void {
  if (!ready()) return;
  window.fbq!("trackCustom", event, params);
}

/** Manually fire a PageView — used for client-side route changes (SPA navigation). */
export function pageview(): void {
  if (!ready()) return;
  window.fbq!("track", "PageView");
}

/**
 * Grant or revoke tracking consent (for a cookie-consent gate).
 * Call `consent("revoke")` *before* the pixel loads to hold events until the
 * user accepts, then `consent("grant")` once they do.
 */
export function consent(action: "grant" | "revoke"): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("consent", action);
}
