import { FORM_LINK, contact } from "./site";

/** Closing CTA copy. Single-minded: book a strategy session. */
export const cta = {
  eyebrow: "Free strategy session",
  // Split for the line-by-line mask reveal; `accent` renders in rose.
  headline: [
    [{ text: "See exactly how" }],
    [{ text: "we'd " }, { text: "grow", accent: true }, { text: " your business." }],
  ],
  subhead:
    "Thirty focused minutes. We'll map where your next leads come from, and what it takes to win them. No pitch, no obligation.",
  primary: { label: "Book Your Free Strategy Session", href: FORM_LINK },
  reassure: "No contracts · No obligation · 30 minutes",
  secondaryLabel: "Prefer email?",
  secondaryLinkText: contact.email,
  secondaryHref: `mailto:${contact.email}`,
} as const;
