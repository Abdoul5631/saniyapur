import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { ServiceFields } from "@/components/admin/service-fields";
import { adminFetch } from "@/lib/admin/api";
import type { PaginatedResponse } from "@/types/realisation";
import type { AdminSector } from "@/types/admin";
import { createService } from "../actions";

export default async function NewServicePage() {
  const sectors = await adminFetch<PaginatedResponse<AdminSector>>("/sectors/");
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Nouveau service" />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={createService} submitLabel="Créer le service">
          <ServiceFields sectors={sectors.results} />
        </AdminForm>
      </div>
    </div>
  );
}
