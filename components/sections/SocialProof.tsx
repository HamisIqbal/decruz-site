import Image from "next/image";
import { socialProof, type ClientLogo } from "@/content/clients";

/**
 * High-trust logo showcase as two infinite marquees: a headlined
 * "Trusted By Top Contractors" row followed by a second, unheadlined row.
 * Logos sit in their
 * own white boxes, shown in full colour at all times (no grayscale/hover filter)
 * so they read correctly on touch devices too. Pure-CSS marquee (`.marquee` in
 * globals.css); the global
 * reduced-motion gate freezes it, and rows pause when hovered.
 *
 * Each row renders its logo set twice so a -50% translate loops seamlessly;
 * the duplicate copy is aria-hidden so screen readers hear each client once.
 */
export function SocialProof() {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="overflow-hidden bg-white py-[clamp(80px,11vh,160px)] text-ink"
    >
      <h2 id="social-proof-heading" className="sr-only">
        Trusted by top contractors and leading brands
      </h2>

      <LogoRow
        heading={socialProof.contractors.heading}
        logos={socialProof.contractors.logos}
      />

      <LogoRow
        logos={socialProof.brands.logos}
        reverse
        className="mt-6"
      />
    </section>
  );
}

function LogoRow({
  heading,
  logos,
  reverse = false,
  className = "",
}: {
  heading?: string;
  logos: ClientLogo[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {heading ? (
        <h3 className="px-[var(--gutter)] text-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
          {heading}
        </h3>
      ) : null}

      {/* Full-bleed marquee with soft edge fades. */}
      <div className={`marquee-hover-pause relative ${heading ? "mt-6" : ""} [--marquee-duration:48s] [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]`}>
        <div className={`marquee${reverse ? " marquee-reverse" : ""}`}>
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-stretch">
              {logos.map((logo, i) => (
                <li key={`${copy}-${i}`} className="px-2 sm:px-3">
                  <div className="flex h-32 w-40 items-center justify-center rounded-md border border-line bg-white px-6 sm:h-40 sm:w-52 sm:px-8">
                    <Image
                      src={logo.src}
                      alt={copy === 0 ? logo.name : ""}
                      width={160}
                      height={80}
                      className="h-auto max-h-20 w-auto max-w-full object-contain sm:max-h-24"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
