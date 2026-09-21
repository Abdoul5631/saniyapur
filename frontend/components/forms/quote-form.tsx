"use client";
import { FormEvent, useState } from "react";
import { company } from "@/data/company";
import { submitQuote } from "@/lib/public-submit";

type Option = { name: string; slug: string };

const inputClass =
  "mt-1.5 w-full rounded-xl border border-[#dce5df] bg-white px-4 py-3 text-sm text-[#16232a] outline-none transition-all duration-200 focus:border-[#a85c36] focus:ring-2 focus:ring-[#a85c36]/10 placeholder:text-[#8a9a92]";

const selectClass =
  "mt-1.5 w-full rounded-xl border border-[#dce5df] bg-white px-4 py-3 text-sm text-[#16232a] outline-none transition-all duration-200 focus:border-[#a85c36] focus:ring-2 focus:ring-[#a85c36]/10 appearance-none cursor-pointer";

type Step = 1 | 2 | 3;

const steps = [
  { id: 1, label: "Vos coordonnées", icon: "👤" },
  { id: 2, label: "Votre besoin", icon: "🔍" },
  { id: 3, label: "Confirmation", icon: "✅" },
];

export function QuoteForm({ services, sectors }: { services: Option[]; sectors: Option[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "offline" | "error">("idle");
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    phone: "",
    email: "",
    location: "",
    sector: "",
    service: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function goNext(e: React.FormEvent) {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 3) as Step);
  }

  function goPrev() {
    setStep((prev) => Math.max(prev - 1, 1) as Step);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const fd = new FormData(event.currentTarget);
    // merge manually typed formData
    Object.entries(formData).forEach(([k, v]) => fd.set(k, v));
    const result = await submitQuote(fd);
    if (result.ok) {
      setStatus("success");
      return;
    }
    setStatus(result.reason);
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-[#dce5df] bg-white p-8 sm:p-12 text-center shadow-lg">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#a85c36] to-[#c97844] text-4xl shadow-xl shadow-[#a85c36]/20">
          ✅
        </div>
        <h2 className="text-2xl font-extrabold text-[#16232a]">Demande bien reçue !</h2>
        <p className="mt-3 text-base text-[#526259] max-w-sm mx-auto">
          Notre équipe analysera votre demande et vous contactera sous <strong>24 heures</strong> avec une proposition sur mesure.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:scale-105 transition-transform"
          >
            💬 Confirmer par WhatsApp
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#dce5df] px-5 py-2.5 text-sm font-semibold text-[#16232a] hover:bg-[#f8faf9] transition-colors"
          >
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  const progressPercent = ((step - 1) / 2) * 100;

  return (
    <div className="rounded-3xl border border-[#dce5df] bg-white shadow-xl overflow-hidden">
      {/* ── Barre de progression ── */}
      <div className="bg-[#f8faf9] border-b border-[#dce5df] px-6 sm:px-8 pt-6 pb-5">
        <div className="flex items-center justify-between mb-5">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`flex size-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                    step > s.id
                      ? "bg-[#a85c36] text-white shadow-md"
                      : step === s.id
                      ? "bg-[#a85c36] text-white shadow-lg shadow-[#a85c36]/30 scale-110"
                      : "bg-white text-[#8a9a92] border-2 border-[#dce5df]"
                  }`}
                >
                  {step > s.id ? "✓" : s.icon}
                </div>
                <span
                  className={`mt-1.5 hidden sm:block text-[11px] font-semibold transition-colors ${
                    step === s.id ? "text-[#a85c36]" : "text-[#8a9a92]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 mx-2 h-[2px] rounded-full bg-[#dce5df] overflow-hidden">
                  <div
                    className="h-full bg-[#a85c36] rounded-full transition-all duration-500"
                    style={{ width: step > s.id ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Barre globale de progression */}
        <div className="h-1.5 w-full rounded-full bg-[#dce5df] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#a85c36] to-[#c97844] transition-all duration-500"
            style={{ width: `${progressPercent === 0 ? 5 : progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] font-semibold text-[#8a9a92]">
          Étape {step} sur 3
        </p>
      </div>

      {/* ── Contenu du formulaire ── */}
      <div className="p-6 sm:p-8">
        {/* Étape 1 : Coordonnées */}
        {step === 1 && (
          <form onSubmit={goNext} className="grid gap-5">
            <div>
              <h3 className="text-lg font-bold text-[#16232a] mb-1">Vos coordonnées</h3>
              <p className="text-sm text-[#526259]">Ces informations nous permettront de vous recontacter.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-[#16232a]">
                  Nom complet <span className="text-[#a85c36]">*</span>
                </span>
                <input
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom et prénom"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#16232a]">Organisation</span>
                <input
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  placeholder="Entreprise, hôpital, hôtel…"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#16232a]">
                  Téléphone <span className="text-[#a85c36]">*</span>
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+226 XX XX XX XX"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#16232a]">
                  E-mail <span className="text-[#a85c36]">*</span>
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className={inputClass}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-[#16232a]">Localisation</span>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ouagadougou, Bobo-Dioulasso…"
                  className={inputClass}
                />
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a85c36] to-[#c97844] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#a85c36]/25 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95"
              >
                Continuer <span>→</span>
              </button>
            </div>
          </form>
        )}

        {/* Étape 2 : Besoin */}
        {step === 2 && (
          <form onSubmit={goNext} className="grid gap-5">
            <div>
              <h3 className="text-lg font-bold text-[#16232a] mb-1">Votre besoin</h3>
              <p className="text-sm text-[#526259]">Précisez votre demande pour que nous puissions vous faire une offre adaptée.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-[#16232a]">Secteur d'activité</span>
                <div className="relative">
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">Sélectionner un secteur…</option>
                    {sectors.map((sector) => (
                      <option key={sector.slug} value={sector.name}>{sector.name}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a85c36]">▾</span>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[#16232a]">Service recherché</span>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">Sélectionner un service…</option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a85c36]">▾</span>
                </div>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-[#16232a]">
                  Description du besoin <span className="text-[#a85c36]">*</span>
                </span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre situation : surface approximative, fréquence souhaitée, contraintes particulières, délais…"
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </label>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex items-center gap-2 rounded-full border border-[#dce5df] px-5 py-2.5 text-sm font-semibold text-[#526259] hover:bg-[#f8faf9] hover:border-[#a85c36]/30 transition-all"
              >
                ← Précédent
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a85c36] to-[#c97844] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#a85c36]/25 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95"
              >
                Continuer <span>→</span>
              </button>
            </div>
          </form>
        )}

        {/* Étape 3 : Récap + soumission */}
        {step === 3 && (
          <form onSubmit={onSubmit} className="grid gap-5">
            <div>
              <h3 className="text-lg font-bold text-[#16232a] mb-1">Récapitulatif</h3>
              <p className="text-sm text-[#526259]">Vérifiez vos informations avant d'envoyer votre demande.</p>
            </div>

            {/* Résumé des données */}
            <div className="rounded-2xl border border-[#dce5df] bg-[#f8faf9] p-5 grid gap-3">
              <div className="grid gap-2 text-sm">
                {[
                  { label: "👤 Nom", value: formData.name || "—" },
                  { label: "🏢 Organisation", value: formData.organisation || "—" },
                  { label: "📞 Téléphone", value: formData.phone || "—" },
                  { label: "📧 Email", value: formData.email || "—" },
                  { label: "📍 Localisation", value: formData.location || "—" },
                  { label: "🔍 Secteur", value: formData.sector || "—" },
                  { label: "⚙️ Service", value: formData.service || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-[#8a9a92] min-w-[130px] font-medium">{label}</span>
                    <span className="text-[#16232a] font-semibold truncate">{value}</span>
                  </div>
                ))}
              </div>
              {formData.message && (
                <div className="border-t border-[#dce5df] pt-3 mt-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a9a92] mb-1">Message</p>
                  <p className="text-sm text-[#16232a] leading-relaxed line-clamp-4">{formData.message}</p>
                </div>
              )}
            </div>

            {/* Champ pièce jointe */}
            <label className="block">
              <span className="text-sm font-semibold text-[#16232a]">Pièce jointe (optionnel)</span>
              <input name="attachment" type="file" className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-[#f1e4dc] file:px-3 file:py-1 file:text-xs file:font-bold file:text-[#a85c36] file:cursor-pointer`} />
            </label>

            {/* Messages d'état */}
            {status === "offline" && (
              <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
                <span className="text-xl">⚠️</span>
                <p className="text-sm text-amber-800">
                  Le formulaire sera transmis lorsque l'API backend sera connectée. Votre demande n'a pas été enregistrée. Contactez-nous directement par téléphone.
                </p>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-4">
                <span className="text-xl">❌</span>
                <p className="text-sm text-red-700">
                  L'envoi a échoué. Réessayez ou contactez-nous par téléphone au +226 45 33 18 67.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex items-center gap-2 rounded-full border border-[#dce5df] px-5 py-2.5 text-sm font-semibold text-[#526259] hover:bg-[#f8faf9] hover:border-[#a85c36]/30 transition-all"
              >
                ← Modifier
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a85c36] to-[#c97844] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#a85c36]/30 hover:shadow-2xl hover:scale-[1.03] transition-all active:scale-95 disabled:opacity-60 disabled:scale-100"
              >
                {status === "sending" ? (
                  <>
                    <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Envoi en cours…
                  </>
                ) : (
                  <>Envoyer ma demande ✓</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ── Pied du formulaire : Contact rapide ── */}
      <div className="border-t border-[#dce5df] bg-[#f8faf9] px-6 sm:px-8 py-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a9a92] mb-3">
          Ou contactez-nous directement
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 px-4 py-2 text-xs font-semibold text-[#16a34a] hover:bg-[#25D366]/20 transition-colors"
          >
            💬 WhatsApp 24/7
          </a>
          <a
            href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-[#dce5df] px-4 py-2 text-xs font-semibold text-[#16232a] hover:border-[#a85c36]/40 transition-colors"
          >
            📞 {company.contact.phone}
          </a>
          <span className="text-xs text-[#8a9a92]">⚡ Réponse sous 24h</span>
        </div>
      </div>
    </div>
  );
}
