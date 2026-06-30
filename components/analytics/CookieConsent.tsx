"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { META_PIXEL_ID, getStoredConsent, storeConsent } from "@/lib/meta-pixel";

/**
 * GDPR/ePrivacy cookie-consent gate for the Meta Pixel.
 *
 * On a first visit the pixel loads in a `consent('revoke')` state (see
 * MetaPixel.tsx), so nothing is sent to Meta until the visitor chooses here:
 *  - Accept  → `storeConsent("granted")` releases the held events.
 *  - Decline → `storeConsent("denied")` keeps the pixel in its no-send state.
 * The choice is persisted in localStorage, so the banner only appears until a
 * decision is made. No pixel ID configured → nothing to consent to, no banner.
 *
 * Rendered after the first paint (state starts hidden) to avoid an SSR/client
 * mismatch, since the decision lives in localStorage which only exists client-side.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (META_PIXEL_ID && getStoredConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  function decide(choice: "granted" | "denied") {
    storeConsent(choice);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] px-[var(--gutter)] pb-[max(env(safe-area-inset-bottom),16px)] pt-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <p className="text-sm leading-[1.6] text-ink-soft">
          We use cookies to measure ad performance via the Meta Pixel. Accept to
          help us improve how we reach contractors like you, or decline to keep
          tracking off.
        </p>

        <div className="flex shrink-0 gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => decide("denied")}
          >
            Decline
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => decide("granted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
