import { AdminHeader } from "@/components/admin/admin-header";
import { NewsAdminForm } from "@/components/admin/news-admin-form";

export default function NewNewsPage() {
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Nouvel article" description="Le titre, le contenu et éventuellement une image. L’article n’apparaît sur le site que s’il est publié." />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <NewsAdminForm submitLabel="Créer l’article" />
      </div>
    </div>
  );
}
