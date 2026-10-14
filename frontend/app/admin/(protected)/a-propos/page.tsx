import Link from "next/link";
import { AboutSection, AboutToolbar } from "@/components/admin/about-section";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { adminFetch, adminFetchAll } from "@/lib/admin/api";
import type { AboutSettings, TeamMember } from "@/types/admin";

export const metadata = { title: "À propos — Administration" };

export default async function AdminAboutPage() {
  const [about, teamData] = await Promise.all([
    adminFetch<AboutSettings>("/about/"),
    adminFetchAll<TeamMember>("/team/").catch(() => [] as TeamMember[]),
  ]);

  const teamMembers: TeamMember[] = Array.isArray(teamData)
    ? teamData
    : [];

  return (
    <div className="max-w-4xl">
      <AdminHeader
        title="Page À propos — Contenu Officiel"
        description="Gérez et modifiez l'ensemble des sections de la présentation officielle. La photo de la page Engagement social se règle dans la section 4."
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

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-[#8a9a92]">13 sections — cliquez sur une section pour la modifier.</p>
        <AboutToolbar />
      </div>

      <div className="mt-4 rounded-2xl border border-[#dce5df] bg-white p-4 sm:p-6 shadow-xs">
        <AdminForm djangoPath="/about/" method="PATCH" submitLabel="Enregistrer toutes les modifications">
          {/* 1. Présentation de la société */}
          <AboutSection number={1} title="PRÉSENTATION DE LA SOCIÉTÉ" summary="Titre, devise, texte, infos légales" defaultOpen >
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
          </AboutSection>

          {/* 2. Présentation de l'équipe */}
          <AboutSection number={2} title="PRÉSENTATION DE L'ÉQUIPE" summary="Introduction de l'équipe" extra={
              <Link
                href="/admin/equipe"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#a85c36] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#8b4a2b]"
              >
                Gérer l’équipe & la galerie ({teamMembers.length}) →
              </Link>
            }
            >
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
          </AboutSection>

          {/* 3. Personnel opérationnel */}
          <AboutSection number={3} title="LE PERSONNEL OPÉRATIONNEL" summary="Garanties du personnel" >
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
          </AboutSection>

          {/* 4. Notre engagement social */}
          <AboutSection number={4} title="NOTRE ENGAGEMENT SOCIAL" summary="Texte et photo de la page dédiée" extra={
              <Link href="/engagement-social" target="_blank" className="shrink-0 text-xs font-semibold text-[#a85c36] hover:underline">
                Voir la page publique ↗
              </Link>
            }
            >
            <div className="grid gap-4">
              <FormField label="Titre engagement social" htmlFor="social_commitment_title">
                <input
                  id="social_commitment_title"
                  name="social_commitment_title"
                  defaultValue={about.social_commitment_title ?? "NOTRE ENGAGEMENT SOCIAL"}
                  className={inputClassName}
                />
              </FormField>
              <FormField
                label="Photo de la page Engagement social"
                htmlFor="social_commitment_image"
                hint="Image affichée en haut de /engagement-social. Si vide, la première photo de la galerie équipe est utilisée."
              >
                <ImageUploader
                  id="social_commitment_image"
                  name="social_commitment_image"
                  currentUrl={about.social_commitment_image}
                  label="engagement social"
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
          </AboutSection>

          {/* 5. Importance et Enjeux du Bionettoyage */}
          <AboutSection number={5} title="L'IMPORTANCE ET LES ENJEUX DU BIONETTOYAGE" summary="Enjeux et principes clés" >
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
          </AboutSection>

          {/* 6. Domaines de compétences */}
          <AboutSection number={6} title="NOS DOMAINES DE COMPÉTENCES" summary="Liste des domaines" >
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
          </AboutSection>

          {/* 7. Notre mission */}
          <AboutSection number={7} title="NOTRE MISSION" summary="Mission" >
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
          </AboutSection>

          {/* 8. Notre objectif & Objectifs spécifiques */}
          <AboutSection number={8} title="NOTRE OBJECTIF ET OBJECTIFS SPÉCIFIQUES" summary="Objectifs et avantages" >
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
          </AboutSection>

          {/* 9. Notre vision & Le paradoxe que nous combattons */}
          <AboutSection number={9} title="NOTRE VISION : LA SATISFACTION DES CLIENTS" summary="Vision, paradoxe, impact" >
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
          </AboutSection>

          {/* 10. Expertise internationale */}
          <AboutSection number={10} title="EXPERTISE INTERNATIONALE" summary="Partenariat allemand" >
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
          </AboutSection>

          {/* 11. Nos références clients */}
          <AboutSection number={11} title="NOS RÉFÉRENCES CLIENTS" summary="Références clients" >
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
          </AboutSection>

          {/* 12. Message du Directeur Général */}
          <AboutSection number={12} title="MESSAGE DU DIRECTEUR GÉNÉRAL" summary="Nom, photo et message du DG" >
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
          </AboutSection>

          {/* 13. Nos engagements */}
          <AboutSection number={13} title="NOS ENGAGEMENTS" summary="Liste officielle" >
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
          </AboutSection>
        </AdminForm>
      </div>
    </div>
  );
}
