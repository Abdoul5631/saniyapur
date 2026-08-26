import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type Props = {
  eyebrow?: string;
  title?: string;
  buttonLabel?: string;
  href?: string;
};

export function ContactCtaSection({
  eyebrow = "Parlons de votre besoin",
  title = "Vous avez un besoin en nettoyage, hygiène ou maintenance ?",
  buttonLabel = "Demander un devis",
  href = "/devis",
}: Props) {
  const { contact } = company;
  return (
    <section className="bg-[#a85c36] py-16 text-white sm:py-20">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#e8d9cc]">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <ButtonLink href={href} variant="onColor" className="mt-8">{buttonLabel}</ButtonLink>
          </div>
          <div className="border-l border-white/25 pl-6 text-white/80">
            <p><a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="font-semibold text-white">{contact.phone}</a></p>
            <p className="mt-2"><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
            <p className="mt-5 text-sm">{contact.locations}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
