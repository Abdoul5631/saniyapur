import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { RealisationFields } from "@/components/admin/realisation-fields";
import { adminFetch, adminFetchAll } from "@/lib/admin/api";
import type { AdminRealisation, AdminSector, AdminService } from "@/types/admin";

export default async function NewRealisationPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string; sector?: string; location?: string }>;
}) {
  const { client, sector, location } = await searchParams;
  const [sectors, services, knownClients] = await Promise.all([
    adminFetchAll<AdminSector>("/sectors/"),
    adminFetchAll<AdminService>("/services/"),
    adminFetch<string[]>("/realisations/clients/").catch(() => [] as string[]),
  ]);
  const prefill =
    client || sector || location
      ? ({
          client: client ?? "",
          location: location ?? "",
          sector: sector ?? "",
        } as AdminRealisation)
      : undefined;

  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={client ? `Nouvelle réalisation — ${client}` : "Nouvelle réalisation"}
        description={
          client
            ? "Le nom de l’entreprise, le secteur et la localisation sont repris. Changez le titre, la date, les services et les photos de ce chantier."
            : "Chaque chantier a sa propre fiche. Pour plusieurs interventions chez la même entreprise, réutilisez le même nom de client."
        }
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm
          djangoPath="/realisations/"
          method="POST"
          redirectTo="/admin/realisations"
          submitLabel="Créer la réalisation"
          relatedImage={{ field: "image", path: "/realisation-images/", parentKey: "realisation" }}
        >
          <RealisationFields
            realisation={prefill}
            sectors={sectors}
            services={services}
            knownClients={knownClients}
          />
        </AdminForm>
      </div>
    </div>
  );
}
