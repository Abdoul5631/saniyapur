import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProductFields } from "@/components/admin/product-fields";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <AdminHeader title="Nouveau produit" />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={createProduct} submitLabel="Créer le produit">
          <ProductFields />
        </AdminForm>
      </div>
    </div>
  );
}
