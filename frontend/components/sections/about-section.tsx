import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
export function AboutSection() {
  const { contact } = company;
  return <section id="a-propos" className="py-20 sm:py-28"><Container><Reveal className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
    <p className="text-sm font-bold uppercase tracking-[.18em] text-[#a85c36]">Qui sommes-nous ?</p>
    <div>
      <h2 className="text-3xl font-semibold tracking-tight text-[#16232a] sm:text-4xl">Une expertise professionnelle au service d’environnements plus sûrs.</h2>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526259]">Société spécialisée dans la maintenance immobilière, le nettoyage industriel et le bionettoyage, J&amp;B SANIYAPUR SARL intervient également en désinfection et assainissement, hygiène publique et environnementale, traitement des sanitaires et gestion des déchets industriels — au service des environnements de santé comme des environnements professionnels et industriels.</p>
      <p className="mt-5 max-w-2xl leading-7 text-[#526259]">Implantée à {contact.locations}, l’entreprise met son expérience de terrain au service d’organisations publiques et privées, avec une exigence constante de qualité, de méthode et de maîtrise des risques sanitaires.</p>
      <ButtonLink href="#services" variant="secondary" className="mt-8">En savoir plus</ButtonLink>
    </div>
  </Reveal></Container></section>;
}
