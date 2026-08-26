import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getServices } from "@/lib/services";

export async function CompetenciesSection() {
  const services = (await getServices()).slice(0, 7);
  return (
    <section className="bg-[#f1f6f6] py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#a85c36]">Nos domaines de compétence</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#16232a] sm:text-4xl">Ce que SANIYAPUR met en œuvre.</h2>
        </Reveal>
        {services.length ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} delayMs={index * 60}>
                <Link href={`/services/${service.slug}`} className="group flex h-full flex-col rounded-2xl border border-[#d6e3da] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#a85c36] hover:shadow-xl hover:shadow-[#a85c36]/8">
                  <span className="grid size-11 place-items-center rounded-xl bg-[#f1e4dc] text-[#a85c36] transition-transform duration-300 group-hover:scale-110">
                    <ServiceIcon icon={service.icon} />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-[#16232a]">{service.name}</h3>
                  <p className="mt-3 line-clamp-2 flex-1 leading-7 text-[#526259]">{service.short_description}</p>
                  <span className="mt-4 text-sm font-semibold text-[#a85c36]">Découvrir →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-[#526259]">Les domaines de compétences seront publiés prochainement.</p>
        )}
        <div className="mt-10"><ButtonLink href="/services" variant="secondary">Voir tous nos services</ButtonLink></div>
      </Container>
    </section>
  );
}
