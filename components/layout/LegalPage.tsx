import type { ReactNode } from "react";

/**
 * Shared shell for long-form legal documents (Privacy Policy, Terms of
 * Service). White surface, dark ink — the fixed site header is forced into its
 * solid dark-on-white treatment on these routes (see Header `lightTop`).
 *
 * Responsive by design — must read correctly on phone, tablet, laptop, and
 * wide desktop:
 *  - Mobile / tablet: single column, title block stacked above the body.
 *  - Laptop / desktop (lg+): a two-column grid inside the full `.shell`
 *    (1200px) container — a sticky title/meta rail on the left, the document
 *    body on the right. The body is capped at a comfortable ~68ch reading
 *    measure (NOT the whole page), so wide screens feel intentional instead of
 *    a lone narrow column, while line length stays legible.
 *
 * Body copy is intentionally LEFT-aligned: the site's default centre-alignment
 * hurts readability across multi-paragraph legal text, so these pages take the
 * sensible exception. Type stays rem-based and the page keeps the standard
 * `var(--gutter)` frame. Element styling is applied once here via descendant
 * selectors so each page can be written as clean semantic markup.
 */
export function LegalPage({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-white text-ink">
      <div className="shell grid grid-cols-1 gap-x-16 gap-y-10 pt-[calc(var(--nav-h)+clamp(56px,10vh,120px))] pb-[clamp(72px,12vh,160px)] lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        {/* Title rail — becomes a sticky sidebar on laptop/desktop. */}
        <header className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start">
          <p className="eyebrow mb-4">Decruz Marketing</p>
          <h1 className="font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[0.8rem] uppercase tracking-[0.12em] text-ink-muted">
            Effective Date: {effectiveDate}
          </p>
        </header>

        {/* Document body — capped at a readable measure, left-aligned. */}
        <div
          className="
            max-w-[68ch] border-t border-line pt-8 text-[1.0625rem] leading-[1.7] text-ink-soft lg:border-t-0 lg:pt-0
            [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-[1.5rem] [&_h2]:font-semibold [&_h2]:leading-[1.15] [&_h2]:tracking-[-0.01em] [&_h2]:text-ink first:[&_h2]:mt-0
            [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-[1.15rem] [&_h3]:font-semibold [&_h3]:text-ink
            [&_p]:mt-4
            [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5
            [&_li]:pl-1
            [&_strong]:font-semibold [&_strong]:text-ink
            [&_a]:font-medium [&_a]:text-rose [&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-rose-press
          "
        >
          {children}
        </div>
      </div>
    </main>
  );
}
