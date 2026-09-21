import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { RealisationFields } from "@/components/admin/realisation-fields";
import { RealisationImageManager } from "@/components/admin/realisation-image-manager";
import { adminFetch, adminFetchAll, normaliseAdminList } from "@/lib/admin/api";
import type { PaginatedResponse, Realisation } from "@/types/realisation";
import type { AdminSector, AdminService } from "@/types/admin";
import { deleteRealisation } from "../../actions";

function sameClientNewUrl(realisation: Realisation) {
  const params = new URLSearchParams();
  if (realisation.client) params.set("client", realisation.client);
  if (realisation.sector) params.set("sector", realisation.sector);
  if (realisation.location) params.set("location", realisation.location);
  return `/admin/realisations/nouveau?${params.toString()}`;
}

export default async function EditRealisationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let realisation: Realisation;
  try {
    realisation = await adminFetch<Realisation>(`/realisations/${slug}/`);
  } catch {
    notFound();
  }
  const siblingParams = realisation.client
    ? `?client=${encodeURIComponent(realisation.client)}`
    : "";
  const [sectors, services, knownClients, siblingsData] = await Promise.all([
    adminFetchAll<AdminSector>("/sectors/"),
    adminFetchAll<AdminService>("/services/"),
    adminFetch<string[]>("/realisations/clients/").catch(() => [] as string[]),
    realisation.client
      ? adminFetch<PaginatedResponse<Realisation> | Realisation[]>(`/realisations/${siblingParams}`).catch(
          () => [] as Realisation[],
        )
      : Promise.resolve([] as Realisation[]),
  ]);
  const siblings = normaliseAdminList(siblingsData).filter((item) => item.slug !== realisation.slug);

  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={`Modifier « ${realisation.title} »`}
        action={
          <div className="flex flex-wrap items-center gap-3">
            {realisation.client ? (
              <Link
                href={sameClientNewUrl(realisation)}
                className="rounded-full border border-[#a85c36] px-4 py-2 text-sm font-semibold text-[#a85c36] hover:bg-[#f1e4dc]"
              >
                Autre chantier pour ce client
              </Link>
            ) : null}
            <DeleteButton action={deleteRealisation.bind(null, slug)} label="Supprimer la réalisation" confirmTitle={`Supprimer « ${realisation.title} » ?`} />
          </div>
        }
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm
          djangoPath={`/realisations/${encodeURIComponent(slug)}/`}
          method="PATCH"
          submitLabel="Enregistrer les modifications"
          relatedImage={{
            field: "image",
            path: "/realisation-images/",
            parentKey: "realisation",
            parentId: realisation.id,
          }}
        >
          <RealisationFields
            realisation={realisation}
            sectors={sectors}
            services={services}
            knownClients={knownClients}
          />
        </AdminForm>
      </div>
      {realisation.client ? (
        <div className="mt-8 rounded-2xl border border-[#dce5df] bg-white p-6">
          <h2 className="text-lg font-extrabold text-[#16232a]">Autres chantiers — {realisation.client}</h2>
          <p className="mt-1 text-sm text-[#526259]">
            Une réalisation = un chantier. Créez une nouvelle fiche pour chaque intervention chez la même entreprise.
          </p>
          {siblings.length > 0 ? (
            <ul className="mt-4 divide-y divide-[#dce5df]">
              {siblings.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 py-2">
                  <span className="text-sm text-[#16232a]">{item.title}</span>
                  <Link
                    href={`/admin/realisations/${item.slug}/modifier`}
                    className="shrink-0 text-sm font-semibold text-[#a85c36] hover:underline"
                  >
                    Modifier
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-[#526259]">Aucun autre chantier enregistré pour cette entreprise.</p>
          )}
          <Link
            href={sameClientNewUrl(realisation)}
            className="mt-4 inline-flex rounded-full bg-[#a85c36] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8b4a2b]"
          >
            Ajouter une réalisation pour {realisation.client}
          </Link>
        </div>
      ) : (
        <p className="mt-6 text-sm text-[#526259]">
          Indiquez le nom du client pour pouvoir ajouter d’autres chantiers à la même entreprise.
        </p>
      )}
      <div className="mt-8 rounded-2xl border border-[#dce5df] bg-white p-6">
        <RealisationImageManager realisationId={realisation.id} images={realisation.images} />
      </div>
    </div>
  );
}
