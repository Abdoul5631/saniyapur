import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { TeamMemberFields } from "@/components/admin/team-member-fields";
import { createTeamMember } from "../actions";

export const metadata = { title: "Nouveau membre — Administration" };

export default function NewTeamMemberPage() {
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Ajouter un membre" />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={createTeamMember} submitLabel="Ajouter le membre">
          <TeamMemberFields />
        </AdminForm>
      </div>
    </div>
  );
}
