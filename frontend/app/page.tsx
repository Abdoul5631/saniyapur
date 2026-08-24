import { AboutSection } from "@/components/sections/about-section";
import { CompetenciesSection } from "@/components/sections/competencies-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CorporateHero } from "@/components/sections/corporate-hero";
import { ProductsPreviewSection } from "@/components/sections/products-preview-section";
import { RealisationsPreviewSection } from "@/components/sections/realisations-preview-section";
import { SectorsSection } from "@/components/sections/sectors-section";
import { WhySection } from "@/components/sections/why-section";
import { CorporateHeader } from "@/components/layout/corporate-header";
import { CorporateFooter } from "@/components/layout/corporate-footer";

export default function Home() {
  return <>
    <CorporateHeader />
    <main>
      <CorporateHero />
      <AboutSection />
      <CompetenciesSection />
      <SectorsSection />
      <WhySection />
      <RealisationsPreviewSection />
      <ProductsPreviewSection />
      <ContactCtaSection />
      <ContactSection />
    </main>
    <CorporateFooter />
  </>;
}
