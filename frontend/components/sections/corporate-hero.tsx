import { HeroInteractive } from "@/components/sections/hero-interactive";
import { getSiteSettings } from "@/lib/settings";
import { resolveMediaUrl } from "@/lib/media";

const fallbackHeroImages = [
  "/images/services/personnel.png",
  "/images/services/decapage.png",
  "/images/services/hygiene-publique.png",
];

export async function CorporateHero() {
  const settings = await getSiteSettings();

  const uploaded = [settings.hero_image, settings.hero_image_2, settings.hero_image_3]
    .filter((url): url is string => Boolean(url))
    .map((url) => resolveMediaUrl(url, fallbackHeroImages[0]));

  const heroImages =
    uploaded.length > 0
      ? [...uploaded, ...fallbackHeroImages.filter((src) => !uploaded.includes(src))].slice(0, 3)
      : fallbackHeroImages;

  return (
    <HeroInteractive
      images={heroImages}
      tagline={settings.tagline || "PROPRETÉ SUR ORDONNANCE"}
      title={
        settings.hero_title || "La propreté et l’hygiène qui protègent, la qualité qui rassure."
      }
      text={
        settings.hero_text ||
        "Maintenance immobilière, décapage technique, bionettoyage hospitalier et gestion environnementale à Ouagadougou et Bobo-Dioulasso."
      }
      primaryLabel={settings.hero_primary_button_label || "Nos services"}
      primaryUrl={settings.hero_primary_button_url || "/services"}
      secondaryLabel={settings.hero_secondary_button_label || "Demander un devis"}
      secondaryUrl={settings.hero_secondary_button_url || "/devis"}
    />
  );
}
