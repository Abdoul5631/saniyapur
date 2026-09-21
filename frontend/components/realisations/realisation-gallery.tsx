import Image from "next/image";
import { resolveMediaUrl } from "@/lib/media";
import type { RealisationImage } from "@/types/realisation";

export function RealisationGallery({ images }: { images: RealisationImage[] }) {
  const gallery = images.filter((image) => image.type === "gallery").sort((a, b) => a.order - b.order);
  if (!gallery.length) return null;

  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="text-xl font-extrabold text-[#16232a] sm:text-2xl">
        Galerie
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {gallery.map((image) => {
          const src = resolveMediaUrl(image.image, "");
          return (
            <figure key={image.id} className="overflow-hidden rounded-3xl border border-[#dce5df] bg-[#e8eeec]">
              <div className="relative isolate aspect-[4/3]">
                {src ? (
                  <Image
                    src={src}
                    alt={image.caption || "Photo du chantier"}
                    fill
                    unoptimized
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ) : null}
              </div>
              {image.caption ? <figcaption className="p-4 text-sm text-[#526259]">{image.caption}</figcaption> : null}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
