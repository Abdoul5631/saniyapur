import Image from "next/image";
import { CorporateFooter } from "@/components/layout/corporate-footer";
import { CorporateHeader } from "@/components/layout/corporate-header";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <>
      <CorporateHeader />
      <main className="flex flex-1 items-center py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <Image src="/images/logo.png" alt="J&amp;B SANIYAPUR SARL" width={220} height={128} className="mx-auto h-14 w-auto opacity-90" />
            <p className="mt-10 text-sm font-bold uppercase tracking-[.2em] text-[#a85c36]">Erreur 404</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#16232a] sm:text-4xl">Cette page n’existe pas ou plus.</h1>
            <p className="mt-4 leading-7 text-[#526259]">La page que vous cherchez a peut-être été déplacée ou n’a jamais existé. Retournez à l’accueil ou explorez nos services.</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/">Retour à l’accueil</ButtonLink>
              <ButtonLink href="/produits" variant="secondary">Voir nos produits</ButtonLink>
            </div>
          </div>
        </Container>
      </main>
      <CorporateFooter />
    </>
  );
}
