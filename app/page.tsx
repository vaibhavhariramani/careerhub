import { PublicNav } from "@/shared/components/marketing/public-nav";
import { Hero } from "@/shared/components/marketing/hero";
import { FeatureGrid } from "@/shared/components/marketing/feature-grid";
import { HowItWorks } from "@/shared/components/marketing/how-it-works";
import { Testimonials } from "@/shared/components/marketing/testimonials";
import { CtaSection } from "@/shared/components/marketing/cta-section";
import { Footer } from "@/shared/components/marketing/footer";
import { siteConfig } from "@/core/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon`,
    },
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
    },
    {
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (web browser)",
      description: siteConfig.description,
      url: siteConfig.url,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
