import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { ImageGalleryUploader } from "@/components/admin/image-gallery-uploader";
import { ProductFields } from "@/components/admin/product-fields";
import { adminFetch } from "@/lib/admin/api";
import type { Product } from "@/types/product";
import { addProductImage, deleteProduct, deleteProductImage, updateProduct } from "../../actions";

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product: Product;
  try {
    product = await adminFetch<Product>(`/products/${slug}/`);
  } catch {
    notFound();
  }
  const boundUpdate = updateProduct.bind(null, slug);

  return (
    <div className="max-w-2xl">
      <AdminHeader
        title={`Modifier « ${product.name} »`}
        action={<DeleteButton action={deleteProduct.bind(null, slug)} label="Supprimer le produit" confirmTitle={`Supprimer « ${product.name} » ?`} />}
      />
      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm action={boundUpdate} submitLabel="Enregistrer les modifications">
          <ProductFields product={product} />
        </AdminForm>
      </div>
      <div className="mt-8 rounded-2xl border border-[#dce5df] bg-white p-6">
        <ImageGalleryUploader images={product.gallery ?? []} addAction={addProductImage.bind(null, product.id)} deleteAction={deleteProductImage} />
      </div>
    </div>
  );
}
