import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { ServiceFields } from "@/components/admin/service-fields";
import { adminFetchAll } from "@/lib/admin/api";
import type { AdminSector } from "@/types/admin";

export default async function NewServicePage() {
  const sectors = await adminFetchAll<AdminSector>("/sectors/");
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Nouveau service" />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm djangoPath="/services/" method="POST" redirectTo="/admin/services" submitLabel="Créer le service">
          <ServiceFields sectors={sectors} />
        </AdminForm>
      </div>
    </div>
  );
}
