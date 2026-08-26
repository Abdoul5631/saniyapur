import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const mapsQuery = encodeURIComponent(settings.address || "Ouagadougou Burkina Faso");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contacter J&B SANIYAPUR"
        description="Un besoin, une question : écrivez-nous ou rejoignez-nous par téléphone."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <dl className="grid gap-5">
                {settings.phone && <div><dt className="text-sm text-[#526259]">Téléphone</dt><dd className="mt-1 font-semibold"><a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a></dd></div>}
                {settings.whatsapp && <div><dt className="text-sm text-[#526259]">WhatsApp</dt><dd className="mt-1 font-semibold"><a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{settings.whatsapp}</a></dd></div>}
                {settings.email && <div><dt className="text-sm text-[#526259]">E-mail</dt><dd className="mt-1 font-semibold"><a href={`mailto:${settings.email}`}>{settings.email}</a></dd></div>}
                {settings.address && <div><dt className="text-sm text-[#526259]">Adresse</dt><dd className="mt-1 font-semibold">{settings.address}</dd></div>}
                {settings.opening_hours && <div><dt className="text-sm text-[#526259]">Horaires</dt><dd className="mt-1 font-semibold">{settings.opening_hours}</dd></div>}
              </dl>
              <div className="mt-8 overflow-hidden rounded-2xl border border-[#dce5df]">
                <iframe
                  title="Localisation J&B SANIYAPUR"
                  src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
