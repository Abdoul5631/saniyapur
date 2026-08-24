import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { NewsFields } from "@/components/admin/news-fields";
import { createNews } from "../actions";

export default function NewNewsPage() {
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Nouvel article" />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={createNews} submitLabel="Créer l’article">
          <NewsFields />
        </AdminForm>
      </div>
    </div>
  );
}
