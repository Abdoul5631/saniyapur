import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { NameSlugFields } from "@/components/admin/name-slug-fields";
import { PublishedToggle } from "@/components/admin/published-toggle";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { AdminNews } from "@/types/admin";

export function NewsFields({ article }: { article?: AdminNews }) {
  return (
    <>
      <NameSlugFields nameField="title" nameLabel="Titre" nameDefault={article?.title} slugDefault={article?.slug} />
      <FormField label="Résumé" htmlFor="excerpt" required>
        <input id="excerpt" name="excerpt" required maxLength={350} defaultValue={article?.excerpt} className={inputClassName} />
      </FormField>
      <FormField label="Contenu" htmlFor="content" required>
        <RichTextEditor id="content" name="content" defaultValue={article?.content} />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Auteur" htmlFor="author">
          <input id="author" name="author" defaultValue={article?.author} className={inputClassName} />
        </FormField>
        <FormField label="Date de publication" htmlFor="published_at">
          <input id="published_at" name="published_at" type="datetime-local" defaultValue={article?.published_at?.slice(0, 16)} className={inputClassName} />
        </FormField>
      </div>
      <FormField label="Image" htmlFor="image">
        <ImageUploader id="image" name="image" currentUrl={article?.image} label="actualité" />
      </FormField>
      <PublishedToggle defaultChecked={article?.published} />
    </>
  );
}
