import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter J&B SANIYAPUR : téléphone, WhatsApp, e-mail et formulaire. Ouagadougou et Bobo-Dioulasso.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const mapsQuery = encodeURIComponent(settings.address || "");
  const phone = settings.phone?.trim() || "";
  const whatsapp = settings.whatsapp?.trim() || "";
  const email = settings.email?.trim() || "";
  const whatsappUrl = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : "";

  const lines = [
    phone
      ? { label: "Téléphone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` }
      : null,
    whatsapp ? { label: "WhatsApp", value: whatsapp, href: whatsappUrl } : null,
    email ? { label: "E-mail", value: email, href: `mailto:${email}` } : null,
    settings.address ? { label: "Adresse", value: settings.address, href: undefined } : null,
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Nous écrire"
        description="Un devis, une intervention ou une question : indiquez votre besoin, nous vous répondons."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-14">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delayMs={80}>
              <aside className="rounded-3xl border border-[#dce5df] bg-[#f8faf9] p-6 shadow-xs sm:p-8">
                <h2 className="text-lg font-extrabold text-[#16232a]">Coordonnées</h2>

                {lines.length > 0 ? (
                  <dl className="mt-6 grid gap-5 text-sm">
                    {lines.map((line) => (
                      <div key={line.label}>
                        <dt className="text-[#526259]">{line.label}</dt>
                        <dd className="mt-1 font-medium break-words text-[#16232a]">
                          {line.href ? (
                            <a
                              href={line.href}
                              target={line.href.startsWith("http") ? "_blank" : undefined}
                              rel={line.href.startsWith("http") ? "noreferrer" : undefined}
                              className="hover:text-[#a85c36]"
                            >
                              {line.value}
                            </a>
                          ) : (
                            line.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-4 text-sm text-[#526259]">Les coordonnées seront publiées depuis les paramètres.</p>
                )}

                {settings.opening_hours ? (
                  <div className="mt-6 border-t border-[#dce5df] pt-5">
                    <p className="text-sm text-[#526259]">Horaires</p>
                    <p className="mt-1 text-sm font-medium text-[#16232a]">{settings.opening_hours}</p>
                  </div>
                ) : null}

                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#0f2e36] px-5 py-3 text-sm font-semibold text-white hover:bg-[#16232a]"
                  >
                    WhatsApp
                  </a>
                ) : null}

                {mapsQuery ? (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-[#dce5df]">
                    <iframe
                      title="Localisation J&B SANIYAPUR"
                      src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
                      className="h-52 w-full"
                      loading="lazy"
                    />
                  </div>
                ) : null}
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
