import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { SocialProof } from "@/components/sections/SocialProof";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A look at the contractors deCRUZ has helped grow, from brand and website to the videos and campaigns that book the next job.",
};

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Portfolio"
        title="Builders we've put on the map."
        subtext="A look at the contractors we've helped grow, from brand and website to the videos and campaigns that book the next job."
      />
      <ProjectsGrid />
      <SocialProof />
      <CtaSection />
    </main>
  );
}
