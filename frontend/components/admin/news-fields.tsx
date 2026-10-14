import { FormLayout, publishRowClassName } from "@/components/admin/form-layout";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { NameSlugFields } from "@/components/admin/name-slug-fields";
import { PublishedToggle } from "@/components/admin/published-toggle";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { AdminNews } from "@/types/admin";

const NEWS_CATEGORIES = [
  "Entreprise",
  "Hygiène & Propreté",
  "Événement",
  "Offre & Promotion",
  "Réglementation",
  "Innovation",
];

export function NewsFields({ article }: { article?: AdminNews }) {
  return (
    <FormLayout
      aside={
        <>
      <div className="grid gap-4">
        <FormField label="Catégorie" htmlFor="category">
          <select id="category" name="category" defaultValue={article?.category ?? ""} className={inputClassName}>
            <option value="">Non catégorisé</option>
            {NEWS_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Auteur" htmlFor="author">
          <input id="author" name="author" defaultValue={article?.author} className={inputClassName} />
        </FormField>
      </div>

      <div className="grid gap-4">
        <FormField label="Image principale" htmlFor="image">
          <ImageUploader id="image" name="image" currentUrl={article?.image} label="actualité" />
        </FormField>
        <FormField label="Date de publication" htmlFor="published_at" hint="Laisser vide pour publier immédiatement.">
          <input
            id="published_at"
            name="published_at"
            type="datetime-local"
            defaultValue={article?.published_at?.slice(0, 16)}
            className={inputClassName}
          />
        </FormField>
      </div>

      {/* ── Mise en avant & Publication ── */}
      <div className={publishRowClassName}>
        <label className="flex items-center gap-2 text-sm font-medium text-[#16232a] cursor-pointer select-none">
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={article?.featured}
            className="h-4 w-4 rounded border-[#dce5df] accent-[#a85c36]"
          />
          Mis en avant
        </label>
        <PublishedToggle defaultChecked={article?.published} />
      </div>

        </>
      }
    >
      <NameSlugFields nameField="title" nameLabel="Titre de l'article" nameDefault={article?.title} slugDefault={article?.slug} />

      <FormField label="Résumé" htmlFor="excerpt" hint="Court résumé affiché dans les listes (généré automatiquement si vide).">
        <input id="excerpt" name="excerpt" maxLength={350} defaultValue={article?.excerpt} className={inputClassName} />
      </FormField>

      <FormField label="Contenu" htmlFor="content" required>
        <RichTextEditor id="content" name="content" defaultValue={article?.content} />
      </FormField>

    </FormLayout>
  );
}
