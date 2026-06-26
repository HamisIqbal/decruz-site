/**
 * Project / case-study cards for the Projects page.
 *
 * NOTE: scope copy below is illustrative of the kind of work deCRUZ delivers —
 * confirm/replace with the real deliverables (and add results, photos, or a
 * case-study link) for each client when available.
 */
export type Project = {
  id: string;
  client: string;
  category: string;
  summary: string;
  services: string[];
};

export const projectsIntro = {
  eyebrow: "Selected work",
  heading: "Work that books the next job.",
} as const;

export const projects: Project[] = [
  {
    id: "mim",
    client: "MIM Construction",
    category: "General Construction",
    summary:
      "A full brand refresh and a fast, modern website, paired with on-site video that shows the quality of their builds.",
    services: ["Branding", "Website", "Video"],
  },
  {
    id: "all-terrain",
    client: "All Terrain Roofing",
    category: "Roofing",
    summary:
      "Lead-focused ad campaigns and social content that put a trusted local roofer in front of ready-to-hire homeowners.",
    services: ["PPC", "Social", "Website"],
  },
  {
    id: "trujillo",
    client: "Trujillo Masonry & Pools",
    category: "Masonry & Pools",
    summary:
      "Cinematic project videography and a portfolio site that lets their craftsmanship sell before the first call.",
    services: ["Video", "Website", "Branding"],
  },
  {
    id: "intrepid",
    client: "Intrepid Plastering",
    category: "Plastering",
    summary:
      "A clean brand identity and a consistent social presence that keeps a specialist trade top of mind across the Valley.",
    services: ["Branding", "Social"],
  },
  {
    id: "ark-ranch",
    client: "Ark Ranch Construction",
    category: "Construction",
    summary:
      "Strategy, site, and content built to match the scale of their projects and attract bigger, better-fit clients.",
    services: ["Strategy", "Website", "Content"],
  },
  {
    id: "bcc",
    client: "Bakersfield Concrete Coatings",
    category: "Concrete Coatings",
    summary:
      "Targeted campaigns and sharp visuals that turned a niche coating service into the first name homeowners find.",
    services: ["PPC", "Photography", "Social"],
  },
];
