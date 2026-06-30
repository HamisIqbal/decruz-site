/**
 * Client logos for the "Builders we've worked with" marquee.
 * Files live in /public/clients (copied from the brand-supplied logo set).
 * `name` is used only for the accessible alt text.
 */
export type ClientLogo = { src: string; name: string };

export const clientLogos: ClientLogo[] = [
  { src: "/clients/client-01.webp", name: "deCRUZ client" },
  { src: "/clients/client-02.webp", name: "deCRUZ client" },
  { src: "/clients/client-03.webp", name: "deCRUZ client" },
  { src: "/clients/client-04.webp", name: "ARK Ranch" },
  { src: "/clients/client-05.webp", name: "deCRUZ client" },
  { src: "/clients/client-06.webp", name: "BCC" },
  { src: "/clients/client-07.webp", name: "deCRUZ client" },
  { src: "/clients/client-08.webp", name: "deCRUZ client" },
  { src: "/clients/client-09.webp", name: "deCRUZ client" },
  { src: "/clients/client-10.webp", name: "J&A Home Pro Construction" },
  { src: "/clients/client-11.webp", name: "MIM" },
  { src: "/clients/client-12.webp", name: "OBL Construction" },
  { src: "/clients/client-13.webp", name: "deCRUZ client" },
  { src: "/clients/client-14.webp", name: "deCRUZ client" },
  { src: "/clients/client-15.jpg", name: "Spartan General Construction" },
];

export const clientsIntro = {
  eyebrow: "Trusted partners",
  heading: "Builders we've worked with.",
} as const;

/**
 * Social-proof logo showcase, split into two headlined marquee rows.
 * `contractorLogos` lead (highest-trust contractor clients); `brandLogos`
 * follow as additional partners. Both reuse the brand-supplied logo set.
 */
const split = Math.ceil(clientLogos.length / 2);

export const contractorLogos: ClientLogo[] = clientLogos.slice(0, split);
export const brandLogos: ClientLogo[] = clientLogos.slice(split);

export const socialProof = {
  contractors: { heading: "Trusted By Top Contractors", logos: contractorLogos },
  brands: { heading: "Other Leading Brands", logos: brandLogos },
} as const;
