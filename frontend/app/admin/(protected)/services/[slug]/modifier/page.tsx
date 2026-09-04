import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { ServiceFields } from "@/components/admin/service-fields";
import { adminFetch } from "@/lib/admin/api";
import type { PaginatedResponse } from "@/types/realisation";
import type { AdminSector, AdminService } from "@/types/admin";
import { deleteService, updateService } from "../../actions";

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let service: AdminService;
  let sectors: PaginatedResponse<AdminSector>;
  try {
    [service, sectors] = await Promise.all([
      adminFetch<AdminService>(`/services/${slug}/`),
      adminFetch<PaginatedResponse<AdminSector>>("/sectors/"),
    ]);
  } catch {
    notFound();
  }
  const boundUpdate = updateService.bind(null, slug);
  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={`Modifier « ${service.name} »`}
        action={<DeleteButton action={deleteService.bind(null, slug)} label="Supprimer le service" confirmTitle={`Supprimer « ${service.name} » ?`} />}
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={boundUpdate} submitLabel="Enregistrer les modifications">
          <ServiceFields service={service} sectors={sectors.results} />
        </AdminForm>
      </div>
    </div>
  );
}
