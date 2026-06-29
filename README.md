# deCRUZ — Construction Marketing

Marketing site for deCRUZ, a construction marketing studio. Built with Next.js
(App Router) and exported as a static site for hosting on any static web host.

## Tech stack

- **Next.js 16** (App Router, static export)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **GSAP** and **Framer Motion** for motion
- **three.js** for the CTA fluid background

## Local development

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Production build

```bash
npm run build
```

This generates a fully static site in the `out/` directory.

## Deployment

The build is a static export (`output: "export"` in `next.config.ts`), so the
contents of `out/` can be uploaded to any static host:

1. Run `npm run build`.
2. Upload everything inside `out/` to the host's web root
   (e.g. GoDaddy cPanel `public_html`).

No Node.js runtime is required on the server.

## Project structure

- `app/` — routes, layout, and metadata (including the generated favicon)
- `components/` — UI, layout, section, and hook components
- `content/` — site copy and data (testimonials, reviews, nav, etc.)
- `lib/` — shared utilities (analytics, text helpers)
- `public/` — static assets (brand, hero, client, and testimonial media)
