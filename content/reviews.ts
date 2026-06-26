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
    name: "Omar T.",
    company: "MIM Construction",
    quote:
      "They handled the site, the branding, and the ads and made it painless. Worth every dollar and then some.",
  },
  {
    id: "r5",
    name: "Cameron W.",
    company: "Bakersfield Concrete Coatings",
    quote:
      "We went from invisible online to the first contractor people find. It completely changed how we win bids.",
  },
  {
    id: "r6",
    name: "Ruben T.",
    company: "Trujillo Masonry & Pools",
    quote:
      "Professional, fast, and they actually get contractors. Easily the best marketing decision we've made.",
  },
];

export const reviewsIntro = {
  eyebrow: "Rated 5 stars",
  heading: "What contractors say about working with us.",
} as const;
