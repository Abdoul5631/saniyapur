import os
import shutil
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from site_settings.models import AboutSettings, SiteSettings
from team.models import TeamMember

# Copy extracted media images to frontend public directory
public_img_dir = os.path.abspath('../frontend/public/images/official')
os.makedirs(public_img_dir, exist_ok=True)
ext_media = os.path.abspath('../extracted_media')
if os.path.exists(ext_media):
    for f in os.listdir(ext_media):
        shutil.copy(os.path.join(ext_media, f), os.path.join(public_img_dir, f))
    print('Copied media files to frontend public dir:', public_img_dir)

# Update AboutSettings singleton
about = AboutSettings.load()
about.presentation_title = 'PRÉSENTATION DE LA SOCIÉTÉ'
about.presentation_devise = (
    'Notre Devise : "PROPRETÉ SUR ORDONNANCE"\n'
    'J&B SANIYAPUR s’engage à créer et maintenir des environnements propres, sains et maîtrisés, '
    'en contribuant à la protection des personnes, à la préservation des espaces et des équipements, '
    'ainsi qu’à la qualité des activités, dans les établissements de santé comme dans les environnements professionnels et industriels.'
)
about.presentation_content = (
    'J&B SANIYAPUR SARL est une société spécialisée dans la maintenance immobilière, le nettoyage industriel et le bionettoyage des établissements de santé. '
    'Elle met son expertise au service des structures médicales et industries agro-alimentaires afin de garantir un environnement propre, sain et conforme aux normes d\'hygiène les plus exigeantes. '
    'Grâce à une expérience internationale depuis 2003 et un partenariat avec des entreprises allemandes réputées, nous offrons au Burkina Faso et en Afrique une expertise de classe mondiale en matière d\'hygiène hospitalière.\n\n'
    'En effet, J&B SANIYAPUR SARL, dédiée au nettoyage industriel et aux centres médicaux, est une filiale de la société allemande « PUTZI SAUBER SERVICE et SYLT PURE REINIGUNG & PERSONALBEREITSTELLUNG GMBH & Co.KG », résultat de la fusion de deux entreprises allemandes d\'entretien, PUTZI SYLT et SYLT PURE (www.putzi-sylt.de et www.sylt-pure.com). Il y a quelques années, le groupe a également créé des sociétés immobilières de maintenance et d\'entretien (SIME) au Togo et la société de Maintenance immobilière et conciergerie Hospitalière (SMICH) au Senegal.\n\n'
    'Fondée en 2025, J&B SANIYAPUR SARL est dirigée par Monsieur Jules TEKPO. Son siège est situé à Bobo-Dioulasso et à Ouagadougou.'
)
about.presentation_legal_info = (
    'Raison sociale : J&B SANIYAPUR SARL\n'
    'Secteur d’activité : Nettoyage industriel et bionettoyage de centres médicaux\n'
    'Siège social : Bobo-Dioulasso, Ouagadougou (BURKINA FASO)\n'
    'Directeur Général : Monsieur Jules TEKPO\n'
    'Contact principal : Tel : +226 06556709 / WhatsApp : +49 1727717178\n'
    'Email : info@jb-saniyapur.com\n'
    'Site web : www.jb-saniyapur.com\n'
    'Partenaires Groupes : PUTZI SAUBER SERVICE & SYLT PURE REINIGUNG (Entreprises allemandes - www.putzi-sylt.de / www.sylt-pure.com)\n'
    'Numéro IFU : 00 288 071 F\n'
    'RCCM : BF-OUA-01-2025-B13-16674\n'
    'RIB : BF 0022022440514000160166'
)

about.team_presentation_title = 'PRÉSENTATION DE L\'ÉQUIPE'
about.team_presentation_content = (
    'J&B SANIYAPUR dispose d\'une équipe expérimentée et qualifiée, formée aux standards internationaux. Notre personnel est notre premier atout pour garantir un service de qualité irréprochable.'
)
about.operational_team_title = 'L’ÉQUIPE DE DIRECTION & LE PERSONNEL OPÉRATIONNEL'
about.operational_team_content = (
    'Notre équipe opérationnelle est composée de près de 100 techniciens de surface qualifiés, formés spécifiquement au bionettoyage hospitalier. Chaque membre du personnel :\n'
    '• Est déclaré à la Caisse de Sécurité Sociale.\n'
    '• Bénéficie d\'une assurance maladie et de protections sociales.\n'
    '• Reçoit une formation continue aux protocoles d\'hygiène.\n'
    '• Est équipé d\'EPI (Équipements de Protection Individuelle) conformes.\n'
    '• Suit des contrôles médicaux réguliers.\n'
    '• Est évalué périodiquement sur ses performances.'
)

about.social_commitment_title = 'NOTRE ENGAGEMENT SOCIAL'
about.social_commitment_content = (
    'Nous nous engageons à offrir les meilleures conditions de travail à nos employés, qui sont avant tout nos concitoyens. À ce titre, nous prévoyons :\n'
    '• La mise en place d\'une garderie pour les enfants de nos employés.\n'
    '• Un environnement de travail sain, sûr et respectueux.\n'
    '• Des opportunités de formation et d\'évolution professionnelle.\n'
    '• Une rémunération équitable et des avantages sociaux.\n'
    '• Un soutien psychologique si nécessaire (travail en milieu hospitalier).'
)

about.bionettoyage_title = 'L\'IMPORTANCE ET LES ENJEUX DU BIONETTOYAGE'
about.bionettoyage_content = (
    'Le bionettoyage en milieu hospitalier est un processus essentiel de nettoyage et de désinfection rigoureux des surfaces et équipements pour éliminer les micro-organismes pathogènes, prévenir les infections nosocomiales et assurer un environnement sûr pour patients et personnel.\n\n'
    'Principes clés :\n'
    '• Définition : Combinaison de nettoyage (élimination des saletés visibles) et de désinfection (élimination des micro-organismes invisibles).\n'
    '• Objectif : Maîtriser les infections nosocomiales, crucial dans les blocs opératoires et chambres.\n'
    '• Protocole : Suivi strict par des professionnels formés.\n\n'
    'Les Enjeux majeurs :\n'
    '• Prévention des infections nosocomiales : Réduire la charge microbienne et protéger les patients les plus vulnérables.\n'
    '• Protection du personnel soignant : Réduire les risques de contamination professionnelle.\n'
    '• Conformité réglementaire : Exigences des autorités sanitaires et normes internationales (OMS, normes ISO).\n'
    '• Image et confiance : Un hôpital propre inspire confiance aux patients et à leurs familles.'
)

about.competencies_title = 'NOS DOMAINES DE COMPÉTENCES'
about.competencies_content = (
    '1. Bionettoyage et désinfection\n'
    '2. Décapage et entretien des plateaux techniques\n'
    '3. Gestion des déchets industriels\n'
    '4. Produits & Équipements professionnels\n'
    '5. Formation & Placement du personnel\n'
    '6. Traitement des sanitaires\n'
    '7. Hygiène publique & environnementale'
)

about.mission_title = 'NOTRE MISSION'
about.mission_content = (
    'BIONETTOYAGE : Méthode d\'hygiène hospitalière (Nettoyage + Désinfection)\n'
    '• NETTOYAGE : Élimine les salissures visibles\n'
    '• DÉSINFECTION : Détruit les micro-organismes\n\n'
    'Résultat : ENVIRONNEMENT HOSPITALIER ET INDUSTRIEL PROPRE ET SÉCURISÉ.\n'
    'Réduction des infections pour le personnel, les consommateurs et les visiteurs.\n\n'
    '« La propreté et l’hygiène qui protègent, la qualité qui rassure : Un bon équilibre entre santé, industrie et services »'
)

about.objectives_title = 'NOTRE OBJECTIF'
about.objectives_content = (
    'L\'objectif principal de J&B SANIYAPUR est de permettre aux établissements de santé et industriels d\'exercer leurs activités dans les meilleures conditions d\'hygiène, en collaboration étroite avec les professionnels pour assurer un service de qualité irréprochable.'
)
about.specific_objectives_content = (
    '1. Maintenir la propreté dès la construction : Nous intervenons dès la phase de construction pour assurer que l\'hôpital ou l’industrie conserve un état impeccable et durable.\n'
    '2. Prévenir la détérioration des équipements : Prévenir la rouille, l\'usure et les fermetures d\'établissements.\n'
    '3. Garantir la sécurité sanitaire : Protéger la santé du personnel, des patients et des consommateurs en maintenant un environnement sain et désinfecté.\n'
    '4. Optimiser les coûts d\'exploitation : Entretien préventif régulier pour éviter les réparations coûteuses et prolonger la durée de vie des équipements.\n'
    '5. Améliorer l\'expérience client : Un environnement propre et agréable contribue au confort et au bien-être des clients.\n'
    '6. Valoriser l\'image de l\'établissement : Un environnement propre renforce la confiance des clients, partenaires et autorités.'
)
about.bionettoyage_advantages_content = (
    'Les avantages concrets du bionettoyage pour les établissements :\n'
    '✓ Réduire le risque d’infections.\n'
    '✓ Sécuriser les clients, le personnel, les consommateurs et les visiteurs.\n'
    '✓ Garantir une hygiène constante dans tous les services.\n'
    '✓ Préserver durablement les locaux et les équipements.\n'
    '✓ Améliorer le confort et l’expérience clients.\n'
    '✓ Faciliter le contrôle et la traçabilité des prestations.\n'
    '✓ Renforcer l’image et la confiance envers l’établissement.\n'
    '✓ Optimiser l’organisation du personnel.'
)

about.vision_title = 'NOTRE VISION : LA SATISFACTION DES CLIENTS'
about.vision_content = (
    'Notre vision est simple mais puissante : Contribuer activement à la satisfaction des clients en créant un environnement hospitalier sain, propre et sécurisé, exempt de risques de contamination.'
)
about.vision_paradox_content = (
    'LE PARADOXE QUE NOUS COMBATTONS :\n'
    'Nous combattons l\'idée ironique et malheureusement trop réelle selon laquelle "on entre à l\'hôpital avec une maladie et on repart avec une autre ou plusieurs maladies". Cette expression, bien qu\'humoristique, reflète une réalité préoccupante : la contamination croisée et les infections liées au manque de qualité dans le bionettoyage des locaux.'
)
about.vision_execution_content = (
    'Comment nous réalisons cette vision :\n'
    '• Protocoles rigoureux : Application stricte des protocoles de bionettoyage adaptés à chaque zone, avec traçabilité complète.\n'
    '• Personnel hautement qualifié : Formation continue de nos équipes aux dernières techniques de désinfection et aux protocoles d\'hygiène hospitalière internationaux.\n'
    '• Produits et équipements de pointe : Utilisation exclusive de produits certifiés bactéricides, virucides et sporicides, ainsi que d\'équipements professionnels de fabrication allemande.\n'
    '• Approche préventive : Intervention proactive pour maintenir l\'environnement hospitalier dans un état optimal permanent.\n'
    '• Contrôle qualité constant : Audits réguliers, contrôles microbiologiques, et système de traçabilité.\n'
    '• Collaboration avec le personnel soignant.'
)
about.vision_impact_content = (
    'Impact direct sur la satisfaction des clients :\n'
    '• Réduction des risques sanitaires et de contamination.\n'
    '• Amélioration de la sécurité et du bien-être.\n'
    '• Amélioration de la qualité de l’environnement de travail.\n'
    '• Réduction du stress et amélioration du confort.\n'
    '• Préservation des équipements et des infrastructures.\n'
    '• Amélioration de l’image et de la crédibilité de l’organisation.'
)

about.international_expertise_title = 'EXPERTISE INTERNATIONALE'
about.international_expertise_content = (
    'Grâce au travail d’équipe avec nos groupes allemands PUTZI SAUBER SERVICE et SYLT PURE REINIGUNG, nous bénéficions de :\n'
    '• Plus de 20 ans d\'expérience dans le nettoyage hospitalier en Allemagne.\n'
    '• Accès aux dernières technologies et innovations en matière de bionettoyage.\n'
    '• Formation continue de nos équipes aux standards européens.\n'
    '• Équipements et produits certifiés conformes aux normes les plus strictes.\n'
    '• Méthodologie éprouvée dans des établissements de renommée internationale.\n'
    '• Transfert de savoir-faire et de bonnes pratiques.'
)

about.references_title = 'NOS RÉFÉRENCES CLIENTS'
about.references_content = (
    'J&B SANIYAPUR, à travers ses partenariats avec les entreprises allemandes PUTZI SAUBER SERVICE et SYLT PURE REINIGUNG, a développé une expertise reconnue dans le bionettoyage hospitalier et le nettoyage professionnel de haut standing :\n\n'
    '1. CENTRE HOSPITALIER UNIVERSITAIRE DE PALA (CHU)\n   Services : Nettoyage, bionettoyage des locaux, gestion des déchets, fournitures produits d\'entretien, désinfection blocs opératoires, entretiens sanitaires, désinfection des surfaces.\n   Localisation : Bobo-Dioulasso, BURKINA FASO\n\n'
    '2. HÔPITAL DOGTA-LAFIÈ / CLINIQUE LE PRINTEMPS\n   Services : Bionettoyage et désinfection, fourniture équipements, entretien général bureaux, désinfection des surfaces, formation du personnel.\n   Localisation : Lomé, TOGO (www.hopitaldogtalafie.tg)\n\n'
    '3. HOTEL BUDERSAND & HOTEL A-ROSA\n   Services : Entretien et nettoyage général, désinfection des surfaces, nettoyage chambres, standards hôtellerie de luxe, entretien résidentiel haut de gamme.\n   Localisation : Sylt, ALLEMAGNE (www.budersand.de / www.a-rosa.de)\n\n'
    '4. 411 MAISONS DE LUXE\n   Services : Nettoyage et désinfection, maintenance régulière.\n   Localisation : Sylt, ALLEMAGNE'
)

about.dg_name = 'Monsieur Jules D. TEKPO'
about.dg_role = 'Directeur Général'
about.dg_message = (
    'Après plusieurs années en tant qu\'entrepreneur en Occident, je suis de retour chez moi, en Afrique, plus précisément au Burkina Faso, dans le pays des hommes fiers et intègres, pour offrir mon soutien et partager mon expertise. Avec J&B SANIYAPUR SARL, je souhaite surpasser tout ce que j\'ai appris ailleurs. Mes 22 années d\'expérience en Afrique et en Europe m\'ont permis d\'identifier et de comprendre les besoins de nos concitoyens.\n\n'
    'Je suis ravi d\'être à votre service pour apporter confort et bien-être dans votre foyer.'
)

about.engagements_title = 'NOS ENGAGEMENTS'
about.engagements_content = (
    '1. Respect strict des protocoles de bionettoyage hospitalier.\n'
    '2. Personnel qualifié, formé et protégé socialement.\n'
    '3. Utilisation exclusive de produits et équipements certifiés.\n'
    '4. Traçabilité complète de toutes nos interventions.\n'
    '5. Contrôle qualité permanent et audits réguliers.\n'
    '6. Disponibilité et réactivité 24h/24, 7j/7.\n'
    '7. Collaboration étroite avec les équipes.\n'
    '8. Amélioration continue de nos services.'
)
about.save()
print('AboutSettings updated successfully!')

# Seed Official Team Members
official_team = [
    {
        'order': 1,
        'name': 'M. TEKPO D. Jules',
        'role': 'DIRECTEUR GÉNÉRAL',
        'phone': '+49 1727717178 / +226 06556709',
        'bio': 'Coordination générale des activités, Conseil stratégique & Développement.',
    },
    {
        'order': 2,
        'name': 'M. AMOUZOU Komlan Toussaint',
        'role': 'DIRECTEUR TECHNIQUE',
        'phone': '+228 90090598 / +228 90069030',
        'bio': 'Supervision terrain, Formation des agents, Contrôle des sites.',
    },
    {
        'order': 3,
        'name': 'Mme KABORE Kadidiatou',
        'role': 'DIRECTRICE DES RESSOURCES HUMAINES',
        'phone': '+226 06556709',
        'bio': 'Définit et met en œuvre la stratégie RH de l’entreprise, alignant la gestion du capital humain avec les objectifs stratégiques globaux, gère le recrutement, la formation, la paie, les relations sociales, le développement des compétences.',
    },
    {
        'order': 4,
        'name': 'Hamado OUEDRAOGO',
        'role': 'Chef de personnel du recrutement',
        'phone': '+226 06556709',
        'bio': 'Gérance de recrutement, la formation, la paie, les relations sociales, le développement des compétences.',
    },
    {
        'order': 5,
        'name': 'Mme KONÉ Bintou',
        'role': 'DIRECTRICE ADMINISTRATIVE ET FINANCIÈRE',
        'phone': '+226 70720201 / +226 78067664',
        'bio': 'Pilotage stratégique et opérationnel de la gestion administrative, financière et comptable.',
    },
    {
        'order': 6,
        'name': 'Mme OUOUBA Aminata',
        'role': 'Assistante du Directeur & Planificatrice',
        'phone': '+226 06556709',
        'bio': 'Gestion d\'agenda, l’organisation de déplacements/réunions, la rédaction de documents, garant de la communication et de la fluidité des opérations internes/externes, planning du personnel et gestion des produits.',
    },
    {
        'order': 7,
        'name': 'Dr DÉGLO Albertine',
        'role': 'Hygiéniste sénior',
        'phone': '+228 91666168',
        'bio': 'Planning opérationnel, Protocoles d\'hygiène, Audits qualité.',
    },
    {
        'order': 8,
        'name': 'M. SANOU Abdoulaye',
        'role': 'Technicien Hygiène',
        'phone': '+226 06556709',
        'bio': 'Protocoles d\'hygiène, Audits qualité.',
    },
    {
        'order': 9,
        'name': 'M. KPETE Promise',
        'role': 'Superviseur Général',
        'phone': '+226 06556709',
        'bio': 'Qualité et Contrôle.',
    },
    {
        'order': 10,
        'name': 'Mme SANOU Fatoumata',
        'role': 'Superviseur agréé',
        'phone': '+226 76126650',
        'bio': 'Suivi et gestion des produits d’entretien.',
    },
]

TeamMember.objects.all().delete()
for member_data in official_team:
    TeamMember.objects.create(
        name=member_data['name'],
        role=member_data['role'],
        phone=member_data['phone'],
        bio=member_data['bio'],
        order=member_data['order'],
        published=True
    )

print(f'Seeded {TeamMember.objects.count()} official team members!')
