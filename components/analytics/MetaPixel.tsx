"use client";

import Script from "next/script";
import { useEffect } from "react";
import { META_PIXEL_ID, trackFormCtaClick } from "@/lib/meta-pixel";
import { FORM_LINK } from "@/content/site";

/**
 * Meta (Facebook) Pixel loader + the site's single tracked conversion.
 *
 * - Injects the pixel base code once (afterInteractive, the strategy Meta
 *   recommends for analytics tags — loads early but never blocks first paint).
 * - The base snippet fires ONE `PageView` so Meta registers the pixel as active.
 *   We deliberately do NOT re-fire PageView on client-side route changes: the
 *   client only wants to measure form click-throughs, not page views, so extra
 *   PageViews would just be noise.
 * - The one conversion we track is a click on any link to the Instagram-bio
 *   strategy-session form (see the delegated listener below).
 * - `autoConfig=false` (set before init) disables Meta's automatic event
 *   detection, so it stops auto-firing `SubscribedButtonClick`/microdata events
 *   on every button — the only events sent are the ones we fire explicitly.
 *
 * No-ops entirely when `NEXT_PUBLIC_META_PIXEL_ID` is unset, so it's safe to
 * leave mounted before the ID is configured.
 *
 * CONSENT: the init snippet calls `fbq('consent','revoke')` before `init`
 * unless this visitor has already chosen "granted" (persisted in localStorage),
 * so on a first visit the pixel loads but holds every event until they accept.
 * The cookie banner (components/analytics/CookieConsent.tsx) releases or keeps
 * holding events via `storeConsent()` in lib/meta-pixel.ts.
 */
export function MetaPixel() {
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
        fbq('set', 'autoConfig', false, '${META_PIXEL_ID}');
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
