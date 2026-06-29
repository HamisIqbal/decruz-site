# Meta Pixel — setup & requirements

Browser-side Meta (Facebook) Pixel is wired into the site. This doc covers what
to provide to go live, and the open decisions to confirm with the client.

## How it's built

- `lib/meta-pixel.ts` — typed helpers: `track()`, `trackCustom()`, `pageview()`, `consent()`.
- `components/analytics/MetaPixel.tsx` — loads the pixel base code + tracks SPA route changes.
- `app/layout.tsx` — mounts `<MetaPixel />` once (inside a `<Suspense>` boundary).
- Pixel ID is read from the env var `NEXT_PUBLIC_META_PIXEL_ID`.

If the ID is unset, **everything is a safe no-op** — the site behaves identically.

## To go live (what we need)

1. **Meta Pixel ID** — the ~15-digit number from
   Events Manager → Data Sources → [pixel] → Settings.
2. Set it as an environment variable:
   - Local: copy `.env.local.example` → `.env.local`, fill in the ID, restart dev.
   - Production (Hostinger): set `NEXT_PUBLIC_META_PIXEL_ID` in the host environment, then rebuild/redeploy.
3. Verify with the **Meta Pixel Helper** Chrome extension — you should see
   `PageView` fire on load and again when navigating between pages.

## Already handled automatically

- **PageView** on first load (pixel base code).
- **PageView** on every in-app navigation (route changes don't reload the page,
  so we fire it manually).

## Open decisions — confirm with the client

### A. Which conversion events to track?

PageView alone tells you traffic, not results. To optimise ad campaigns Meta
needs *conversion* signals. Pick the actions that matter for this site. Each is
a one-line addition at the relevant button/form using `track(...)`.

Candidate events for this site (boxing/construction marketing studio):

| Action on site | Suggested Meta event | Why |
| --- | --- | --- |
| Contact / enquiry form submitted | `Lead` | The core conversion — someone raised their hand. |
| "Book a call" / calendar link clicked | `Schedule` or `Contact` | Strong intent signal. |
| "See our work" / portfolio opened | `ViewContent` | Engagement / mid-funnel signal. |
| Phone number or email clicked (`tel:` / `mailto:`) | `Contact` | Direct outreach. |
| Newsletter / lead-magnet signup | `CompleteRegistration` | If/when one exists. |
| WhatsApp / DM click-through | `Contact` (custom) | If those CTAs are added. |

**Decision needed:** which of these does the client want to count as a
conversion? (We can start with `Lead` on the contact form and add the rest later.)

### B. Cookie-consent gate?

Does the site target EU/UK/EEA visitors, or otherwise need GDPR/ePrivacy
compliance? If yes, the pixel must wait for explicit consent before firing.

- **No gate needed** (e.g. US/non-EU audience): nothing more to do — current setup loads immediately.
- **Gate needed**: we add a cookie banner; the pixel stays in `consent("revoke")`
  state until the visitor accepts, then `consent("grant")` releases queued events.
  (Hook points already exist in `lib/meta-pixel.ts` and `MetaPixel.tsx`.)

**Decision needed:** does the client require a consent banner?

### C. (Future) Conversions API?

Out of scope for now (browser pixel only). If ad-blocker resilience / better
attribution becomes a priority later, we can add server-side CAPI — that needs a
CAPI access token and a server route.

## Wiring an event (reference)

```tsx
"use client";
import { track } from "@/lib/meta-pixel";

// In a form's onSubmit / a button's onClick:
track("Lead", { content_name: "Contact form" });
```
