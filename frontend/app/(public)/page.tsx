import { AboutSection } from "@/components/sections/about-section";
import { CompetenciesSection } from "@/components/sections/competencies-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { CorporateHero } from "@/components/sections/corporate-hero";
import { ExpertisePreviewSection } from "@/components/sections/expertise-preview-section";
import { ProductsPreviewSection } from "@/components/sections/products-preview-section";
import { RealisationsPreviewSection } from "@/components/sections/realisations-preview-section";
import { SectorsSection } from "@/components/sections/sectors-section";

export default function Home() {
  return (
    <>
      <CorporateHero />
      <AboutSection />
      <CompetenciesSection />
      <SectorsSection />
      <RealisationsPreviewSection />
      <ProductsPreviewSection />
      <ExpertisePreviewSection />
      <ContactCtaSection />
    </>
  );
}
