import { ButtonLink } from "@/components/ui/button-link";
import { ProductGallery } from "@/components/products/product-gallery";
import type { Product } from "@/types/product";

export function ProductDetail({ product }: { product: Product }) {
  const characteristics = product.characteristics.split("\n").map((line) => line.trim()).filter(Boolean);
  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
      <ProductGallery product={product} />
      <div>
        <p className="text-sm font-bold uppercase tracking-[.16em] text-[#a85c36]">{product.category}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#16232a] sm:text-5xl">{product.name}</h1>
        {product.reference && <p className="mt-3 text-sm text-[#526259]">Référence : {product.reference}</p>}
        <p className="mt-6 text-lg leading-8 text-[#526259]">{product.description}</p>
        {product.usage && (
          <section className="mt-10 border-t border-[#dce5df] pt-8">
            <h2 className="text-xl font-semibold text-[#16232a]">Utilisation</h2>
            <p className="mt-3 leading-7 text-[#526259]">{product.usage}</p>
          </section>
        )}
        {characteristics.length > 0 && (
          <section className="mt-10 border-t border-[#dce5df] pt-8">
            <h2 className="text-xl font-semibold text-[#16232a]">Caractéristiques</h2>
            <ul className="mt-3 grid gap-2 text-[#526259]">
              {characteristics.map((item) => <li key={item} className="flex gap-2"><span className="text-[#a85c36]">•</span>{item}</li>)}
            </ul>
          </section>
        )}
        {(product.technical_sheet || product.safety_sheet) && (
          <section className="mt-10 border-t border-[#dce5df] pt-8">
            <h2 className="text-xl font-semibold text-[#16232a]">Documents</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.technical_sheet && <ButtonLink href={product.technical_sheet} target="_blank" rel="noreferrer">Fiche technique PDF</ButtonLink>}
              {product.safety_sheet && <ButtonLink href={product.safety_sheet} variant="secondary" target="_blank" rel="noreferrer">Fiche de sécurité</ButtonLink>}
            </div>
            {product.technical_sheet && (
              <object data={product.technical_sheet} type="application/pdf" className="mt-6 hidden h-96 w-full rounded-xl border border-[#dce5df] lg:block">
                <p>Le navigateur ne peut pas afficher le PDF. Utilisez le lien ci-dessus.</p>
              </object>
            )}
          </section>
        )}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/devis">Demander un devis</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Demander des informations</ButtonLink>
        </div>
      </div>
    </div>
  );
}
