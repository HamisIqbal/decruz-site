import { Hero } from "@/components/hero/Hero";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { TestimonialGallery } from "@/components/sections/TestimonialGallery";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { SocialProof } from "@/components/sections/SocialProof";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <TestimonialGallery />
      <ReviewsSection />
      <BrandStatement />
      <WhyChooseSection />
      <SocialProof />
      <CtaSection />
    </main>
  );
}
