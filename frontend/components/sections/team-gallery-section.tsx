import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TeamPhotoGrid } from "@/components/team/team-photo-grid";
import type { TeamGalleryPhoto, TeamGallerySettings } from "@/types/admin";

type Props = {
  settings: TeamGallerySettings;
  photos: TeamGalleryPhoto[];
  preview?: boolean;
  embedded?: boolean;
};

export function TeamGallerySection({ settings, photos, preview = false, embedded = false }: Props) {
  if (!photos.length) return null;

  const visible = preview ? photos.slice(0, 6) : photos;
  const title = settings.title || "Galerie de l’équipe";
  const description = settings.description?.trim();

  const content = (
    <>
      <Reveal className={embedded ? "max-w-3xl" : "mx-auto max-w-3xl text-center"}>
        <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-[#a85c36] uppercase">
          Notre équipe
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-[#526259] sm:text-lg">{description}</p>
        ) : null}
      </Reveal>

      <div className="mt-10">
        <TeamPhotoGrid photos={visible} />
      </div>

      {preview && photos.length > 6 && (
        <div className="mt-8 text-center">
          <Link
            href="/a-propos#galerie-equipe"
            className="inline-flex rounded-full border border-[#a85c36] px-6 py-2.5 text-sm font-semibold text-[#a85c36] hover:bg-[#a85c36] hover:text-white"
          >
            Voir toute la galerie
          </Link>
        </div>
      )}
    </>
  );

  if (embedded) {
    return (
      <div id="galerie-equipe" className="mt-14 border-t border-[#dce5df] pt-14">
        {content}
      </div>
    );
  }

  return (
    <section id="galerie-equipe" className="bg-[#f7f8f6] py-16 sm:py-20">
      <Container>{content}</Container>
    </section>
  );
}
