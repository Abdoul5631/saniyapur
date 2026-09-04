import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { AttestationFields } from "@/components/admin/attestation-fields";
import { createAttestation } from "../actions";

export const metadata = { title: "Ajouter une attestation — Administration" };

export default function NewAttestationPage() {
  return (
    <div className="max-w-3xl">
      <AdminHeader title="Ajouter une attestation ou référence" />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6 sm:p-8 shadow-xs">
        <AdminForm action={createAttestation} submitLabel="Enregistrer l'attestation">
          <AttestationFields />
        </AdminForm>
      </div>
    </div>
  );
}
