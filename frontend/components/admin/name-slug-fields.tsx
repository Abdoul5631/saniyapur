"use client";
import { useState } from "react";
import { FormField, inputClassName } from "@/components/admin/form-field";

const DIACRITICS = /[\u0300-\u036f]/g;
function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Props = {
  nameField?: string;
  nameLabel?: string;
  nameDefault?: string;
  slugDefault?: string;
  required?: boolean;
};

/**
 * Champ Nom + champ slug caché auto-généré.
 * L'admin ne voit que le nom ; le slug est calculé automatiquement
 * (et peut être remplacé côté backend via save() si vide).
 */
export function NameSlugFields({
  nameField = "name",
  nameLabel = "Nom",
  nameDefault = "",
  slugDefault = "",
  required = true,
}: Props) {
  const [slug, setSlug] = useState(slugDefault);

  return (
    <>
      <FormField label={nameLabel} htmlFor={nameField} required={required}>
        <input
          id={nameField}
          name={nameField}
          required={required}
          defaultValue={nameDefault}
          onChange={(e) => {
            if (!slugDefault) setSlug(slugify(e.target.value));
          }}
          className={inputClassName}
        />
      </FormField>
      {/* Champ slug caché — généré depuis le nom ou conservé si déjà défini */}
      <input type="hidden" name="slug" value={slug} />
    </>
  );
}
