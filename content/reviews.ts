/**
 * Text-based 5-star reviews shown above the video testimonial gallery.
 *
 * NOTE: the copy below is placeholder — swap in your real Google/Facebook
 * reviews (names, companies, wording). Every card renders a 5-star rating.
 */
export type Review = {
  id: string;
  name: string;
  company: string;
  quote: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Marcus R.",
    company: "Rivera Build Co.",
    quote:
      "From the first call they understood the construction world. Our brand finally looks as good online as the work we do in the field.",
  },
  {
    id: "r2",
    name: "Tanya O.",
    company: "Oakline Remodels",
    quote:
      "Booked out two months ahead now. The leads are real homeowners ready to build, not tire-kickers wasting our time.",
  },
  {
    id: "r3",
    name: "Diego M.",
    company: "All Terrain Roofing",
    quote:
      "Our phone hasn't stopped. deCRUZ turned a quiet pipeline into steady, qualified jobs we actually want to bid.",
  },
  {
    id: "r4",
    name: "Amaar T.",
    company: "MIM Construction",
    quote:
      "We closed about $180,000 worth of ADUs within two months of running ads with deCRUZ — it keeps our crew booked solid.",
  },
  {
    id: "r5",
    name: "Cameron W.",
    company: "Bakersfield Concrete Coatings",
    quote:
      "deCRUZ took me from working part-time to doing this full-time. The steady work they bring in changed everything for my business.",
  },
  {
    id: "r6",
    name: "Angel Trujillo",
    company: "Trujillo Masonry & Pools",
    quote:
      "deCRUZ made us around $300,000 in projects within three months of running ads — and the leads haven't slowed down since.",
  },
  {
    id: "r7",
    name: "Oscar Chavez",
    company: "Whitestone Construction & Cabinetry",
    quote:
      "I closed $169,000 in just four months of running ads with deCRUZ — $48,000 of that was pure profit from their ads alone.",
  },
];

export const reviewsIntro = {
  eyebrow: "Rated 5 stars",
  heading: "What contractors say about working with us.",
} as const;
