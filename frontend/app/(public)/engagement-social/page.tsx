import type { Metadata } from "next";
import Image from "next/image";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getAboutSettings } from "@/lib/about";
import { resolveMediaUrl } from "@/lib/media";
import { getTeamGalleryPhotos } from "@/lib/team";

export const metadata: Metadata = {
  title: "Engagement social",
  description:
    "Politique sociale de J&B SANIYAPUR SARL : conditions de travail, protection du personnel et accompagnement des équipes.",
};

function softenHeading(text?: string | null) {
  if (!text) return "";
  const trimmed = text.trim();
  const letters = trimmed.replace(/[^A-Za-zÀ-ÿ]/g, "");
  if (letters.length > 4 && letters === letters.toUpperCase()) {
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  }
  return trimmed;
}

function parseListItems(text?: string) {
  if (!text) return { intro: "", items: [] as string[] };
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const items: string[] = [];
  const introLines: string[] = [];

  for (const line of lines) {
    if (/^[-•*✓]\s*/.test(line) || /^\d+[\.)]\s+/.test(line)) {
      items.push(line.replace(/^[-•*✓]\s*/, "").replace(/^\d+[\.)]\s+/, "").trim());
    } else {
      introLines.push(line);
    }
  }

  return { intro: introLines.join(" "), items };
}

export default async function EngagementSocialPage() {
  const [about, galleryPhotos] = await Promise.all([getAboutSettings(), getTeamGalleryPhotos()]);

  const social = parseListItems(about.social_commitment_content);
  const operational = parseListItems(about.operational_team_content);
  const teamPhoto = galleryPhotos[0]?.image ? resolveMediaUrl(galleryPhotos[0].image, "") : "";
  const title = softenHeading(about.social_commitment_title || "Notre engagement social");

  return (
    <>
      <PageHero
        eyebrow="Engagement social"
        title={title}
        description={
          social.intro ||
          "Conditions de travail, protection sociale et accompagnement des équipes — tels qu’ils sont publiés."
        }
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Engagement social" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          {teamPhoto ? (
            <Reveal>
              <figure className="relative isolate overflow-hidden rounded-3xl bg-[#e8eeec]">
                <div className="relative aspect-[16/9] sm:aspect-[21/9]">
                  <Image
                    src={teamPhoto}
                    alt="Équipes SANIYAPUR"
                    fill
                    unoptimized
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
              </figure>
            </Reveal>
          ) : null}

          {social.items.length > 0 ? (
            <div className={teamPhoto ? "mt-10 grid gap-5 sm:grid-cols-2" : "grid gap-5 sm:grid-cols-2"}>
              {social.items.map((item, index) => (
                <Reveal key={item} delayMs={Math.min(index * 40, 160)}>
                  <article className="h-full rounded-2xl border border-[#dce5df] bg-[#f8faf9] p-6 shadow-xs">
                    <span className="text-xs font-bold uppercase tracking-[.16em] text-[#a85c36]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-base leading-relaxed text-[#16232a]">{item}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : !social.intro ? (
            <p className="text-[#526259]">Le détail de l’engagement social sera publié depuis l’administration.</p>
          ) : null}

          <Reveal className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Nous contacter</ButtonLink>
            <ButtonLink href="/a-propos" variant="secondary">
              À propos
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {(operational.intro || operational.items.length > 0) && (
        <section className="bg-[#f8faf9] py-16 sm:py-20">
          <Container>
            <Reveal className="max-w-3xl">
              <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
                Personnel
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                {softenHeading(about.operational_team_title || "Le personnel opérationnel")}
              </h2>
              {operational.intro ? (
                <p className="mt-4 text-base leading-relaxed text-[#526259] sm:text-lg">{operational.intro}</p>
              ) : null}
            </Reveal>

            {operational.items.length > 0 ? (
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {operational.items.map((item, index) => (
                  <Reveal key={item} delayMs={Math.min(index * 40, 160)}>
                    <li className="flex h-full items-start gap-3 rounded-2xl border border-[#dce5df] bg-white p-5 text-[#3f5149]">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#0f2e36]/10 text-xs font-bold text-[#0f2e36]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-6">{item}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            ) : null}
          </Container>
        </section>
      )}

      <ContactCtaSection title="Échangeons autour de votre projet." />
    </>
  );
}
