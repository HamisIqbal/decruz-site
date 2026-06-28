/**
 * Text-based 5-star reviews shown above the video testimonial gallery.
 *
 * These mirror the real clients featured in the video testimonial gallery
 * (see content/testimonials.ts) — same names, companies, and trades. Every
 * card renders a 5-star rating.
 */
export type Review = {
  id: string;
  name: string;
  company: string;
  quote: string;
};

export const reviews: Review[] = [
  {
    id: "angel-trujillo",
    name: "Angel Trujillo",
    company: "Trujillo Masonry & Pools",
    quote:
      "deCRUZ made us around $300,000 in projects within three months of running ads — and the leads haven't slowed down since.",
  },
  {
    id: "oscar-chavez",
    name: "Oscar Chavez",
    company: "Whitestone Construction & Cabinetry",
    quote:
      "I closed $162,900 in just four months of running ads with deCRUZ — $48,000 of that was pure profit from their ads alone.",
  },
  {
    id: "omar-tapia",
    name: "Omar Tapia",
    company: "MIM Construction",
    quote:
      "deCRUZ keeps our crew booked solid. The leads come in steady and they're real projects, not tire-kickers wasting our time.",
  },
  {
    id: "diego",
    name: "Diego",
    company: "All Terrain Roofing",
    quote:
      "Our phone hasn't stopped. deCRUZ turned a quiet pipeline into steady, qualified roofing jobs we actually want to bid.",
  },
  {
    id: "armando",
    name: "Armando",
    company: "Absolute Tile, Kitchen and Bath",
    quote:
      "deCRUZ understood our trade from the first call. The work they bring in finally matches the quality we deliver in the field.",
  },
  {
    id: "cameron",
    name: "Cameron",
    company: "Bakersfield Concrete Coatings",
    quote:
      "deCRUZ took me from working part-time to doing this full-time. The steady work they bring in changed everything for my business.",
  },
  {
    id: "julio",
    name: "Julio",
    company: "Intrepid Plastering",
    quote:
      "The leads are real homeowners ready to build. deCRUZ keeps us booked weeks ahead instead of chasing the next job.",
  },
];

export const reviewsIntro = {
  eyebrow: "Rated 5 stars",
  heading: "What contractors say about working with us.",
} as const;
