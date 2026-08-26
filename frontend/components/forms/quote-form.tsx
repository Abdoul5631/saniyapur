"use client";
import { FormEvent, useState } from "react";
import { submitQuote } from "@/lib/public-submit";

const fieldClass = "mt-1.5 w-full rounded-lg border border-[#dce5df] bg-white px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]";

type Option = { name: string; slug: string };

export function QuoteForm({ services, sectors }: { services: Option[]; sectors: Option[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "offline" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const result = await submitQuote(new FormData(form));
    if (result.ok) {
      form.reset();
      setStatus("success");
      return;
    }
    setStatus(result.reason);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-[#dce5df] bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-[#16232a]">Nom<span className="text-red-600"> *</span><input name="name" required className={fieldClass} /></label>
        <label className="text-sm font-medium text-[#16232a]">Entreprise<input name="organisation" className={fieldClass} /></label>
        <label className="text-sm font-medium text-[#16232a]">Téléphone<span className="text-red-600"> *</span><input name="phone" type="tel" required className={fieldClass} /></label>
        <label className="text-sm font-medium text-[#16232a]">E-mail<span className="text-red-600"> *</span><input name="email" type="email" required className={fieldClass} /></label>
        <label className="text-sm font-medium text-[#16232a]">Localisation<input name="location" className={fieldClass} /></label>
        <label className="text-sm font-medium text-[#16232a]">
          Secteur
          <select name="sector" className={fieldClass} defaultValue="">
            <option value="">Sélectionner…</option>
            {sectors.map((sector) => <option key={sector.slug} value={sector.name}>{sector.name}</option>)}
          </select>
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-[#16232a]">
          Service recherché
          <select name="service" className={fieldClass} defaultValue="">
            <option value="">Sélectionner…</option>
            {services.map((service) => <option key={service.slug} value={service.name}>{service.name}</option>)}
          </select>
        </label>
      </div>
      <label className="text-sm font-medium text-[#16232a]">Description du besoin<span className="text-red-600"> *</span><textarea name="message" required rows={6} className={fieldClass} /></label>
      <label className="text-sm font-medium text-[#16232a]">Pièce jointe<input name="attachment" type="file" className={fieldClass} /></label>
      <button type="submit" disabled={status === "sending"} className="inline-flex items-center justify-center rounded-full bg-[#a85c36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60">
        {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
      </button>
      {status === "success" && <p className="text-sm text-[#3f5149]">Votre demande de devis a bien été envoyée. Elle apparaîtra dans l’espace d’administration.</p>}
      {status === "offline" && <p className="text-sm text-[#7a4a2e]">Le formulaire sera transmis lorsque l’API backend sera connectée. Votre demande n’a pas été enregistrée.</p>}
      {status === "error" && <p className="text-sm text-red-600">L’envoi a échoué. Réessayez ou contactez-nous par téléphone.</p>}
    </form>
  );
}
