import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { RealisationFields } from "@/components/admin/realisation-fields";
import { adminFetch } from "@/lib/admin/api";
import type { PaginatedResponse } from "@/types/realisation";
import type { AdminSector, AdminService } from "@/types/admin";
import { createRealisation } from "../actions";

export default async function NewRealisationPage() {
  const [sectors, services] = await Promise.all([
    adminFetch<PaginatedResponse<AdminSector>>("/sectors/"),
    adminFetch<PaginatedResponse<AdminService>>("/services/"),
  ]);
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Nouvelle réalisation" description="La galerie de photos et le comparatif avant/après pourront être ajoutés une fois la fiche créée." />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={createRealisation} submitLabel="Créer la réalisation">
          <RealisationFields sectors={sectors.results} services={services.results} />
        </AdminForm>
      </div>
    </div>
  );
}
