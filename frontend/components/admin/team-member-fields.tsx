import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { PublishedToggle } from "@/components/admin/published-toggle";
import type { TeamMember } from "@/types/admin";

export function TeamMemberFields({ member }: { member?: TeamMember }) {
  return (
    <>
      {/* ── Identité ── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Nom complet" htmlFor="name" required>
          <input id="name" name="name" required defaultValue={member?.name} className={inputClassName} />
        </FormField>
        <FormField label="Fonction / Poste" htmlFor="role" required hint="Ex. DIRECTEUR GÉNÉRAL, DIRECTEUR TECHNIQUE…">
          <input id="role" name="role" required defaultValue={member?.role} className={inputClassName} />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Téléphone / Contact" htmlFor="phone" hint="Ex. +226 06556709">
          <input id="phone" name="phone" defaultValue={member?.phone} className={inputClassName} />
        </FormField>
        <FormField label="Ordre d'affichage" htmlFor="order" hint="Numéro de position dans la liste (1 = premier).">
          <input id="order" name="order" type="number" min={0} defaultValue={member?.order ?? 0} className={inputClassName} />
        </FormField>
      </div>

      <FormField label="Rôle / Responsabilités / Bio" htmlFor="bio" hint="Description des responsabilités ou compétences de ce membre.">
        <textarea id="bio" name="bio" rows={4} defaultValue={member?.bio} className={inputClassName} />
      </FormField>

      <FormField label="Photo" htmlFor="photo">
        <ImageUploader id="photo" name="photo" currentUrl={member?.photo} label="membre" />
      </FormField>

      {/* ── Publication ── */}
      <div className="border-t border-[#dce5df] pt-4">
        <PublishedToggle defaultChecked={member?.published ?? true} />
      </div>
    </>
  );
}
