import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { SectorFields } from "@/components/admin/sector-fields";
import { adminFetch } from "@/lib/admin/api";
import type { AdminSector } from "@/types/admin";
import { deleteSector, updateSector } from "../../actions";

export default async function EditSectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let sector: AdminSector;
  try {
    sector = await adminFetch<AdminSector>(`/sectors/${slug}/`);
  } catch {
    notFound();
  }
  const boundUpdate = updateSector.bind(null, slug);
  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={`Modifier « ${sector.name} »`}
        action={<DeleteButton action={deleteSector.bind(null, slug)} label="Supprimer le secteur" confirmTitle={`Supprimer « ${sector.name} » ?`} confirmDescription="Impossible si des réalisations sont encore rattachées à ce secteur." />}
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={boundUpdate} submitLabel="Enregistrer les modifications">
          <SectorFields sector={sector} />
        </AdminForm>
      </div>
    </div>
  );
}
