import { navItems } from "./nav";
import { contact as siteContact, socials, FORM_LINK } from "./site";

/** Footer content. Reuses nav + the shared site contact data. */
export const footer = {
  tagline: "Construction marketing that builds demand, not just buildings.",
  columns: [
    { title: "Navigate", links: navItems },
    {
      title: "Services",
      links: [
        { label: "Brand & Identity", href: FORM_LINK },
        { label: "Websites", href: FORM_LINK },
        { label: "Lead Generation", href: FORM_LINK },
        { label: "Content & Video", href: FORM_LINK },
      ],
    },
  ],
  contact: {
    email: siteContact.email,
    phone: siteContact.phoneDisplay,
    phoneTel: siteContact.phoneTel,
  },
  socials,
  legal: {
    studio: "Construction Marketing Studio",
    est: "EST. 2019",
    place: "California",
  },
} as const;
