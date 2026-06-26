import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessStack } from "@/components/sections/ProcessStack";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand, website, content, and campaigns, built specifically for contractors who want a predictable pipeline of qualified work.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our services"
        title="Marketing engineered for contractors."
        subtext="Brand, website, content, and campaigns, built specifically for contractors who want a predictable pipeline of qualified work."
      />
      <ServicesSection />
      <ProcessStack />
      <CtaSection />
    </main>
  );
}
