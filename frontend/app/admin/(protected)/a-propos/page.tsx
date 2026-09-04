import Link from "next/link";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { adminFetch } from "@/lib/admin/api";
import type { AboutSettings, TeamMember } from "@/types/admin";
import { updateAboutSettings } from "./actions";

export const metadata = { title: "À propos — Administration" };

export default async function AdminAboutPage() {
  const [about, teamData] = await Promise.all([
    adminFetch<AboutSettings>("/about/"),
    adminFetch<{ results: TeamMember[]; count: number } | TeamMember[]>("/team/").catch(() => []),
  ]);

  const teamMembers: TeamMember[] = Array.isArray(teamData)
    ? teamData
    : (teamData as { results: TeamMember[] })?.results ?? [];

  return (
    <div className="max-w-4xl">
      <AdminHeader
        title="Page À propos — Contenu Officiel"
        description="Gérez et modifiez l'ensemble des 12 sections de la présentation officielle de J&B SANIYAPUR SARL."
        action={
          <Link
            href="/a-propos"
            target="_blank"
            className="rounded-full border border-[#dce5df] bg-white px-4 py-2 text-xs font-semibold text-[#16232a] shadow-xs hover:bg-[#f7f8f6] hover:text-[#a85c36]"
          >
            Visualiser la page publique ↗
          </Link>
        }
      />

      <div className="mt-6 rounded-2xl border border-[#dce5df] bg-white p-6 sm:p-8 shadow-xs">
        <AdminForm action={updateAboutSettings} submitLabel="Enregistrer toutes les modifications">
          {/* 1. Présentation de la société */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                1
              </span>
              <h2 className="text-base font-bold text-[#16232a]">PRÉSENTATION DE LA SOCIÉTÉ</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre de la présentation" htmlFor="presentation_title" required>
                <input
                  id="presentation_title"
                  name="presentation_title"
                  required
                  defaultValue={about.presentation_title}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Devise officielle" htmlFor="presentation_devise">
                <textarea
                  id="presentation_devise"
                  name="presentation_devise"
                  rows={3}
                  defaultValue={about.presentation_devise ?? ""}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Texte de présentation" htmlFor="presentation_content" required>
                <textarea
                  id="presentation_content"
                  name="presentation_content"
                  rows={6}
                  required
                  defaultValue={about.presentation_content}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Fiche d'identifiant & Infos légales" htmlFor="presentation_legal_info">
                <textarea
                  id="presentation_legal_info"
                  name="presentation_legal_info"
                  rows={6}
                  defaultValue={about.presentation_legal_info ?? ""}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Illustration de présentation (facultatif)" htmlFor="presentation_image">
                <ImageUploader
                  id="presentation_image"
                  name="presentation_image"
                  currentUrl={about.presentation_image}
                  label="présentation"
                />
              </FormField>
            </div>
          </section>

          {/* 2. Présentation de l'équipe */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                  2
                </span>
                <h2 className="text-base font-bold text-[#16232a]">PRÉSENTATION DE L'ÉQUIPE</h2>
              </div>
              <Link
                href="/admin/equipe"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#a85c36] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#8b4a2b]"
              >
                Gérer les membres ({teamMembers.length}) →
              </Link>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre de la section équipe" htmlFor="team_presentation_title">
                <input
                  id="team_presentation_title"
                  name="team_presentation_title"
                  defaultValue={about.team_presentation_title ?? "PRÉSENTATION DE L'ÉQUIPE"}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Texte d'introduction de l'équipe" htmlFor="team_presentation_content">
                <textarea
                  id="team_presentation_content"
                  name="team_presentation_content"
                  rows={3}
                  defaultValue={about.team_presentation_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          {/* 3. Personnel opérationnel */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                3
              </span>
              <h2 className="text-base font-bold text-[#16232a]">LE PERSONNEL OPÉRATIONNEL</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre personnel opérationnel" htmlFor="operational_team_title">
                <input
                  id="operational_team_title"
                  name="operational_team_title"
                  defaultValue={about.operational_team_title ?? "LE PERSONNEL OPÉRATIONNEL"}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Garanties & Protections du personnel" htmlFor="operational_team_content">
                <textarea
                  id="operational_team_content"
                  name="operational_team_content"
                  rows={5}
                  defaultValue={about.operational_team_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          {/* 4. Notre engagement social */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                4
              </span>
              <h2 className="text-base font-bold text-[#16232a]">NOTRE ENGAGEMENT SOCIAL</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre engagement social" htmlFor="social_commitment_title">
                <input
                  id="social_commitment_title"
                  name="social_commitment_title"
                  defaultValue={about.social_commitment_title ?? "NOTRE ENGAGEMENT SOCIAL"}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Détails des engagements sociaux" htmlFor="social_commitment_content">
                <textarea
                  id="social_commitment_content"
                  name="social_commitment_content"
                  rows={5}
                  defaultValue={about.social_commitment_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          {/* 5. Importance et Enjeux du Bionettoyage */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                5
              </span>
              <h2 className="text-base font-bold text-[#16232a]">L'IMPORTANCE ET LES ENJEUX DU BIONETTOYAGE</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre section bionettoyage" htmlFor="bionettoyage_title">
                <input
                  id="bionettoyage_title"
                  name="bionettoyage_title"
                  defaultValue={about.bionettoyage_title ?? "L'IMPORTANCE ET LES ENJEUX DU BIONETTOYAGE"}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Explications & Principes clés" htmlFor="bionettoyage_content">
                <textarea
                  id="bionettoyage_content"
                  name="bionettoyage_content"
                  rows={6}
                  defaultValue={about.bionettoyage_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          {/* 6. Domaines de compétences */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                6
              </span>
              <h2 className="text-base font-bold text-[#16232a]">NOS DOMAINES DE COMPÉTENCES</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre domaines" htmlFor="competencies_title">
                <input
                  id="competencies_title"
                  name="competencies_title"
                  defaultValue={about.competencies_title ?? "NOS DOMAINES DE COMPÉTENCES"}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Liste des domaines" htmlFor="competencies_content">
                <textarea
                  id="competencies_content"
                  name="competencies_content"
                  rows={5}
                  defaultValue={about.competencies_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          {/* 7. Notre mission */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                7
              </span>
              <h2 className="text-base font-bold text-[#16232a]">NOTRE MISSION</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre de la mission" htmlFor="mission_title">
                <input
                  id="mission_title"
                  name="mission_title"
                  defaultValue={about.mission_title}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Contenu de la mission" htmlFor="mission_content">
                <textarea
                  id="mission_content"
                  name="mission_content"
                  rows={4}
                  defaultValue={about.mission_content}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          {/* 8. Notre objectif & Objectifs spécifiques */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                8
              </span>
              <h2 className="text-base font-bold text-[#16232a]">NOTRE OBJECTIF ET OBJECTIFS SPÉCIFIQUES</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre section objectif" htmlFor="objectives_title">
                <input
                  id="objectives_title"
                  name="objectives_title"
                  defaultValue={about.objectives_title ?? "NOTRE OBJECTIF ET OBJECTIFS SPÉCIFIQUES"}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Objectif principal" htmlFor="objectives_content">
                <textarea
                  id="objectives_content"
                  name="objectives_content"
                  rows={3}
                  defaultValue={about.objectives_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Objectifs spécifiques (1 à 6)" htmlFor="specific_objectives_content">
                <textarea
                  id="specific_objectives_content"
                  name="specific_objectives_content"
                  rows={6}
                  defaultValue={about.specific_objectives_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Avantages concrets du bionettoyage" htmlFor="bionettoyage_advantages_content">
                <textarea
                  id="bionettoyage_advantages_content"
                  name="bionettoyage_advantages_content"
                  rows={6}
                  defaultValue={about.bionettoyage_advantages_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          {/* 9. Notre vision & Le paradoxe que nous combattons */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                9
              </span>
              <h2 className="text-base font-bold text-[#16232a]">NOTRE VISION : LA SATISFACTION DES CLIENTS</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre de la vision" htmlFor="vision_title">
                <input
                  id="vision_title"
                  name="vision_title"
                  defaultValue={about.vision_title}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Énoncé de la vision" htmlFor="vision_content">
                <textarea
                  id="vision_content"
                  name="vision_content"
                  rows={3}
                  defaultValue={about.vision_content}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Le paradoxe que nous combattons" htmlFor="vision_paradox_content">
                <textarea
                  id="vision_paradox_content"
                  name="vision_paradox_content"
                  rows={3}
                  defaultValue={about.vision_paradox_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Comment nous réalisons cette vision" htmlFor="vision_execution_content">
                <textarea
                  id="vision_execution_content"
                  name="vision_execution_content"
                  rows={5}
                  defaultValue={about.vision_execution_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Impact direct sur la satisfaction" htmlFor="vision_impact_content">
                <textarea
                  id="vision_impact_content"
                  name="vision_impact_content"
                  rows={5}
                  defaultValue={about.vision_impact_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          {/* 10. Expertise internationale */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                10
              </span>
              <h2 className="text-base font-bold text-[#16232a]">EXPERTISE INTERNATIONALE</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre expertise internationale" htmlFor="international_expertise_title">
                <input
                  id="international_expertise_title"
                  name="international_expertise_title"
                  defaultValue={about.international_expertise_title ?? "EXPERTISE INTERNATIONALE"}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Détails du partenariat allemand & compétences" htmlFor="international_expertise_content">
                <textarea
                  id="international_expertise_content"
                  name="international_expertise_content"
                  rows={5}
                  defaultValue={about.international_expertise_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Illustration de l'expertise internationale (facultatif)" htmlFor="international_expertise_image">
                <ImageUploader
                  id="international_expertise_image"
                  name="international_expertise_image"
                  currentUrl={about.international_expertise_image}
                  label="expertise internationale"
                />
              </FormField>
            </div>
          </section>

          {/* 11. Nos références clients */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                11
              </span>
              <h2 className="text-base font-bold text-[#16232a]">NOS RÉFÉRENCES CLIENTS</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre références" htmlFor="references_title">
                <input
                  id="references_title"
                  name="references_title"
                  defaultValue={about.references_title ?? "NOS RÉFÉRENCES CLIENTS"}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Détails des références clients institutionnelles & de prestige" htmlFor="references_content">
                <textarea
                  id="references_content"
                  name="references_content"
                  rows={8}
                  defaultValue={about.references_content ?? ""}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          {/* 12. Message du Directeur Général */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                12
              </span>
              <h2 className="text-base font-bold text-[#16232a]">MESSAGE DU DIRECTEUR GÉNÉRAL</h2>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Nom du Directeur Général" htmlFor="dg_name">
                  <input
                    id="dg_name"
                    name="dg_name"
                    defaultValue={about.dg_name}
                    className={inputClassName}
                  />
                </FormField>
                <FormField label="Titre / Fonction" htmlFor="dg_role">
                  <input
                    id="dg_role"
                    name="dg_role"
                    defaultValue={about.dg_role}
                    className={inputClassName}
                  />
                </FormField>
              </div>
              <FormField label="Photo du Directeur Général" htmlFor="dg_photo">
                <ImageUploader
                  id="dg_photo"
                  name="dg_photo"
                  currentUrl={about.dg_photo}
                  label="directeur général"
                />
              </FormField>
              <FormField label="Message officiel du Directeur Général" htmlFor="dg_message">
                <textarea
                  id="dg_message"
                  name="dg_message"
                  rows={5}
                  defaultValue={about.dg_message}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>

          {/* 13. Nos engagements */}
          <section className="border-t border-[#eef2ef] pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                13
              </span>
              <h2 className="text-base font-bold text-[#16232a]">NOS ENGAGEMENTS</h2>
            </div>
            <div className="grid gap-4">
              <FormField label="Titre engagements" htmlFor="engagements_title">
                <input
                  id="engagements_title"
                  name="engagements_title"
                  defaultValue={about.engagements_title}
                  className={inputClassName}
                />
              </FormField>
              <FormField label="Liste officielle des engagements" htmlFor="engagements_content">
                <textarea
                  id="engagements_content"
                  name="engagements_content"
                  rows={6}
                  defaultValue={about.engagements_content}
                  className={inputClassName}
                />
              </FormField>
            </div>
          </section>
        </AdminForm>
      </div>
    </div>
  );
}
