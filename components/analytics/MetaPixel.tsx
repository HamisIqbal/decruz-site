"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { META_PIXEL_ID, pageview, trackFormCtaClick } from "@/lib/meta-pixel";
import { FORM_LINK } from "@/content/site";

/**
 * Meta (Facebook) Pixel loader + SPA page-view tracking.
 *
 * - Injects the pixel base code once (afterInteractive, the strategy Meta
 *   recommends for analytics tags — loads early but never blocks first paint).
 * - The base snippet fires the initial `PageView` automatically.
 * - App Router navigations are client-side, so they DON'T trigger a fresh page
 *   load. The effect below fires `PageView` on every subsequent route change so
 *   in-app navigation is still counted.
 *
 * No-ops entirely when `NEXT_PUBLIC_META_PIXEL_ID` is unset, so it's safe to
 * leave mounted before the ID is configured.
 *
 * NOTE: this component reads `useSearchParams`, so the caller MUST wrap it in a
 * `<Suspense>` boundary (done in app/layout.tsx) — otherwise Next would force
 * the whole tree to client-render.
 *
 * CONSENT: the init snippet calls `fbq('consent','revoke')` before `init`
 * unless this visitor has already chosen "granted" (persisted in localStorage),
 * so on a first visit the pixel loads but holds every event until they accept.
 * The cookie banner (components/analytics/CookieConsent.tsx) releases or keeps
 * holding events via `storeConsent()` in lib/meta-pixel.ts.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fire PageView on client-side route changes (after the initial load).
  useEffect(() => {
    pageview();
    // pathname + search string together identify a unique URL.
  }, [pathname, searchParams]);

  // The site's single conversion: any click through to the strategy-session
  // form (Instagram-bio link, shared by every "book a session" CTA + footer
  // service links). A delegated listener catches it wherever it's rendered, so
  // we never have to touch each call site. Held by consent-revoke until accept.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (anchor && anchor.getAttribute("href")?.startsWith(FORM_LINK)) {
        trackFormCtaClick();
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!META_PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        try{if(localStorage.getItem('decruz_cookie_consent')!=='granted'){fbq('consent','revoke');}}catch(e){fbq('consent','revoke');}
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
