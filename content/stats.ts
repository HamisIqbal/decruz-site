/**
 * "Results That Speak For Themselves" — headline metrics with a count-up
 * animation on viewport entry (see StatsSection). Values are placeholders.
 */
export type Stat = {
  /** Numeric target the counter animates up to. */
  value: number;
  /** Rendered immediately after the number (e.g. "+", "%"). */
  suffix?: string;
  label: string;
};

export const statsIntro = {
  eyebrow: "By the numbers",
  heading: "Results That Speak For Themselves",
} as const;

export const stats: Stat[] = [
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];
