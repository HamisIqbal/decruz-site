export type Testimonial = {
  id: string;
  name: string;
  /** Optional title (e.g. "Owner"). Rendered as "{role} · {company}". */
  role?: string;
  company: string;
  /** Optional short pull-quote shown under the name on hover. */
  quote?: string;
  poster: string;
  /**
   * Video source (mp4/webm). Hosted on Cloudinary. Hover/focus playback and
   * offscreen pausing work automatically once this is set.
   */
  videoSrc?: string;
};

const CLOUD = "https://res.cloudinary.com/dcsewsmhd/video/upload";

// Ordered highest-impact first (biggest results lead). Posters for the newer
// clips are generated from the video itself (Cloudinary serves a frame when the
// public ID is requested as .jpg).
export const testimonials: Testimonial[] = [
  {
    id: "angel-trujillo",
    name: "Angel Trujillo",
    company: "Trujillo Masonry & Pools",
    quote: "Around $300,000 in projects within three months of running ads.",
    poster: `/testimonials/angel-trujillo.jpg`,
    videoSrc: `${CLOUD}/v1782428459/Trujillo_Masonry_Pools_-_Angel_Trujillo_lyjda9.mp4`,
  },
  {
    id: "v-300k",
    name: "Juan Trujillo",
    role: "Son of Ruben Trujillo",
    company: "Trujillo Masonry & Pools",
    quote: "$300,000 in new projects from running ads.",
    poster: `/testimonials/v-300k.jpg`,
    videoSrc: `${CLOUD}/v1782490430/300k_ruasp3.mp4`,
  },
  {
    id: "oscar",
    name: "Oscar Chavez",
    company: "Whitestone Construction & Cabinetry",
    quote:
      "Closed $169,000 in four months — $48,000 of it pure profit from the ads.",
    poster: `/testimonials/oscar.jpg`,
    videoSrc: `${CLOUD}/v1782490612/Oscar-testimonial_fcmgzt.mp4`,
  },
  {
    id: "v-new",
    name: "Armando",
    company: "Absolute Tile Kitchen and Bath",
    poster: `/testimonials/v-new.jpg`,
    videoSrc: `${CLOUD}/v1782490462/testimonialnew_tcabw7.mp4`,
  },
  {
    // Same person/details as the Cameron clip (id: "cameron"), per client.
    id: "featured",
    name: "Cameron",
    role: "Owner",
    company: "Bakersfield Concrete Coatings",
    poster: `/testimonials/featured.jpg`,
    videoSrc: `${CLOUD}/v1782428308/testimonial_qeywiq.mp4`,
  },
  {
    id: "tapia",
    name: "Omar Tapia",
    role: "Owner",
    company: "MIM Construction",
    poster: `/testimonials/tapia.jpg`,
    videoSrc: `${CLOUD}/v1782428408/MIM_Construction_-_Owner_Omar_Tapia_tltax9.mp4`,
  },
  {
    id: "diego",
    name: "Diego",
    role: "Owner",
    company: "All Terrain Roofing",
    poster: `/testimonials/diego.jpg`,
    videoSrc: `${CLOUD}/v1782428380/All_Terrain_Roofing_-_Owner_Diego_pi8tgq.mp4`,
  },
  {
    id: "ruben-trujillo",
    name: "Ruben Trujillo",
    role: "Owner",
    company: "Trujillo Masonry & Pools",
    poster: `/testimonials/ruben-trujillo.jpg`,
    videoSrc: `${CLOUD}/v1782428420/Trujillo_Masonry_Pools_-_Owner_Ruben_Trujillo_fbmvlc.mp4`,
  },
  {
    id: "julio",
    name: "Julio",
    role: "Owner",
    company: "Intrepid Plastering",
    poster: `/testimonials/julio.jpg`,
    videoSrc: `${CLOUD}/v1782428425/Intrepid_Plastering_-_Owner_Julio_1_mdtg0v.mp4`,
  },
  {
    id: "eliezer",
    name: "Eliezer",
    role: "Co-Owner",
    company: "Ark Ranch Construction",
    poster: `/testimonials/eliezer.jpg`,
    videoSrc: `${CLOUD}/v1782428460/Ark_Ranch_Construction_-_Co_Owner__Eliezer_e6szmv.mp4`,
  },
  {
    id: "cameron",
    name: "Cameron",
    role: "Owner",
    company: "Bakersfield Concrete Coatings",
    poster: `/testimonials/cameron.jpg`,
    videoSrc: `${CLOUD}/v1782428480/Bakersfield_Concrete_Coatings_-_Owner_-_Cameron_fzls99.mp4`,
  },
];

export const testimonialIntro = {
  eyebrow: "Proof",
  heading: "Builders who stopped being the best-kept secret.",
};
