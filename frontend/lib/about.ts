import { apiFetch } from "@/lib/api";
import type { AboutSettings } from "@/types/admin";

export const defaultAboutSettings: AboutSettings = {
  id: 1,
  presentation_title: "PRÉSENTATION DE LA SOCIÉTÉ",
  presentation_devise:
    'Notre Devise : "PROPRETÉ SUR ORDONNANCE"\nJ&B SANIYAPUR s’engage à créer et maintenir des environnements propres, sains et maîtrisés, en contribuant à la protection des personnes, à la préservation des espaces et des équipements, ainsi qu’à la qualité des activités, dans les établissements de santé comme dans les environnements professionnels et industriels.',
  presentation_content:
    'J&B SANIYAPUR SARL est une société spécialisée dans la maintenance immobilière, le nettoyage industriel et le bionettoyage des établissements de santé. Elle met son expertise au service des structures médicales et industries agro-alimentaires afin de garantir un environnement propre, sain et conforme aux normes d\'hygiène les plus exigeantes. Grâce à une expérience internationale depuis 2003 et un partenariat avec des entreprises allemandes réputées, nous offrons au Burkina Faso et en Afrique une expertise de classe mondiale en matière d\'hygiène hospitalière.\n\nEn effet, J&B SANIYAPUR SARL, dédiée au nettoyage industriel et aux centres médicaux, est une filiale de la société allemande « PUTZI SAUBER SERVICE et SYLT PURE REINIGUNG & PERSONALBEREITSTELLUNG GMBH & Co.KG », résultat de la fusion de deux entreprises allemandes d\'entretien, PUTZI SYLT et SYLT PURE (www.putzi-sylt.de et www.sylt-pure.com). Il y a quelques années, le groupe a également créé des sociétés immobilières de maintenance et d\'entretien (SIME) au Togo et la société de Maintenance immobilière et conciergerie Hospitalière (SMICH) au Senegal.\n\nFondée en 2025, J&B SANIYAPUR SARL est dirigée par Monsieur Jules TEKPO. Son siège est situé à Bobo-Dioulasso et à Ouagadougou.',
  presentation_legal_info:
    "Raison sociale : J&B SANIYAPUR SARL\nSecteur d’activité : Nettoyage industriel et bionettoyage de centres médicaux\nSiège social : Bobo-Dioulasso, Ouagadougou (BURKINA FASO)\nDirecteur Général : Monsieur Jules TEKPO\nContact principal : Tel : +226 06556709 / WhatsApp : +49 1727717178\nEmail : info@jb-saniyapur.com\nSite web : www.jb-saniyapur.com\nPartenaires Groupes : PUTZI SAUBER SERVICE & SYLT PURE REINIGUNG (Entreprises allemandes - www.putzi-sylt.de / www.sylt-pure.com)\nNuméro IFU : 00 288 071 F\nRCCM : BF-OUA-01-2025-B13-16674\nRIB : BF 0022022440514000160166",
  presentation_image: null,
  team_presentation_title: "PRÉSENTATION DE L'ÉQUIPE",
  team_presentation_content:
    "J&B SANIYAPUR dispose d'une équipe expérimentée et qualifiée, formée aux standards internationaux. Notre personnel est notre premier atout pour garantir un service de qualité irréprochable.",
  operational_team_title: "L’ÉQUIPE DE DIRECTION & LE PERSONNEL OPÉRATIONNEL",
  operational_team_content:
    "Notre équipe opérationnelle est composée de près de 100 techniciens de surface qualifiés, formés spécifiquement au bionettoyage hospitalier. Chaque membre du personnel :\n• Est déclaré à la Caisse de Sécurité Sociale.\n• Bénéficie d'une assurance maladie et de protections sociales.\n• Reçoit une formation continue aux protocoles d'hygiène.\n• Est équipé d'EPI (Équipements de Protection Individuelle) conformes.\n• Suit des contrôles médicaux réguliers.\n• Est évalué périodiquement sur ses performances.",
  social_commitment_title: "NOTRE ENGAGEMENT SOCIAL",
  social_commitment_content:
    "Nous nous engageons à offrir les meilleures conditions de travail à nos employés, qui sont avant tout nos concitoyens. À ce titre, nous prévoyons :\n• La mise en place d'une garderie pour les enfants de nos employés.\n• Un environnement de travail sain, sûr et respectueux.\n• Des opportunités de formation et d'évolution professionnelle.\n• Une rémunération équitable et des avantages sociaux.\n• Un soutien psychologique si nécessaire (travail en milieu hospitalier).",
  bionettoyage_title: "L'IMPORTANCE ET LES ENJEUX DU BIONETTOYAGE",
  bionettoyage_content:
    "Le bionettoyage en milieu hospitalier est un processus essentiel de nettoyage et de désinfection rigoureux des surfaces et équipements pour éliminer les micro-organismes pathogènes, prévenir les infections nosocomiales et assurer un environnement sûr pour patients et personnel.\n\nPrincipes clés :\n• Définition : Combinaison de nettoyage (élimination des saletés visibles) et de désinfection (élimination des micro-organismes invisibles).\n• Objectif : Maîtriser les infections nosocomiales, crucial dans les blocs opératoires et chambres.\n• Protocole : Suivi strict par des professionnels formés.\n\nLes Enjeux majeurs :\n• Prévention des infections nosocomiales : Réduire la charge microbienne et protéger les patients les plus vulnérables.\n• Protection du personnel soignant : Réduire les risques de contamination professionnelle.\n• Conformité réglementaire : Exigences des autorités sanitaires et normes internationales (OMS, normes ISO).\n• Image et confiance : Un hôpital propre inspire confiance aux patients et à leurs familles.",
  competencies_title: "NOS DOMAINES DE COMPÉTENCES",
  competencies_content:
    "1. Bionettoyage et désinfection\n2. Décapage et entretien des plateaux techniques\n3. Gestion des déchets industriels\n4. Produits & Équipements professionnels\n5. Formation & Placement du personnel\n6. Traitement des sanitaires\n7. Hygiène publique & environnementale",
  mission_title: "NOTRE MISSION",
  mission_content:
    "BIONETTOYAGE : Méthode d'hygiène hospitalière (Nettoyage + Désinfection)\n• NETTOYAGE : Élimine les salissures visibles\n• DÉSINFECTION : Détruit les micro-organismes\n\nRésultat : ENVIRONNEMENT HOSPITALIER ET INDUSTRIEL PROPRE ET SÉCURISÉ.\nRéduction des infections pour le personnel, les consommateurs et les visiteurs.\n\n« La propreté et l’hygiène qui protègent, la qualité qui rassure : Un bon équilibre entre santé, industrie et services »",
  objectives_title: "NOTRE OBJECTIF",
  objectives_content:
    "L'objectif principal de J&B SANIYAPUR est de permettre aux établissements de santé et industriels d'exercer leurs activités dans les meilleures conditions d'hygiène, en collaboration étroite avec les professionnels pour assurer un service de qualité irréprochable.",
  specific_objectives_content:
    "1. Maintenir la propreté dès la construction : Nous intervenons dès la phase de construction pour assurer que l'hôpital ou l’industrie conserve un état impeccable et durable.\n2. Prévenir la détérioration des équipements : Action en prévention contre la rouille et les dégradations conduisant aux fermetures.\n3. Garantir la sécurité sanitaire : Protection de la santé du personnel, des patients et des consommateurs en maintenant un environnement sain et désinfecté.\n4. Optimiser les coûts d'exploitation : Entretien préventif régulier pour éviter les réparations coûteuses et prolonger la durée de vie des équipements.\n5. Améliorer l'expérience client : Un environnement propre et agréable contribue au confort et au bien-être des clients.\n6. Valoriser l'image de l'établissement : Un environnement propre renforce la confiance des clients, partenaires et autorités.",
  bionettoyage_advantages_content:
    "Les avantages concrets du bionettoyage pour les établissements :\n✓ Réduire le risque d’infections.\n✓ Sécuriser les clients, le personnel, les consommateurs et les visiteurs.\n✓ Garantir une hygiène constante dans tous les services.\n✓ Préserver durablement les locaux et les équipements.\n✓ Améliorer le confort et l’expérience clients.\n✓ Faciliter le contrôle et la traçabilité des prestations.\n✓ Renforcer l’image et la confiance envers l’établissement.\n✓ Optimiser l’organisation du personnel.",
  vision_title: "NOTRE VISION : LA SATISFACTION DES CLIENTS",
  vision_content:
    "Notre vision est simple mais puissante : Contribuer activement à la satisfaction des clients en créant un environnement hospitalier sain, propre et sécurisé, exempt de risques de contamination.",
  vision_paradox_content:
    'LE PARADOXE QUE NOUS COMBATTONS :\nNous combattons l\'idée ironique et malheureusement trop réelle selon laquelle "on entre à l\'hôpital avec une maladie et on repart avec une autre ou plusieurs maladies". Cette expression, bien qu\'humoristique, reflète une réalité préoccupante : la contamination croisée et les infections liées au manque de qualité dans le bionettoyage des locaux.',
  vision_execution_content:
    "Comment nous réalisons cette vision :\n• Protocoles rigoureux : Application stricte des protocoles de bionettoyage adaptés à chaque zone, avec traçabilité complète.\n• Personnel hautement qualifié : Formation continue de nos équipes aux dernières techniques de désinfection et aux protocoles d'hygiène hospitalière internationaux.\n• Produits et équipements de pointe : Utilisation exclusive de produits certifiés bactéricides, virucides et sporicides, ainsi que d'équipements professionnels de fabrication allemande.\n• Approche préventive : Intervention proactive pour maintenir l'environnement hospitalier dans un état optimal permanent.\n• Contrôle qualité constant : Audits réguliers, contrôles microbiologiques, et système de traçabilité.\n• Collaboration avec le personnel soignant.",
  vision_impact_content:
    "Impact direct sur la satisfaction des clients :\n• Réduction des risques sanitaires et de contamination.\n• Amélioration de la sécurité et du bien-être.\n• Amélioration de la qualité de l’environnement de travail.\n• Réduction du stress et amélioration du confort.\n• Préservation des équipements et des infrastructures.\n• Amélioration de l’image et de la crédibilité de l’organisation.",
  international_expertise_title: "EXPERTISE INTERNATIONALE",
  international_expertise_content:
    "Grâce au travail d’équipe avec nos groupes allemands PUTZI SAUBER SERVICE et SYLT PURE REINIGUNG, nous bénéficions de :\n• Plus de 20 ans d'expérience dans le nettoyage hospitalier en Allemagne.\n• Accès aux dernières technologies et innovations en matière de bionettoyage.\n• Formation continue de nos équipes aux standards européens.\n• Équipements et produits certifiés conformes aux normes les plus strictes.\n• Méthodologie éprouvée dans des établissements de renommée internationale.\n• Transfert de savoir-faire et de bonnes pratiques.",
  international_expertise_image: null,
  references_title: "NOS RÉFÉRENCES CLIENTS",
  references_content:
    "1. CENTRE HOSPITALIER UNIVERSITAIRE (CHU) DE PALA\nServices : Nettoyage, bionettoyage des locaux, gestion des déchets, fournitures produits d'entretien, désinfection blocs opératoires, entretiens sanitaires, désinfection des surfaces.\nLocalisation : Bobo-Dioulasso, BURKINA FASO\n\n2. HÔPITAL DOGTA-LAFIÈ / CLINIQUE LE PRINTEMPS\nServices : Bionettoyage et désinfection, fourniture équipements, entretien général bureaux, désinfection des surfaces, formation du personnel.\nLocalisation : Lomé, TOGO (www.hopitaldogtalafie.tg)\n\nJ&B SANIYAPUR, à travers ses partenariats avec les entreprises allemandes PUTZI SAUBER SERVICE et SYLT PURE REINIGUNG, a développé une expertise reconnue dans le bionettoyage hospitalier et le nettoyage professionnel de haut standing.\n\n3. HOTEL BUDERSAND & HOTEL A-ROSA\nServices : Entretien et nettoyage général, désinfection des surfaces, nettoyage chambres, standards hôtellerie de luxe, entretien résidentiel haut de gamme.\nLocalisation : Sylt, ALLEMAGNE (www.budersand.de / www.a-rosa.de)\n\n4. 411 MAISONS DE LUXE\nServices : Nettoyage et désinfection, maintenance régulière.\nLocalisation : Sylt, ALLEMAGNE",
  engagements_title: "NOS ENGAGEMENTS",
  engagements_content:
    "1. Respect strict des protocoles de bionettoyage hospitalier.\n2. Personnel qualifié, formé et protégé socialement.\n3. Utilisation exclusive de produits et équipements certifiés.\n4. Traçabilité complète de toutes nos interventions.\n5. Contrôle qualité permanent et audits réguliers.\n6. Disponibilité et réactivité 24h/24, 7j/7.\n7. Collaboration étroite avec les équipes.\n8. Amélioration continue de nos services.",
  dg_name: "Monsieur Jules D. TEKPO",
  dg_role: "Directeur Général — J&B SANIYAPUR SARL",
  dg_photo: null,
  dg_message:
    "Après plusieurs années en tant qu'entrepreneur en Occident, je suis de retour chez moi, en Afrique, plus précisément au Burkina Faso, dans le pays des hommes fiers et intègres, pour offrir mon soutien et partager mon expertise. Avec J&B SANIYAPUR SARL, je souhaite surpasser tout ce que j'ai appris ailleurs. Mes 22 années d'expérience en Afrique et en Europe m'ont permis d'identifier et de comprendre les besoins de nos concitoyens.\n\nJe suis ravi d'être à votre service pour apporter confort et bien-être dans votre foyer.",
  updated_at: new Date().toISOString(),
};

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);

export async function getAboutSettings(): Promise<AboutSettings> {
  if (!useApi) return defaultAboutSettings;
  try {
    return await apiFetch<AboutSettings>("/about/", { cache: "no-store" });
  } catch {
    return defaultAboutSettings;
  }
}
