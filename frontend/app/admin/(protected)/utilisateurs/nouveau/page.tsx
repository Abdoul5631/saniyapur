import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { UserFields } from "@/components/admin/user-fields";
import { createUser } from "../actions";

export default function NewUserPage() {
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Nouvel utilisateur" />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={createUser} submitLabel="Créer l’utilisateur">
          <UserFields />
        </AdminForm>
      </div>
    </div>
  );
}
