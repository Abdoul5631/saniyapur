import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { ProcessedToggleButton } from "@/components/admin/processed-toggle-button";
import { adminFetch } from "@/lib/admin/api";
import type { PaginatedResponse } from "@/types/realisation";
import type { AdminUser } from "@/types/admin";
import { toggleUserActive } from "./actions";

const roleLabels: Record<string, string> = { admin: "Administrateur", editor: "Éditeur", commercial: "Commercial" };

export default async function AdminUsersPage() {
  const data = await adminFetch<PaginatedResponse<AdminUser>>("/users/");

  return (
    <div>
      <AdminHeader
        title="Utilisateurs"
        description="Comptes ayant accès à ce panneau d’administration."
        action={<Link href="/admin/utilisateurs/nouveau" className="rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8b4a2b]">Ajouter un utilisateur</Link>}
      />

      <DataTable
        rows={data.results}
        emptyTitle="Aucun utilisateur"
        columns={[
          { header: "Identifiant", render: (user) => <span className="font-medium text-[#16232a]">{user.username}</span> },
          { header: "E-mail", render: (user) => user.email },
          { header: "Rôle", render: (user) => <StatusBadge label={roleLabels[user.role] ?? user.role} tone="blue" /> },
          { header: "Statut", render: (user) => <ProcessedToggleButton processed={user.is_active} action={toggleUserActive.bind(null, user.id, !user.is_active)} onLabel="Activer" offLabel="Actif — désactiver" /> },
          { header: "Actions", className: "text-right", render: (user) => <Link href={`/admin/utilisateurs/${user.id}/modifier`} className="text-sm font-semibold text-[#a85c36] hover:underline">Modifier</Link> },
        ]}
      />
    </div>
  );
}
