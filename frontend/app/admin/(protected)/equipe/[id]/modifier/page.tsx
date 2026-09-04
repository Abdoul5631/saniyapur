import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { TeamMemberFields } from "@/components/admin/team-member-fields";
import { adminFetch } from "@/lib/admin/api";
import type { TeamMember } from "@/types/admin";
import { deleteTeamMember, updateTeamMember } from "../../actions";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let member: TeamMember;
  try {
    member = await adminFetch<TeamMember>(`/team/${id}/`);
  } catch {
    notFound();
  }
  const boundUpdate = updateTeamMember.bind(null, member.id);
  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={`Modifier « ${member.name} »`}
        action={
          <DeleteButton
            action={deleteTeamMember.bind(null, member.id)}
            label="Supprimer le membre"
            confirmTitle={`Supprimer « ${member.name} » ?`}
          />
        }
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={boundUpdate} submitLabel="Enregistrer les modifications">
          <TeamMemberFields member={member} />
        </AdminForm>
      </div>
    </div>
  );
}
