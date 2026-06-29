"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { META_PIXEL_ID, pageview } from "@/lib/meta-pixel";

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
 * CONSENT: if the client decides they need a cookie-consent gate, the cleanest
 * change is to call `consent("revoke")` inside the init snippet below (before
 * `init`), then call `consent("grant")` from your banner's "Accept" handler.
 * See lib/meta-pixel.ts.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fire PageView on client-side route changes (after the initial load).
  useEffect(() => {
    pageview();
    // pathname + search string together identify a unique URL.
  }, [pathname, searchParams]);

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
