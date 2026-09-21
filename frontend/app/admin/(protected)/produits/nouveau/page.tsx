import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProductFields } from "@/components/admin/product-fields";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Nouveau produit" />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm djangoPath="/products/" method="POST" redirectTo="/admin/produits" submitLabel="Créer le produit">
          <ProductFields />
        </AdminForm>
      </div>
    </div>
  );
}
