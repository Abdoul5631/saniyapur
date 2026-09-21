import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { AttestationFields } from "@/components/admin/attestation-fields";
import { adminFetch } from "@/lib/admin/api";
import type { Attestation } from "@/types/admin";

export const metadata = { title: "Modifier l'attestation — Administration" };

export default async function EditAttestationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let attestation: Attestation;
  try {
    attestation = await adminFetch<Attestation>(`/attestations/${id}/`);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <AdminHeader title={`Modifier : ${attestation.title}`} />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6 sm:p-8 shadow-xs">
        <AdminForm djangoPath={`/attestations/${attestation.id}/`} method="PATCH" redirectTo="/admin/attestations" submitLabel="Mettre à jour l'attestation">
          <AttestationFields attestation={attestation} />
        </AdminForm>
      </div>
    </div>
  );
}
