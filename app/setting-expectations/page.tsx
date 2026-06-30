import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Setting Expectations Video",
  description: "Setting expectations.",
  // Discreet page — keep it out of search results so it's only reachable
  // via the direct link in the footer.
  robots: { index: false, follow: false },
};

const VIDEO_ID = "Cs3I2UbILKw";

export default function SettingExpectationsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white px-[var(--gutter)] py-24 text-ink">
      <Link href="/" aria-label="deCRUZ — home" className="inline-flex">
        <Image
          src="/brand/decruz-logo.png"
          alt="deCRUZ"
          width={300}
          height={92}
          priority
          className="h-12 w-auto sm:h-14"
        />
      </Link>

      <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-xl border border-line shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${VIDEO_ID}`}
          title="Setting Expectations Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </main>
  );
}
