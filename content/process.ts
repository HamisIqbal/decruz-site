/**
 * "How we work" — the four-step engagement shown on the Services page.
 */
export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processIntro = {
  eyebrow: "How we work",
  heading: "A simple path to a full pipeline.",
} as const;

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We learn your trade, your market, and the jobs you actually want, then audit where leads are leaking today.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "You get a clear, contractor-specific plan: brand, site, channels, and the numbers that define success.",
  },
  {
    step: "03",
    title: "Launch",
    description:
      "We build and ship the brand, website, content, and campaigns, engineered to turn attention into booked work.",
  },
  {
    step: "04",
    title: "Optimize",
    description:
      "We track what converts, double down on it, and report in plain language, so growth compounds month over month.",
  },
];
