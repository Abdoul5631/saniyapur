import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { NewsAdminForm } from "@/components/admin/news-admin-form";
import { adminFetch } from "@/lib/admin/api";
import type { AdminNews } from "@/types/admin";
import { deleteNews } from "../../actions";

export default async function EditNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: AdminNews;
  try {
    article = await adminFetch<AdminNews>(`/news/${slug}/`);
  } catch {
    notFound();
  }
  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={`Modifier « ${article.title} »`}
        action={<DeleteButton action={deleteNews.bind(null, slug)} label="Supprimer l’article" confirmTitle={`Supprimer « ${article.title} » ?`} />}
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <NewsAdminForm article={article} submitLabel="Enregistrer les modifications" />
      </div>
    </div>
  );
}
