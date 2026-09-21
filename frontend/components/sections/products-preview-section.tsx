import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/products/product-card";
import { getProducts, productsAreMocked } from "@/lib/products";

export async function ProductsPreviewSection() {
  const products = await getProducts();
  const published = products.filter((product) => product.published).slice(0, 3);
  return (
    <section className="py-20 sm:py-28 bg-[#f8faf9] border-b border-[#e2eae4]/60">
      <Container>
        {/* En-tête premium */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#dce5df]/60">
          <Reveal className="max-w-2xl">
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
              Catalogue de Produits
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16232a] leading-tight">
              Équipements & produits professionnels.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#526259]">
              Machines industrielles, accessoires certifiés et produits chimiques homologués pour vos protocoles d'hygiène.
            </p>
          </Reveal>

          <Reveal delayMs={100} className="hidden md:block shrink-0">
            <ButtonLink href="/produits" variant="secondary" className="px-6 py-3.5 shadow-xs">
              Voir les {products.length || "28"} produits →
            </ButtonLink>
          </Reveal>
        </div>

        {productsAreMocked && (
          <p className="mt-4 text-xs text-[#8a9a92] italic">
            Données de démonstration — en attente de connexion API.
          </p>
        )}

        {published.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {published.map((product, index) => (
              <Reveal key={product.id} delayMs={index * 80}>
                <ProductCard product={product} isMock={productsAreMocked} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-[#526259]">Aucun produit publié pour le moment.</p>
        )}

        {/* Bandeau CTA bas de section */}
        <Reveal>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white border border-[#dce5df] px-6 py-5 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f1e4dc] text-xl">🛒</span>
              <div>
                <p className="text-sm font-bold text-[#16232a]">Besoin d'équipements spécifiques ?</p>
                <p className="text-xs text-[#526259]">Consultez notre catalogue complet de 28 produits professionnels.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <ButtonLink href="/produits" variant="secondary" className="py-2.5 px-5 text-sm">
                Voir le catalogue
              </ButtonLink>
              <ButtonLink href="/devis" className="py-2.5 px-5 text-sm">
                Demander un devis
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        {/* Bouton mobile */}
        <div className="mt-8 md:hidden">
          <ButtonLink href="/produits" variant="secondary" className="w-full justify-center py-4">
            Voir tous les produits →
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
