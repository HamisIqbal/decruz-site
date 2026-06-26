import { FORM_LINK, contact, socials } from "./site";

export type NavItem = {
  label: string;
  href: string;
};

/** Primary menu items shown in the fullscreen overlay. */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
];

/** Contact + social shown in the overlay footer. */
export const overlayMeta = {
  email: contact.email,
  phone: contact.phoneDisplay,
  phoneTel: contact.phoneTel,
  socials,
};

export const primaryCta = {
  label: "Book your free strategy session",
  href: FORM_LINK,
};
