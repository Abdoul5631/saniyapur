"use client";
import { FormEvent, useState } from "react";
import { submitContact } from "@/lib/public-submit";

const fieldClass = "mt-1.5 w-full rounded-lg border border-[#dce5df] bg-white px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "offline" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const result = await submitContact(data);
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
        <label className="text-sm font-medium text-[#16232a]">Entreprise<input name="company" className={fieldClass} /></label>
        <label className="text-sm font-medium text-[#16232a]">Téléphone<input name="phone" type="tel" className={fieldClass} /></label>
        <label className="text-sm font-medium text-[#16232a]">E-mail<span className="text-red-600"> *</span><input name="email" type="email" required className={fieldClass} /></label>
      </div>
      <label className="text-sm font-medium text-[#16232a]">Sujet<input name="subject" className={fieldClass} /></label>
      <label className="text-sm font-medium text-[#16232a]">Message<span className="text-red-600"> *</span><textarea name="message" required rows={6} className={fieldClass} /></label>
      <button type="submit" disabled={status === "sending"} className="inline-flex items-center justify-center rounded-full bg-[#a85c36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60">
        {status === "sending" ? "Envoi…" : "Envoyer le message"}
      </button>
      {status === "success" && <p className="text-sm text-[#3f5149]">Votre message a bien été envoyé.</p>}
      {status === "offline" && <p className="text-sm text-[#7a4a2e]">Le formulaire sera transmis lorsque l’API backend sera connectée. Votre demande n’a pas été enregistrée.</p>}
      {status === "error" && <p className="text-sm text-red-600">L’envoi a échoué. Réessayez ou contactez-nous par téléphone.</p>}
    </form>
  );
}
