import { AboutSection } from "@/components/sections/about-section";
import { AnimatedStatsSection } from "@/components/sections/animated-stats-section";
import { CompetenciesSection } from "@/components/sections/competencies-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { CorporateHero } from "@/components/sections/corporate-hero";
import { ExpertisePreviewSection } from "@/components/sections/expertise-preview-section";
import { ProductsPreviewSection } from "@/components/sections/products-preview-section";
import { RealisationsPreviewSection } from "@/components/sections/realisations-preview-section";
import { SectorsSection } from "@/components/sections/sectors-section";
import { TeamGallerySection } from "@/components/sections/team-gallery-section";
import { ClientLogosSection } from "@/components/sections/client-logos-section";
import { TrustBand } from "@/components/sections/trust-band";
import { WhySection } from "@/components/sections/why-section";
import { getClientLogos } from "@/lib/clients";
import { getTeamGalleryPhotos, getTeamGallerySettings } from "@/lib/team";
import { getSiteSettings } from "@/lib/settings";

export default async function Home() {
  const [gallerySettings, galleryPhotos, settings, clientLogos] = await Promise.all([
    getTeamGallerySettings(),
    getTeamGalleryPhotos(),
    getSiteSettings(),
    getClientLogos(),
  ]);

  const statItems = [1, 2, 3, 4, 5].map((n) => ({
    value: Number(settings[`stat_${n}_value` as keyof typeof settings] ?? 0),
    suffix: String(settings[`stat_${n}_suffix` as keyof typeof settings] ?? ""),
    label: String(settings[`stat_${n}_label` as keyof typeof settings] ?? ""),
    description: String(settings[`stat_${n}_description` as keyof typeof settings] ?? ""),
  }));

  return (
    <>
      <CorporateHero />
      <TrustBand />
      <AboutSection />
      <TeamGallerySection settings={gallerySettings} photos={galleryPhotos} preview />
      <CompetenciesSection />
      <AnimatedStatsSection items={statItems} sinceYear={settings.stats_since_year || 2009} />
      <WhySection />
      <SectorsSection />
      <RealisationsPreviewSection />
      <ProductsPreviewSection />
      <ExpertisePreviewSection />
      <ClientLogosSection logos={clientLogos} />
      <ContactCtaSection />
    </>
  );
}
