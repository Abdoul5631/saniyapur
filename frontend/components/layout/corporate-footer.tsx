import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { mainNav, quoteHref } from "@/lib/navigation";
import { getServices } from "@/lib/services";
import { getSiteSettings } from "@/lib/settings";

export async function CorporateFooter() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const socials = [
    ["Facebook", settings.facebook_url],
    ["LinkedIn", settings.linkedin_url],
    ["Instagram", settings.instagram_url],
    ["WhatsApp", settings.whatsapp_url],
  ].filter(([, url]) => Boolean(url));

  return (
    <footer className="bg-[#0f2e36] py-14 text-white/70">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex rounded-xl bg-white px-3 py-2">
              <Image src={settings.logo || "/images/logo.png"} alt={settings.company_name} width={220} height={128} className="h-10 w-auto" />
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[.14em] text-[#c9a98c]">« {settings.tagline} »</p>
            <p className="mt-4 text-sm leading-6">{settings.slogan}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Navigation</p>
            <ul className="mt-4 grid gap-2 text-sm">
              {mainNav.map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white">{label}</Link></li>
              ))}
              <li><Link href={quoteHref} className="hover:text-white">Demander un devis</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Services</p>
            <ul className="mt-4 grid gap-2 text-sm">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}><Link href={`/services/${service.slug}`} className="hover:text-white">{service.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <address className="mt-4 grid gap-2 text-sm not-italic">
              {settings.phone && <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-white">{settings.phone}</a>}
              {settings.whatsapp && <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`} className="hover:text-white">WhatsApp : {settings.whatsapp}</a>}
              {settings.email && <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>}
              {settings.address && <span>{settings.address}</span>}
              {settings.opening_hours && <span>{settings.opening_hours}</span>}
            </address>
            {socials.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-3 text-sm">
                {socials.map(([label, url]) => (
                  <li key={label}><a href={url} target="_blank" rel="noreferrer" className="hover:text-white">{label}</a></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mt-12 border-t border-white/12 pt-6 text-xs">© {new Date().getFullYear()} {settings.company_name}. Tous droits réservés.</div>
      </Container>
    </footer>
  );
}
