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
  primary: { label: "Book your free strategy session", href: FORM_LINK },
  // In-page jump to the video testimonials section (id="work").
  secondary: { label: "See our work", href: "#work" },
  scrollCue: "Scroll",
} as const;
