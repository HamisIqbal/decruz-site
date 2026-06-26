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

export const testimonials: Testimonial[] = [
  {
    // TODO: filename gives no name/company — confirm who this is.
    id: "featured",
    name: "Featured Client",
    company: "deCRUZ",
    poster: `${CLOUD}/v1782428308/testimonial_qeywiq.jpg`,
    videoSrc: `${CLOUD}/v1782428308/testimonial_qeywiq.mp4`,
  },
  {
    id: "tapia",
    name: "Omar Tapia",
    role: "Owner",
    company: "MIM Construction",
    poster: `${CLOUD}/v1782428408/MIM_Construction_-_Owner_Omar_Tapia_tltax9.jpg`,
    videoSrc: `${CLOUD}/v1782428408/MIM_Construction_-_Owner_Omar_Tapia_tltax9.mp4`,
  },
  {
    id: "diego",
    name: "Diego",
    role: "Owner",
    company: "All Terrain Roofing",
    poster: `${CLOUD}/v1782428380/All_Terrain_Roofing_-_Owner_Diego_pi8tgq.jpg`,
    videoSrc: `${CLOUD}/v1782428380/All_Terrain_Roofing_-_Owner_Diego_pi8tgq.mp4`,
  },
  {
    id: "ruben-trujillo",
    name: "Ruben Trujillo",
    role: "Owner",
    company: "Trujillo Masonry & Pools",
    poster: `${CLOUD}/v1782428420/Trujillo_Masonry_Pools_-_Owner_Ruben_Trujillo_fbmvlc.jpg`,
    videoSrc: `${CLOUD}/v1782428420/Trujillo_Masonry_Pools_-_Owner_Ruben_Trujillo_fbmvlc.mp4`,
  },
  {
    id: "julio",
    name: "Julio",
    role: "Owner",
    company: "Intrepid Plastering",
    poster: `${CLOUD}/v1782428425/Intrepid_Plastering_-_Owner_Julio_1_mdtg0v.jpg`,
    videoSrc: `${CLOUD}/v1782428425/Intrepid_Plastering_-_Owner_Julio_1_mdtg0v.mp4`,
  },
  {
    id: "angel-trujillo",
    name: "Angel Trujillo",
    company: "Trujillo Masonry & Pools",
    poster: `${CLOUD}/v1782428459/Trujillo_Masonry_Pools_-_Angel_Trujillo_lyjda9.jpg`,
    videoSrc: `${CLOUD}/v1782428459/Trujillo_Masonry_Pools_-_Angel_Trujillo_lyjda9.mp4`,
  },
  {
    id: "eliezer",
    name: "Eliezer",
    role: "Co-Owner",
    company: "Ark Ranch Construction",
    poster: `${CLOUD}/v1782428460/Ark_Ranch_Construction_-_Co_Owner__Eliezer_e6szmv.jpg`,
    videoSrc: `${CLOUD}/v1782428460/Ark_Ranch_Construction_-_Co_Owner__Eliezer_e6szmv.mp4`,
  },
  {
    id: "cameron",
    name: "Cameron",
    role: "Owner",
    company: "Bakersfield Concrete Coatings",
    poster: `${CLOUD}/v1782428480/Bakersfield_Concrete_Coatings_-_Owner_-_Cameron_fzls99.jpg`,
    videoSrc: `${CLOUD}/v1782428480/Bakersfield_Concrete_Coatings_-_Owner_-_Cameron_fzls99.mp4`,
  },
];

export const testimonialIntro = {
  eyebrow: "Proof",
  heading: "Builders who stopped being the best-kept secret.",
};
