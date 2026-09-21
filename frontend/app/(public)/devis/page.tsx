import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/quote-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getSectors } from "@/lib/sectors";
import { getServices } from "@/lib/services";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Demander un devis",
  description:
    "Demandez une étude gratuite à J&B SANIYAPUR : devis de bionettoyage, nettoyage industriel ou maintenance sous 24 heures.",
};

const guarantees = [
  { icon: "⚡", title: "Réponse sous 24h", text: "Une proposition technique et financière, sans engagement." },
  { icon: "🏥", title: "Protocoles adaptés", text: "Santé, industrie, hôtellerie : chaque site a son exigence." },
  { icon: "🛡️", title: "Équipes formées", text: "Personnel encadré, EPI et produits professionnels certifiés." },
  { icon: "💬", title: "Suivi dédié", text: "Un interlocuteur unique jusqu’à la mise en œuvre." },
];

export default async function QuotePage() {
  const [services, sectors, settings] = await Promise.all([
    getServices(),
    getSectors(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Devis"
        title="Demander une étude gratuite"
        description="Décrivez votre site et votre besoin. Nous revenons vers vous sous 24 heures avec une proposition sur mesure."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Demander un devis" }]}
      />

      <section className="py-16 sm:py-24 bg-[#f8faf9]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_.95fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-24">
                <span className="inline-block rounded-full bg-[#f1e4dc] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.16em] text-[#a85c36]">
                  Comment ça se passe
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#16232a]">
                  Trois étapes, une réponse claire.
                </h2>
                <ol className="mt-6 space-y-4">
                  {[
                    "Vous renseignez le site, le secteur et le type de prestation.",
                    "Nous analysons les contraintes (horaires, zones sensibles, normes).",
                    "Vous recevez une étude chiffrée et un interlocuteur dédié.",
                  ].map((step, index) => (
                    <li key={step} className="flex gap-3 rounded-2xl border border-[#dce5df] bg-white p-4 shadow-xs">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#0f2e36] text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-[#526259]">{step}</p>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {guarantees.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-[#dce5df] bg-white p-4">
                      <p className="text-lg">{item.icon}</p>
                      <p className="mt-1 text-sm font-bold text-[#16232a]">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#526259]">{item.text}</p>
                    </div>
                  ))}
                </div>

                {(settings.phone || settings.whatsapp) && (
                  <p className="mt-6 text-xs text-[#8a9a92]">
                    Urgence ? Appelez {settings.phone || settings.whatsapp} — interventions possibles 24/7.
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <QuoteForm
                services={services.map((service) => ({ name: service.name, slug: service.slug }))}
                sectors={sectors.map((sector) => ({ name: sector.name, slug: sector.slug }))}
              />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
