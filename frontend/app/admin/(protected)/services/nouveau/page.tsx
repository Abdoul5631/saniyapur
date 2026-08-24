import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { ServiceFields } from "@/components/admin/service-fields";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Nouveau service" />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={createService} submitLabel="Créer le service">
          <ServiceFields />
        </AdminForm>
      </div>
    </div>
  );
}
