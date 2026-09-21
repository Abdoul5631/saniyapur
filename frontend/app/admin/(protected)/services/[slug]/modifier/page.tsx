import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { ServiceFields } from "@/components/admin/service-fields";
import { adminFetch, adminFetchAll } from "@/lib/admin/api";
import type { AdminSector, AdminService } from "@/types/admin";
import { deleteService } from "../../actions";

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let service: AdminService;
  let sectors: AdminSector[];
  try {
    [service, sectors] = await Promise.all([
      adminFetch<AdminService>(`/services/${slug}/`),
      adminFetchAll<AdminSector>("/sectors/"),
    ]);
  } catch {
    notFound();
  }
  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={`Modifier « ${service.name} »`}
        action={<DeleteButton action={deleteService.bind(null, slug)} label="Supprimer le service" confirmTitle={`Supprimer « ${service.name} » ?`} />}
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm djangoPath={`/services/${encodeURIComponent(slug)}/`} method="PATCH" redirectTo="/admin/services" submitLabel="Enregistrer les modifications">
          <ServiceFields service={service} sectors={sectors} />
        </AdminForm>
      </div>
    </div>
  );
}
