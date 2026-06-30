import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://decruz.agency"),
  title: {
    default: "deCRUZ | Construction Marketing",
    template: "%s | deCRUZ",
  },
  description:
    "deCRUZ is a construction marketing studio. We turn builders into brands clients can't ignore: brand, site, and demand generation that drives real leads.",
  applicationName: "deCRUZ",
  openGraph: {
    type: "website",
    siteName: "deCRUZ",
    title: "deCRUZ | Construction Marketing",
    description:
      "We turn builders into brands clients can't ignore. Brand, site, and demand generation for construction.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="min-h-full antialiased">
        <MetaPixel />
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
