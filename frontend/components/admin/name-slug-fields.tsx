"use client";
import { useState } from "react";

const DIACRITICS = /[̀-ͯ]/g;
function slugify(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(DIACRITICS, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

type Props = { nameField?: string; nameLabel?: string; nameDefault?: string; slugDefault?: string };

export function NameSlugFields({ nameField = "name", nameLabel = "Nom", nameDefault = "", slugDefault = "" }: Props) {
  const [slug, setSlug] = useState(slugDefault);
  const [slugTouched, setSlugTouched] = useState(Boolean(slugDefault));
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={nameField} className="text-sm font-medium text-[#16232a]">{nameLabel}</label>
        <input id={nameField} name={nameField} required defaultValue={nameDefault} onChange={(event) => { if (!slugTouched) setSlug(slugify(event.target.value)); }} className="mt-1.5 w-full rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]" />
      </div>
      <div>
        <label htmlFor="slug" className="text-sm font-medium text-[#16232a]">Slug (URL)</label>
        <input id="slug" name="slug" required value={slug} onChange={(event) => { setSlug(event.target.value); setSlugTouched(true); }} className="mt-1.5 w-full rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]" />
      </div>
    </div>
  );
}
