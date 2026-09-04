import Image from "next/image";
import { resolveMediaUrl } from "@/lib/media";
import type { Product } from "@/types/product";

export function ProductGallery({ product }: { product: Product }) {
  const mainImage = product.image ? resolveMediaUrl(product.image) : null;
  const images = [
    ...(mainImage ? [{ id: 0, image: mainImage, caption: product.name, order: 0 }] : []),
    ...(product.gallery ?? []).map((g) => ({ ...g, image: resolveMediaUrl(g.image) })),
  ].sort((a, b) => a.order - b.order);

  if (!images.length) {
    return (
      <div className="grid aspect-square place-items-center rounded-2xl border border-dashed border-[#dce5df] bg-[#f7f9f8] p-8 text-center text-sm font-medium text-[#8a9a92]">
        Visuel produit certifié J&B SANIYAPUR
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1">
      {images.map((img) => (
        <figure key={img.id} className="overflow-hidden rounded-2xl border border-[#dce5df] bg-white p-6 shadow-sm">
          <div className="relative aspect-4/3 sm:aspect-square w-full">
            <Image
              src={img.image}
              alt={img.caption ?? product.name}
              fill
              unoptimized
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {img.caption && (
            <figcaption className="mt-3 border-t border-[#f0f4f1] pt-3 text-center text-xs font-semibold text-[#526259]">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

