import { FORM_LINK } from "./site";

/**
 * "Our Marketing Services" — service verticals as icon cards.
 * `icon` is a lucide-react icon name resolved in ServicesSection.
 * (Intentionally no SEO offering.)
 */
export type Service = {
  icon: "Target" | "BarChart3" | "Share2" | "Camera";
  title: string;
  description: string;
};

export const servicesIntro = {
  eyebrow: "What we do",
  heading: "Our Marketing Services",
} as const;

export const services: Service[] = [
  {
    icon: "Target",
    title: "Digital Strategy",
    description:
      "A clear roadmap that turns your goals into a predictable stream of qualified leads.",
  },
  {
    icon: "BarChart3",
    title: "PPC Management",
    description:
      "Targeted ad campaigns that put your business in front of buyers who are ready to hire.",
  },
  {
    icon: "Share2",
    title: "Social Media Management",
    description:
      "Consistent, on-brand content that builds trust and keeps your name top of mind.",
  },
  {
    icon: "Camera",
    title: "Photography & Videography",
    description:
      "Cinematic visuals that make your craftsmanship sell before you say a word.",
  },
];

export const servicesCta = {
  label: "Book Your Free Strategy Session",
  href: FORM_LINK,
} as const;
