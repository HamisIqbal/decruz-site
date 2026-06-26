import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

/**
 * Display face — Clash Display (self-hosted from Fontshare).
 * Tight, structural grotesque used with restraint for headlines only.
 * Exposed as `--font-clash` → mapped to the `font-display` utility in globals.css.
 */
export const clashDisplay = localFont({
  src: [
    { path: "./fonts/ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  fallback: ["Arial Narrow", "system-ui", "sans-serif"],
  preload: true,
});

/**
 * Body face — General Sans (self-hosted from Fontshare).
 * Neutral, highly legible grotesque for paragraphs and UI.
 * Exposed as `--font-general` → mapped to the `font-sans` utility.
 */
export const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  preload: true,
});

/**
 * Utility / data face — Geist Mono.
 * Spec-sheet vernacular: eyebrows, labels, counters, project metadata.
 * Exposed as `--font-geist-mono` → mapped to the `font-mono` utility.
 */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});

/** Combined font variable classes for the <html> element. */
export const fontVariables = `${clashDisplay.variable} ${generalSans.variable} ${geistMono.variable}`;
