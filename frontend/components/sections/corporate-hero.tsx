import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/settings";
import { resolveMediaUrl } from "@/lib/media";

const fallbackImage = "/images/hero-industrial-cleaning.jpg";

export async function CorporateHero() {
  const settings = await getSiteSettings();

  const heroImage = settings.hero_image
    ? resolveMediaUrl(settings.hero_image, fallbackImage)
    : fallbackImage;

  const heroTitle = settings.hero_title || (
    <>
      La propreté et l’hygiène qui{" "}
      <span className="bg-gradient-to-r from-white via-[#f1e4dc] to-[#e8d9cc] bg-clip-text text-transparent">
        protègent
      </span>
      , la qualité qui <span className="text-[#e8d9cc]">rassure</span>.
    </>
  );

  const heroText =
    settings.hero_text ||
    "Maintenance immobilière de pointe, décapage technique, bionettoyage hospitalier et gestion environnementale à Ouagadougou et Bobo-Dioulasso.";

  const primaryLabel = settings.hero_primary_button_label || "Découvrir nos services →";
  const primaryUrl = settings.hero_primary_button_url || "/services";

  const secondaryLabel = settings.hero_secondary_button_label || "Demander une étude & devis";
  const secondaryUrl = settings.hero_secondary_button_url || "/devis";

  const companyName = settings.company_name || "J&B SANIYAPUR SARL";
  const tagline = settings.tagline || "PROPRETÉ SUR ORDONNANCE";

  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-32 lg:py-40">
      {/* ── Arrière-plan : Image 100% claire et nette (aucun filtre, aucun dégradé) ── */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={heroImage}
          alt="Intervention de nettoyage professionnel et bionettoyage J&B SANIYAPUR"
          fill
          priority
          unoptimized
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
          className="object-cover object-center"
        />
      </div>

      <Container>
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#e8d9cc] backdrop-blur-md shadow-md">
              <span className="size-2 rounded-full bg-[#e8d9cc] animate-ping" />
              {companyName}
            </span>
            <span className="font-serif italic text-sm text-white tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              « {tagline} »
            </span>
          </div>

          <h1 className="animate-fade-in-up text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
            {heroTitle}
          </h1>

          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white font-medium max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {heroText}
          </p>

          {/* Actions principales */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-in-up [animation-delay:300ms]">
            <ButtonLink href={primaryUrl} className="px-8 py-4 text-base shadow-2xl shadow-black/40">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink href={secondaryUrl} variant="onDark" className="px-8 py-4 text-base backdrop-blur-md bg-black/40 border-white/30">
              {secondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

