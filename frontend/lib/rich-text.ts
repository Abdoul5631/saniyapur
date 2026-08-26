/** Rendu minimal et sûr du markdown léger produit par l’éditeur d’administration. */
export function renderSafeRichText(markdown: string): string {
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let html = escape(markdown);
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return html
    .split("\n\n")
    .map((paragraph) => {
      if (/^(-|\*) /.test(paragraph.trim())) {
        const items = paragraph.split("\n").filter(Boolean).map((line) => `<li>${line.replace(/^(-|\*) /, "")}</li>`).join("");
        return `<ul class="list-disc pl-5 space-y-1">${items}</ul>`;
      }
      return `<p>${paragraph.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");
}
