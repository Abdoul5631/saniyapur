"use client";
import { useRef, useState, type ChangeEvent } from "react";

function wrapSelection(textarea: HTMLTextAreaElement, before: string, after: string) {
  const { selectionStart, selectionEnd, value } = textarea;
  const selected = value.slice(selectionStart, selectionEnd);
  const next = value.slice(0, selectionStart) + before + selected + after + value.slice(selectionEnd);
  return { next, cursor: selectionStart + before.length + selected.length + after.length };
}

/** Rendu minimal et sûr : le texte est d’abord échappé, seules nos propres balises contrôlées sont ensuite injectées. */
function renderPreview(markdown: string): string {
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let html = escape(markdown);
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html
    .split("\n\n")
    .map((paragraph) => {
      if (/^(-|\*) /.test(paragraph.trim())) {
        const items = paragraph.split("\n").filter(Boolean).map((line) => `<li>${line.replace(/^(-|\*) /, "")}</li>`).join("");
        return `<ul class="list-disc pl-5">${items}</ul>`;
      }
      return `<p>${paragraph.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");
  return html;
}

/**
 * Éditeur léger sans dépendance externe : formatage markdown minimal (gras, italique, listes) avec bascule aperçu.
 * Le contenu reste du texte brut côté base de données (pas de HTML stocké) — aucun risque d’injection.
 */
export function RichTextEditor({ id, name, defaultValue = "" }: { id: string; name: string; defaultValue?: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [showPreview, setShowPreview] = useState(false);

  function applyWrap(before: string, after: string = before) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { next, cursor } = wrapSelection(textarea, before, after);
    setValue(next);
    requestAnimationFrame(() => { textarea.focus(); textarea.setSelectionRange(cursor, cursor); });
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 rounded-t-lg border border-b-0 border-[#dce5df] bg-[#f7f8f6] p-2">
        <button type="button" onClick={() => applyWrap("**")} className="rounded-md px-2.5 py-1.5 text-sm font-bold text-[#16232a] hover:bg-white">G</button>
        <button type="button" onClick={() => applyWrap("*")} className="rounded-md px-2.5 py-1.5 text-sm italic text-[#16232a] hover:bg-white">I</button>
        <button type="button" onClick={() => applyWrap("\n- ", "")} className="rounded-md px-2.5 py-1.5 text-sm text-[#16232a] hover:bg-white">Liste</button>
        <button type="button" onClick={() => setShowPreview((current) => !current)} className="ml-auto rounded-md border border-[#dce5df] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#a85c36]">{showPreview ? "Éditer" : "Aperçu"}</button>
      </div>
      {showPreview ? (
        <div className="min-h-48 rounded-b-lg border border-[#dce5df] px-3 py-2.5 text-sm leading-6 text-[#16232a]" dangerouslySetInnerHTML={{ __html: renderPreview(value) || "<p class=\"text-[#8a9a92]\">Rien à prévisualiser.</p>" }} />
      ) : (
        <textarea ref={textareaRef} id={id} name={name} value={value} onChange={handleChange} rows={10} className="w-full rounded-b-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]" />
      )}
      <p className="mt-1 text-xs text-[#8a9a92]">Formatage simple : **gras**, *italique*, lignes commençant par « - » pour une liste.</p>
    </div>
  );
}
