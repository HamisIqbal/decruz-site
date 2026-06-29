import { ImageResponse } from "next/og";

// deCRUZ favicon — the wordmark on a black tile (matches the site themeColor),
// so the mark stays legible on both light and dark browser chrome. Generated at
// build time and cached. The display face (Clash Display) ships only as .woff2,
// which Satori can't parse, so we render with a bold system grotesque instead —
// close to the brand mark at favicon scale.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
// Required so the icon prerenders to a static file under `output: "export"`.
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffffff",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontFamily:
            "Arial Narrow, Arial, system-ui, Helvetica, sans-serif",
        }}
      >
        deCRUZ
      </div>
    ),
    { ...size },
  );
}
