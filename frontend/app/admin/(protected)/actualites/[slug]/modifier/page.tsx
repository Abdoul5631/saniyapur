import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { NewsFields } from "@/components/admin/news-fields";
import { adminFetch } from "@/lib/admin/api";
import type { AdminNews } from "@/types/admin";
import { deleteNews, updateNews } from "../../actions";

export default async function EditNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: AdminNews;
  try {
    article = await adminFetch<AdminNews>(`/news/${slug}/`);
  } catch {
    notFound();
  }
  const boundUpdate = updateNews.bind(null, slug);
  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={`Modifier « ${article.title} »`}
        action={<DeleteButton action={deleteNews.bind(null, slug)} label="Supprimer l’article" confirmTitle={`Supprimer « ${article.title} » ?`} />}
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={boundUpdate} submitLabel="Enregistrer les modifications">
          <NewsFields article={article} />
        </AdminForm>
      </div>
    </div>
  );
}
