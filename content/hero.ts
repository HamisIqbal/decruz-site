import { FORM_LINK } from "./site";

/** Hero copy. Focus: helping contractors grow through marketing. */
export const hero = {
  eyebrow: "Construction Marketing Studio",
  // Headline split into lines so the mask-reveal animates line by line.
  // `accent` marks the word rendered in blush.
  headline: [
    [{ text: "We help contractors" }],
    [
      { text: "build " },
      { text: "demand", accent: true },
      { text: ", not just buildings." },
    ],
  ],
  description:
    "deCRUZ turns your work into a brand, a site, and a pipeline of qualified leads. Marketing engineered for builders who want to grow.",
  primary: { label: "Start your project", href: FORM_LINK },
  secondary: { label: "See our work", href: FORM_LINK },
  scrollCue: "Scroll",
} as const;
