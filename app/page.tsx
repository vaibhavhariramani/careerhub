import { PublicNav } from "@/shared/components/marketing/public-nav";
import { Hero } from "@/shared/components/marketing/hero";
import { FeatureGrid } from "@/shared/components/marketing/feature-grid";
import { HowItWorks } from "@/shared/components/marketing/how-it-works";
import { Testimonials } from "@/shared/components/marketing/testimonials";
import { CtaSection } from "@/shared/components/marketing/cta-section";
import { Footer } from "@/shared/components/marketing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  );
}
