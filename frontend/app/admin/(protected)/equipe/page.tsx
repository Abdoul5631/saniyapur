import Link from "next/link";
import Image from "next/image";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { PublishedBadge } from "@/components/admin/status-badge";
import { TeamGalleryManager } from "@/components/admin/team-gallery-manager";
import { adminFetch, adminFetchAll, normaliseAdminList } from "@/lib/admin/api";
import type { TeamGalleryPhoto, TeamGallerySettings, TeamMember } from "@/types/admin";
import {
  deleteTeamGalleryPhoto,
  deleteTeamMember,
} from "./actions";

export const metadata = { title: "Équipe — Administration" };

export default async function AdminEquipePage() {
  const [members, gallerySettings, galleryPhotos] = await Promise.all([
    adminFetchAll<TeamMember>("/team/").catch(() => [] as TeamMember[]),
    adminFetch<TeamGallerySettings>("/team-gallery/").catch(() => ({
      id: 1,
      title: "Galerie de l’équipe",
      description: "",
      updated_at: "",
    })),
    adminFetch<TeamGalleryPhoto[] | { results: TeamGalleryPhoto[] }>("/team-gallery-photos/").catch(() => []),
  ]);
  const photos = normaliseAdminList(galleryPhotos);

  return (
    <div>
      <AdminHeader
        title="Équipe"
        description={`${members.length} membre${members.length > 1 ? "s" : ""} enregistré${members.length > 1 ? "s" : ""}. Tous s’affichent ici ; seuls les profils publiés apparaissent sur le site.`}
        action={
          <Link
            href="/admin/equipe/nouveau"
            className="rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8b4a2b]"
          >
            Ajouter un membre
          </Link>
        }
      />

      <div className="mt-6">
        <DataTable
          rows={members}
          emptyTitle="Aucun membre enregistré"
          emptyDescription="Ajoutez des membres de l'équipe pour les afficher sur le site."
          columns={[
            {
              header: "Photo",
              render: (m) =>
                m.photo ? (
                  <Image
                    src={m.photo.startsWith("http") ? m.photo : `http://127.0.0.1:8000${m.photo}`}
                    alt={m.name}
                    width={40}
                    height={40}
                    unoptimized
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dce5df] text-xs font-bold text-[#526259]">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                ),
            },
            {
              header: "Nom",
              render: (m) => <span className="font-medium text-[#16232a]">{m.name}</span>,
            },
            { header: "Fonction", render: (m) => m.role },
            { header: "Ordre", render: (m) => m.order },
            { header: "Statut", render: (m) => <PublishedBadge published={m.published} /> },
            {
              header: "Actions",
              className: "text-right",
              render: (m) => (
                <div className="flex justify-end gap-4">
                  <Link
                    href={`/admin/equipe/${m.id}/modifier`}
                    className="text-sm font-semibold text-[#a85c36] hover:underline"
                  >
                    Modifier
                  </Link>
                  <DeleteButton
                    action={deleteTeamMember.bind(null, m.id)}
                    confirmTitle={`Supprimer « ${m.name} » ?`}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>

      <section id="galerie" className="mt-12 max-w-4xl rounded-2xl border border-[#dce5df] bg-white p-6">
        <h2 className="text-sm font-bold tracking-[.12em] text-[#a85c36] uppercase">Galerie photo de l’équipe</h2>
        <p className="mt-1 text-sm text-[#526259]">
          Texte descriptif et photos visibles sur l’accueil et la page À propos.
        </p>
        <div className="mt-6">
          <AdminForm djangoPath="/team-gallery/" method="PATCH" submitLabel="Enregistrer le texte">
            <FormField label="Titre de la galerie" htmlFor="gallery_title">
              <input
                id="gallery_title"
                name="title"
                defaultValue={gallerySettings.title}
                className={inputClassName}
              />
            </FormField>
            <FormField
              label="Message descriptif"
              htmlFor="gallery_description"
              hint="Présentez l’équipe, le métier, le contexte de la photo de groupe, etc."
            >
              <textarea
                id="gallery_description"
                name="description"
                rows={5}
                defaultValue={gallerySettings.description}
                className={inputClassName}
              />
            </FormField>
          </AdminForm>
        </div>
        <div className="mt-8 border-t border-[#eef2ef] pt-6">
          <TeamGalleryManager photos={photos} deleteAction={deleteTeamGalleryPhoto} />
        </div>
      </section>
    </div>
  );
}
