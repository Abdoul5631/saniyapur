import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { HeroSlideshow } from "@/components/sections/hero-slideshow";
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

  const heroTitle =
    settings.hero_title || "La propreté et l’hygiène qui protègent, la qualité qui rassure.";

  const heroText =
    settings.hero_text ||
    "Maintenance immobilière, décapage technique, bionettoyage hospitalier et gestion environnementale à Ouagadougou et Bobo-Dioulasso.";

  const primaryLabel = settings.hero_primary_button_label || "Nos services";
  const primaryUrl = settings.hero_primary_button_url || "/services";
  const secondaryLabel = settings.hero_secondary_button_label || "Demander un devis";
  const secondaryUrl = settings.hero_secondary_button_url || "/devis";
  const tagline = settings.tagline || "PROPRETÉ SUR ORDONNANCE";

  return (
    <section
      id="accueil-hero"
      className="relative isolate flex min-h-[62vh] items-end overflow-hidden py-16 text-white sm:min-h-[68vh] sm:py-20 lg:min-h-[72vh] lg:items-center lg:py-24"
    >
      <HeroSlideshow
        images={heroImages}
        alt="Équipe J&B SANIYAPUR — nettoyage professionnel et bionettoyage"
      />

      <Container className="relative z-10">
        <div className="max-w-xl [text-shadow:0_1px_12px_rgba(4,18,21,0.45)]">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#e8d9cc] uppercase">
            {tagline}
          </p>
          <h1 className="mt-4 text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-white sm:text-4xl lg:text-[2.55rem]">
            {heroTitle}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            {heroText}
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={primaryUrl} className="px-7 py-3.5">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink href={secondaryUrl} variant="onDark" className="px-7 py-3.5">
              {secondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
