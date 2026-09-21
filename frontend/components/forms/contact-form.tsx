"use client";
import { FormEvent, useState } from "react";
import { submitContact } from "@/lib/public-submit";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-[#dce5df] bg-white px-4 py-3 text-sm text-[#16232a] outline-none transition-all duration-200 focus:border-[#a85c36] focus:ring-2 focus:ring-[#a85c36]/10 placeholder:text-[#8a9a92]";

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

  if (status === "success") {
    return (
      <div className="grid gap-4 rounded-3xl border border-[#dce5df] bg-white p-8 sm:p-10 shadow-xs">
        <h3 className="text-xl font-extrabold text-[#16232a]">Message envoyé</h3>
        <p className="text-sm leading-relaxed text-[#526259]">
          Nous avons bien reçu votre message. Nous vous répondrons dans les meilleurs délais.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 inline-flex w-fit items-center rounded-full border border-[#dce5df] px-5 py-2 text-sm font-semibold text-[#526259] hover:bg-[#f8faf9]"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-3xl border border-[#dce5df] bg-white p-6 sm:p-8 shadow-xs"
    >
      <div>
        <h3 className="text-lg font-bold text-[#16232a]">Envoyer un message</h3>
        <p className="mt-1 text-sm text-[#526259]">Décrivez votre établissement et votre besoin.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#16232a]">
            Nom complet <span className="text-[#a85c36]">*</span>
          </span>
          <input name="name" required placeholder="Votre nom" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#16232a]">Entreprise</span>
          <input name="company" placeholder="Votre organisation" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#16232a]">Téléphone</span>
          <input name="phone" type="tel" placeholder="+226 XX XX XX XX" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#16232a]">
            E-mail <span className="text-[#a85c36]">*</span>
          </span>
          <input name="email" type="email" required placeholder="votre@email.com" className={inputClass} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-[#16232a]">Sujet</span>
          <input name="subject" placeholder="Objet de votre message" className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-[#16232a]">
          Message <span className="text-[#a85c36]">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre demande en détail…"
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </label>

      {/* Messages d'état */}
      {status === "offline" && (
        <div className="rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4">
          <p className="text-sm text-[#7a4a2e]">
            L’envoi n’a pas abouti. Contactez-nous par téléphone ou WhatsApp.
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">L’envoi a échoué. Réessayez ou appelez-nous.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a85c36] to-[#c97844] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#a85c36]/25 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-60 disabled:scale-100"
      >
        {status === "sending" ? (
          <>
            <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Envoi en cours…
          </>
        ) : (
          "Envoyer le message →"
        )}
      </button>
    </form>
  );
}
