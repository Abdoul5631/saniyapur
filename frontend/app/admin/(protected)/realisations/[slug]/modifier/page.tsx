import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { RealisationFields } from "@/components/admin/realisation-fields";
import { RealisationImageManager } from "@/components/admin/realisation-image-manager";
import { adminFetch } from "@/lib/admin/api";
import type { PaginatedResponse, Realisation } from "@/types/realisation";
import type { AdminSector, AdminService } from "@/types/admin";
import { deleteRealisation, updateRealisation } from "../../actions";

export default async function EditRealisationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let realisation: Realisation;
  try {
    realisation = await adminFetch<Realisation>(`/realisations/${slug}/`);
  } catch {
    notFound();
  }
  const [sectors, services] = await Promise.all([
    adminFetch<PaginatedResponse<AdminSector>>("/sectors/"),
    adminFetch<PaginatedResponse<AdminService>>("/services/"),
  ]);
  const boundUpdate = updateRealisation.bind(null, slug);

  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={`Modifier « ${realisation.title} »`}
        action={<DeleteButton action={deleteRealisation.bind(null, slug)} label="Supprimer la réalisation" confirmTitle={`Supprimer « ${realisation.title} » ?`} />}
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={boundUpdate} submitLabel="Enregistrer les modifications">
          <RealisationFields realisation={realisation} sectors={sectors.results} services={services.results} />
        </AdminForm>
      </div>
      <div className="mt-8 rounded-2xl border border-[#dce5df] bg-white p-6">
        <RealisationImageManager realisationId={realisation.id} images={realisation.images} />
      </div>
    </div>
  );
}
