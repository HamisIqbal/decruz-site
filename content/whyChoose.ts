/**
 * "Why Contractors Choose deCRUZ" — six trust pillars rendered as cards.
 * `icon` is a lucide-react icon name resolved in the WhyChooseSection component
 * (kept as a string so this stays a plain data module).
 */
export type WhyChooseItem = {
  icon:
    | "Award"
    | "Target"
    | "Users"
    | "MessageSquare"
    | "Headphones"
    | "Wrench";
  title: string;
  description: string;
};

export const whyChooseIntro = {
  eyebrow: "Why deCRUZ",
  heading: "Why Contractors Choose deCRUZ",
} as const;

export const whyChooseItems: WhyChooseItem[] = [
  {
    icon: "Award",
    title: "Proven Track Record",
    description:
      "Campaigns built specifically for contractors, with real results we can put in front of you.",
  },
  {
    icon: "Target",
    title: "Tailored Solutions",
    description:
      "No templates. Every strategy is engineered around your trade, your market, and your growth goals.",
  },
  {
    icon: "Users",
    title: "Client-Centric Focus",
    description:
      "Your pipeline is the priority. We measure success by the jobs you win, not vanity metrics.",
  },
  {
    icon: "MessageSquare",
    title: "Transparent Communication",
    description:
      "Clear reporting and honest updates. You always know exactly where your money is going.",
  },
  {
    icon: "Headphones",
    title: "Dedicated Support",
    description:
      "A real team that answers fast and treats the growth of your business like it's our own.",
  },
  {
    icon: "Wrench",
    title: "Industry Expertise",
    description:
      "We speak construction. Marketing that understands how contractors actually get hired.",
  },
];
