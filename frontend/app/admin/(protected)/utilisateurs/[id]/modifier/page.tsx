import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { UserFields } from "@/components/admin/user-fields";
import { adminFetch } from "@/lib/admin/api";
import type { AdminUser } from "@/types/admin";
import { deleteUser, updateUser } from "../../actions";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let user: AdminUser;
  try {
    user = await adminFetch<AdminUser>(`/users/${id}/`);
  } catch {
    notFound();
  }
  const boundUpdate = updateUser.bind(null, user.id);

  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={`Modifier « ${user.username} »`}
        action={<DeleteButton action={deleteUser.bind(null, user.id)} label="Supprimer l’utilisateur" confirmTitle={`Supprimer le compte « ${user.username} » ?`} />}
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={boundUpdate} submitLabel="Enregistrer les modifications">
          <UserFields user={user} />
        </AdminForm>
      </div>
    </div>
  );
}
