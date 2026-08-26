import { company } from "@/data/company";
import { benefits } from "@/data/home-content";

/** Contenu institutionnel issu de la présentation déjà utilisée sur le site. Les sections sans source officielle restent des emplacements. */
export const aboutIntro = {
  title: "Présentation de J&B SANIYAPUR",
  paragraphs: [
    "Société spécialisée dans la maintenance immobilière, le nettoyage industriel et le bionettoyage, J&B SANIYAPUR SARL intervient également en désinfection et assainissement, hygiène publique et environnementale, traitement des sanitaires et gestion des déchets industriels — au service des environnements de santé comme des environnements professionnels et industriels.",
    `Implantée à ${company.contact.locations}, l’entreprise met son expérience de terrain au service d’organisations publiques et privées, avec une exigence constante de qualité, de méthode et de maîtrise des risques sanitaires.`,
  ],
};

export const aboutSections: { id: string; title: string; body: string[]; pending?: boolean }[] = [
  {
    id: "histoire",
    title: "Notre histoire",
    pending: true,
    body: ["Le récit détaillé de l’histoire de J&B SANIYAPUR SARL sera publié depuis l’administration, à partir de la présentation officielle de l’entreprise."],
  },
  {
    id: "mission",
    title: "Notre mission",
    body: [
      "Offrir des solutions professionnelles de propreté, d’hygiène et de maintenance qui protègent les personnes, les espaces et les activités.",
      company.slogan,
    ],
  },
  {
    id: "vision",
    title: "Notre vision",
    pending: true,
    body: ["La vision institutionnelle de l’entreprise sera reprise ici dès qu’elle sera renseignée depuis l’administration."],
  },
  {
    id: "objectifs",
    title: "Nos objectifs",
    pending: true,
    body: ["Les objectifs officiels de J&B SANIYAPUR SARL seront publiés depuis l’administration."],
  },
  {
    id: "engagements",
    title: "Nos engagements",
    body: [
      "L’entreprise oriente son action vers des environnements plus sûrs, plus sains et mieux maîtrisés.",
      ...benefits,
    ],
  },
  {
    id: "expertise-internationale",
    title: "Notre expertise internationale",
    pending: true,
    body: ["Le détail de l’expertise internationale de SANIYAPUR sera publié depuis l’administration. Aucune référence, certification ou chiffre n’est affiché tant qu’il n’est pas validé."],
  },
  {
    id: "partenariats",
    title: "Nos partenariats",
    pending: true,
    body: ["Les partenariats officiels seront listés ici lorsqu’ils seront renseignés depuis l’administration. Aucun partenaire n’est inventé."],
  },
  {
    id: "equipe",
    title: "Notre équipe / direction",
    pending: true,
    body: ["Les informations relatives à l’équipe et à la direction seront publiées depuis l’administration."],
  },
  {
    id: "message-dg",
    title: "Message du Directeur Général",
    pending: true,
    body: ["Le message du Directeur Général sera publié ici dès qu’il sera disponible depuis l’administration."],
  },
];
