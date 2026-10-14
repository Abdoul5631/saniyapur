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

function GuaranteeIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const steps = [
  { title: "Votre demande", text: "Vous renseignez le site, le secteur et le type de prestation." },
  { title: "Notre analyse", text: "Nous analysons les contraintes (horaires, zones sensibles, normes)." },
  { title: "Votre étude", text: "Vous recevez une étude chiffrée et un interlocuteur dédié." },
];

const guarantees = [
  { icon: "M13 2L4 14h7l-1 8 9-12h-7l1-8z", title: "Réponse sous 24h", text: "Une proposition technique et financière, sans engagement." },
  { icon: "M4 21V8l8-5 8 5v13M9 21v-6h6v6M12 9v3M10.5 10.5h3", title: "Protocoles adaptés", text: "Santé, industrie, hôtellerie : chaque site a son exigence." },
  { icon: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4", title: "Équipes formées", text: "Personnel encadré, EPI et produits professionnels certifiés." },
  { icon: "M4 5h16v11H8l-4 4V5z", title: "Suivi dédié", text: "Un interlocuteur unique jusqu’à la mise en œuvre." },
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
                <ol className="relative mt-8 space-y-5">
                  <span aria-hidden className="absolute bottom-6 left-[1.1rem] top-6 w-px bg-linear-to-b from-[#a85c36] via-[#e2c9b9] to-[#dce5df]" />
                  {steps.map((step, index) => (
                    <li key={step.title} className="group relative flex gap-4">
                      <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0f2e36] text-sm font-bold text-white ring-4 ring-[#f8faf9] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#a85c36]">
                        {index + 1}
                      </span>
                      <div className="flex-1 rounded-2xl border border-[#dce5df] bg-white px-5 py-3.5 shadow-xs transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[#a85c36]/50 group-hover:shadow-md">
                        <p className="text-sm font-bold text-[#16232a]">{step.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-[#526259]">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {guarantees.map((item) => (
                    <div
                      key={item.title}
                      className="card-luxury group rounded-2xl border border-[#dce5df] bg-white p-4 transition hover:border-[#a85c36]/50"
                    >
                      <span className="grid size-10 place-items-center rounded-xl bg-[#f1e4dc] text-[#a85c36] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <GuaranteeIcon path={item.icon} />
                      </span>
                      <p className="mt-3 text-sm font-bold text-[#16232a]">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#526259]">{item.text}</p>
                    </div>
                  ))}
                </div>

                {(settings.phone || settings.whatsapp) && (
                  <a
                    href={`tel:${(settings.phone || settings.whatsapp).replace(/[^+\d]/g, "")}`}
                    className="group mt-6 flex items-center gap-4 rounded-2xl bg-[#16232a] px-5 py-4 text-white transition hover:bg-[#0f2e36]"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#a85c36] transition-transform duration-300 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#e8b79a]">Urgence · 24/7</span>
                      <span className="block text-lg font-extrabold tracking-wide">{settings.phone || settings.whatsapp}</span>
                    </span>
                  </a>
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
