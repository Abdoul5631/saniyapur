import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/products/product-card";
import { getProducts, productsAreMocked } from "@/lib/products";

export async function ProductsPreviewSection() {
  const products = await getProducts();
  const published = products.filter((product) => product.published).slice(0, 3);
  return (
    <section className="bg-[#f1f6f6] py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#a85c36]">Quelques produits</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#16232a] sm:text-4xl">Des solutions professionnelles mises en avant.</h2>
        </Reveal>
        {productsAreMocked && <p className="mt-6 text-sm text-[#526259]">Les contenus affichés sont des données de test, en attente de connexion à l’API.</p>}
        {published.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {published.map((product, index) => (
              <Reveal key={product.id} delayMs={index * 80}>
                <ProductCard product={product} isMock={productsAreMocked} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-[#526259]">Aucun produit publié pour le moment.</p>
        )}
        <div className="mt-10"><ButtonLink href="/produits" variant="secondary">Voir tous les produits</ButtonLink></div>
      </Container>
    </section>
  );
}
