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
      "A full brand refresh paired with on-site video that shows the quality of their builds.",
    services: ["Branding", "Video"],
  },
  {
    id: "trujillo",
    client: "Trujillo Masonry & Pools",
    category: "Masonry & Pools",
    summary:
      "Cinematic project videography that lets their craftsmanship sell before the first call.",
    services: ["Video", "Branding"],
  },
  {
    id: "intrepid",
    client: "Intrepid Plastering",
    category: "Plastering",
    summary:
      "A clean brand identity, sharp graphic design, and a consistent social presence that keeps a specialist trade top of mind across the Valley.",
    services: ["Branding", "Graphic Design", "Social"],
  },
  {
    id: "ark-ranch",
    client: "Ark Ranch Construction",
    category: "Construction",
    summary:
      "Cinematic video and photography built to match the scale of their projects and attract bigger, better-fit clients.",
    services: ["Strategy", "Video", "Photography"],
  },
  {
    id: "bcc",
    client: "Bakersfield Concrete Coatings",
    category: "Concrete Coatings",
    summary:
      "Targeted Meta ad campaigns and sharp visuals that turned a niche coating service into the first name homeowners find.",
    services: ["Meta Ads", "Photography", "Social"],
  },
  {
    id: "absolute-tile",
    client: "Absolute Tile Kitchen and Bath",
    category: "Tile, Kitchen & Bath",
    summary:
      "Facebook and Instagram ad campaigns and polished photography that fill the pipeline with kitchen and bath remodels.",
    services: ["Social", "Meta Ads", "Photography"],
  },
  {
    id: "whitestone",
    client: "Whitestone Construction and Cabinetry",
    category: "Construction & Cabinetry",
    summary:
      "Meta ads and on-brand social content, backed by photography that showcases their custom cabinetry and builds.",
    services: ["Social", "Meta Ads", "Photography"],
  },
];
