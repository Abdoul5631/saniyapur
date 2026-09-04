import type { Metadata } from "next";
import { ProductCatalog } from "@/components/products/product-catalog";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getProducts, productsAreMocked } from "@/lib/products";

export const metadata: Metadata = { title: "Produits" };

export default async function ProductsPage() {
  const products = await getProducts();
  const published = products.filter((product) => product.published);
  return (
    <>
      <PageHero
        eyebrow="Produits & équipements"
        title="Catalogue professionnel"
        description="Produits et équipements professionnels certifiés pour l’hygiène et l’entretien."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Produits" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          {productsAreMocked && <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Mode développement : les produits ci-dessous sont des données de test et ne constituent pas le catalogue de l’entreprise.</p>}
          {published.length ? (
            <ProductCatalog products={published} isMock={productsAreMocked} />
          ) : (
            <p className="text-[#526259]">Aucun produit publié pour le moment.</p>
          )}
        </Container>
      </section>
    </>
  );
}
