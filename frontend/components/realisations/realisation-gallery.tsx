import Image from "next/image";
import { resolveMediaUrl } from "@/lib/media";
import type { RealisationImage } from "@/types/realisation";

/** Toutes les photos du chantier, hors couple avant/après déjà montré à part. */
export function RealisationGallery({ images }: { images: RealisationImage[] }) {
  const beforeId = images.find((image) => image.type === "before")?.id;
  const afterId = images.find((image) => image.type === "after")?.id;
  const gallery = [...images]
    .filter((image) => image.id !== beforeId && image.id !== afterId)
    .sort((a, b) => a.order - b.order || a.id - b.id);
  if (gallery.length < 2) return null;

  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="text-xl font-extrabold text-[#16232a] sm:text-2xl">
        Galerie du chantier
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
