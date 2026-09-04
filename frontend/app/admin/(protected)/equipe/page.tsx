import Link from "next/link";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { PublishedBadge } from "@/components/admin/status-badge";
import { adminFetch } from "@/lib/admin/api";
import type { TeamMember } from "@/types/admin";
import { deleteTeamMember } from "./actions";

export const metadata = { title: "Équipe — Administration" };

export default async function AdminEquipePage() {
  const data = await adminFetch<{ results: TeamMember[]; count: number }>("/team/");
  const members: TeamMember[] = Array.isArray(data) ? data : (data.results ?? []);

  return (
    <div>
      <AdminHeader
        title="Équipe"
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
                  <div className="h-10 w-10 rounded-full bg-[#dce5df] flex items-center justify-center text-[#526259] text-xs font-bold">
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
    </div>
  );
}
