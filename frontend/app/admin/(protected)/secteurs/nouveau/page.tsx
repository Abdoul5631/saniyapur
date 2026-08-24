import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { SectorFields } from "@/components/admin/sector-fields";
import { createSector } from "../actions";

export default function NewSectorPage() {
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Nouveau secteur" />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={createSector} submitLabel="Créer le secteur">
          <SectorFields />
        </AdminForm>
      </div>
    </div>
  );
}
