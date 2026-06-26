import { Hero } from "@/components/hero/Hero";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { TestimonialGallery } from "@/components/sections/TestimonialGallery";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { SocialProof } from "@/components/sections/SocialProof";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ReviewsSection />
      <TestimonialGallery />
      <BrandStatement />
      <WhyChooseSection />
      <StatsSection />
      <SocialProof />
      <CtaSection />
    </main>
  );
}
