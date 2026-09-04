import Image from "next/image";
import Link from "next/link";
import { resolveMediaUrl } from "@/lib/media";
import type { Product } from "@/types/product";

export function ProductCard({ product, isMock = false }: { product: Product; isMock?: boolean }) {
  const imageUrl = product.image ? resolveMediaUrl(product.image) : null;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dce5df] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#a85c36]/40 hover:shadow-xl">
      <Link href={`/produits/${product.slug}`} className="flex flex-col flex-1">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f7f9f8] p-4 flex items-center justify-center border-b border-[#edf2ee]">
          {imageUrl ? (
            <div className="relative size-full">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                unoptimized
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-108"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="flex size-full items-center justify-center text-xs font-medium text-[#8a9a92]">
              Visuel produit J&B SANIYAPUR
            </div>
          )}

          {isMock && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-[#a85c36] shadow-xs">
              Données de test
            </span>
          )}

          {product.featured && (
            <span className="absolute right-3 top-3 rounded-full bg-[#a85c36] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
              ★ En vedette
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[.14em] text-[#a85c36]">
                {product.category}
              </span>
              {product.reference && (
                <span className="font-mono text-[11px] text-[#8a9a92]">
                  {product.reference}
                </span>
              )}
            </div>

            <h2 className="mt-2.5 text-lg font-bold tracking-tight text-[#16232a] group-hover:text-[#a85c36] transition-colors">
              {product.name}
            </h2>

            <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[#526259]">
              {product.short_description || product.description}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#f0f4f1] pt-4">
            <span className="text-xs font-bold text-[#a85c36] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Voir la fiche technique →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

