import Image from "next/image";
import { resolveMediaUrl } from "@/lib/media";
import type { RealisationImage } from "@/types/realisation";

export function BeforeAfter({ images }: { images: RealisationImage[] }) {
  const before = images.find((image) => image.type === "before");
  const after = images.find((image) => image.type === "after");
  if (!before || !after) return null;

  return (
    <section aria-labelledby="before-after-title">
      <h2 id="before-after-title" className="text-xl font-extrabold text-[#16232a] sm:text-2xl">
        Avant / Après
      </h2>
      <div className="mt-6 grid overflow-hidden rounded-3xl border border-[#dce5df] sm:grid-cols-2">
        {(
          [
            ["Avant", before],
            ["Après", after],
          ] as const
        ).map(([label, image]) => {
          const src = resolveMediaUrl(image.image, "");
          return (
            <figure key={label} className="relative isolate min-h-72 bg-[#e8eeec]">
              {src ? (
                <Image
                  src={src}
                  alt={image.caption || label}
                  fill
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              ) : null}
              <div className="absolute inset-x-0 bottom-0 z-[1] bg-linear-to-t from-black/70 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[.15em]">{label}</p>
                {image.caption ? <figcaption className="mt-1 text-sm text-white/80">{image.caption}</figcaption> : null}
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
