import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "deCRUZ is a construction marketing studio founded by a family of builders. Meet the team behind the brand, sites, and demand we build for contractors.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="Who we are"
        title="Built by builders, for builders."
        subtext="deCRUZ comes from a family of contractors. We build brands, websites, and demand for the trades, with the same pride you bring to the job site."
      />
      <AboutSection />
      <StatsSection />
      <WhyChooseSection />
      <CtaSection />
    </main>
  );
}
