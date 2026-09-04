import os
import shutil
import django
from PIL import Image

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product
from team.models import TeamMember

MEDIA_ROOT = os.path.join(os.path.dirname(__file__), 'media')
PRODUCTS_MEDIA = os.path.join(MEDIA_ROOT, 'products')
TEAM_MEDIA = os.path.join(MEDIA_ROOT, 'team')

os.makedirs(PRODUCTS_MEDIA, exist_ok=True)
os.makedirs(TEAM_MEDIA, exist_ok=True)

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CAT_MEDIA = os.path.join(ROOT_DIR, 'extracted_catalogue_media', 'word', 'media')
PRES_MEDIA = os.path.join(ROOT_DIR, 'extracted_media_full')

def copy_and_clean_image(src_dir, filename, dest_dir, new_name):
    src_path = os.path.join(src_dir, filename)
    if not os.path.exists(src_path):
        print(f"Warning: {src_path} not found")
        return None
    dest_path = os.path.join(dest_dir, new_name)
    try:
        shutil.copy2(src_path, dest_path)
        print(f"Copied {filename} -> {new_name}")
        return new_name
    except Exception as e:
        print(f"Error copying {filename}: {e}")
        return None

# 1. Official Catalogue Products Data
PRODUCTS_DATA = [
    # --- Section 1 : Accessoires de nettoyage ---
    {
        "name": "Tige-Support VERMOP® SPRINT PLUS 50 cm",
        "reference": "VERMOP-SP50",
        "category": "Accessoires de nettoyage",
        "short_description": "Système de serpillière professionnel avec technologie avancée et pédale brevetée.",
        "description": "Système de serpillière professionnel de marque VERMOP avec technologie de pointe. Insertion facile et rapide dans la tête de la serpillière grâce à sa forme en V symétrique. Doté d'une pédale brevetée pour une ouverture et fermeture sans effort et sans contact avec les salissures.",
        "usage": "Utilisation quotidienne pour le lavage à plat des sols en milieu hospitalier, administratif et industriel. Compatible avec les franges et housses SPRINT PLUS.",
        "characteristics": "Largeur de travail : 50 cm\nForme symétrique en V pour insertion aisée\nPédale ergonomique brevetée d'ouverture/fermeture\nClips de fixation supplémentaires inclus\nGrande surface de contact homogène\nFabrication robuste allemande haute durabilité",
        "image_source": "image7.jpg",
        "dest_image": "vermop-sprint-plus-50cm.jpg",
        "featured": True,
    },
    {
        "name": "Raclette Renforcée Fibre de Verre 60 cm",
        "reference": "RAC-FV60",
        "category": "Accessoires de nettoyage",
        "short_description": "Raclette professionnelle haute résistance certifiée HACCP pour environnements exigeants.",
        "description": "Raclette professionnelle haute résistance spécialement conçue pour les environnements exigeants nécessitant une hygiène irréprochable. Corps renforcé en fibre de verre garantissant une solidité à toute épreuve contre les chocs et agents chimiques.",
        "usage": "Raclage et évacuation rapide des liquides sur sols carrelés, résines et bétons lisses en hôpitaux, industries agroalimentaires et cuisines professionnelles.",
        "characteristics": "Largeur : 60 cm\nCorps renforcé en fibre de verre ultra-résistant\nCertifié HACCP - Résistance thermique jusqu'à 60°C\nProtection anti-éclaboussures intégrée\nFiletage allemand standard universel",
        "image_source": "image10.jpg",
        "dest_image": "raclette-fibre-verre-60cm.jpg",
        "featured": False,
    },
    {
        "name": "Kit Essuie-Vitres Professionnel 3-en-1",
        "reference": "KIT-VIT-01",
        "category": "Accessoires de nettoyage",
        "short_description": "Solution 3-en-1 pour un nettoyage sans traces des vitres et surfaces transparentes.",
        "description": "Kit complet de nettoyage vitres offrant une solution moderne 3-en-1 pour une propreté éclatante. Essuyage fluide et sans traces grâce à une lèvre en silicone de haute qualité, combinée à un réservoir transparent de collecte d'eau.",
        "usage": "Nettoyage des vitres, baies vitrées, miroirs, parois vitrées de bureaux et vitrines commerciales.",
        "characteristics": "Solution 3-en-1 complète (mouilleur + raclette + réservoir)\nLèvre en silicone haute précision anti-traces\nRéservoir transparent de récupération sous le silicone\nPré-nettoyeur en microfibre haute densité inclus",
        "image_source": "image14.jpg",
        "dest_image": "kit-essuie-vitres-3en1.jpg",
        "featured": False,
    },
    {
        "name": "Balai Électrique & Polisseuse avec Pulvérisation",
        "reference": "BAL-ELEC-PULV",
        "category": "Accessoires de nettoyage",
        "short_description": "Solution 3-en-1 moderne combinant essuie-sol automatique, polissage et pulvérisation.",
        "description": "Appareil polyvalent 3-en-1 combinant le balayage humide, le polissage électrique et la pulvérisation ciblée intégrée. Idéal pour préserver et entretenir les sols délicats avec un gain de temps considérable.",
        "usage": "Entretien des parquets vitrifiés, thermoplastiques, marbres et grès dans les bureaux de direction et espaces sensibles.",
        "characteristics": "Fonction essuie-sol automatique motorisée\nPolisseuse électrique intégrée haute vitesse\nSystème de pulvérisation incorporé avec réservoir interne\nIdéal pour les surfaces délicates et sols exigeants\nBatterie rechargeable haute autonomie",
        "image_source": "image13.png",
        "dest_image": "balai-electrique-polisseuse-pulverisation.png",
        "featured": True,
    },
    {
        "name": "Chariot de Nettoyage FASO Polyvalent 5 Fonctions",
        "reference": "CH-FASO-05",
        "category": "Accessoires de nettoyage",
        "short_description": "Chariot polyvalent haut de gamme avec 5 fonctions intégrées pour sites professionnels.",
        "description": "Chariot de ménage professionnel multifonction conçu pour une efficacité opérationnelle maximale. Il réunit sur un seul châssis le lavage des sols, le dépoussiérage des surfaces et la collecte organisée des déchets.",
        "usage": "Maintenance quotidienne des immeubles d'entreprises, centres hospitaliers, hôtels et galeries commerciales.",
        "characteristics": "5 fonctions intégrées sur un châssis compact\nNettoyage simultané surfaces et sols\nSystème d'élimination des déchets avec porte-sac étanche\nMobilité et maniabilité optimisées (roues multidirectionnelles 360°)\nMatériaux polypropylène haute résistance et antichoc",
        "image_source": "image20.png",
        "dest_image": "chariot-nettoyage-faso.png",
        "featured": True,
    },
    {
        "name": "Chariot de Nettoyage Double Bac OUAGA",
        "reference": "CH-OUAGA-02",
        "category": "Accessoires de nettoyage",
        "short_description": "Chariot de lavage ergonomique avec séparation stricte de l'eau propre et de l'eau sale.",
        "description": "Chariot de lavage professionnel à double seau garantissant une séparation hygiénique stricte entre la solution de détergent propre et l'eau de rinçage usée. Équipé d'une presse à mâchoires performante.",
        "usage": "Lavage et désinfection des sols dans les couloirs, salles de consultation, bureaux et commerces.",
        "characteristics": "Seau dédié pour eau propre + Seau dédié pour eau sale\nPresse d'essorage ergonomique à levier renforcé\nChâssis robuste avec timon de guidage réversible\nRoues silencieuses anti-traces\nQualité professionnelle certifiée",
        "image_source": "image24.jpg",
        "dest_image": "chariot-nettoyage-ouaga.jpg",
        "featured": False,
    },
    {
        "name": "Chariot Hospitalier BOBO-DIOULASSO 3 Niveaux",
        "reference": "CH-BOBO-03",
        "category": "Accessoires de nettoyage",
        "short_description": "Chariot d'hygiène spécialement conçu pour les protocoles hospitaliers et cliniques.",
        "description": "Chariot technique spécialement développé pour répondre aux exigences strictes du bionettoyage en milieu hospitalier. Conception à 3 niveaux pour transporter bacs de pré-imprégnation, produits désinfectants et linge propre.",
        "usage": "Services de soins, blocs opératoires, laboratoires et cliniques privées.",
        "characteristics": "Design polyvalent à 3 niveaux de rangement modulables\nConception ergonomique et peu encombrante\nSurfaces lisses sans recoins, faciles à décontaminer et désinfecter\nSupport de sac à déchets DASRI avec couvercle hermétique\nMatériaux résistants aux désinfectants chimiques chlorés et alcoolisés",
        "image_source": "image28.png",
        "dest_image": "chariot-hospitalier-bobo-dioulasso.png",
        "featured": True,
    },
    {
        "name": "Éponges Professionnelles Codage Couleur 4 Zones",
        "reference": "EPN-COLOR-04",
        "category": "Accessoires de nettoyage",
        "short_description": "Éponges hygiéniques spécialisées avec système de 4 couleurs pour zonage sanitaire.",
        "description": "Éponges de nettoyage professionnelles dotées d'une face mousse absorbante et d'un non-tissé doux non rayant. Le système de 4 couleurs (Rouge, Jaune, Bleu, Vert) permet d'éliminer les risques de contaminations croisées entre sanitaires, cuisines et bureaux.",
        "usage": "Dépoussiérage et dégraissage des sanitaires (rouge), lavabos (jaune), mobilier de bureau (bleu) et cuisines (vert).",
        "characteristics": "Système 4 couleurs normalisé pour zonage d'hygiène\nMousse haute densité avec non-tissé abrasif doux\nConvient parfaitement aux surfaces sensibles sans risque de rayure\nNettoyage rapide et décontamination en profondeur",
        "image_source": "image31.png",
        "dest_image": "eponges-professionnelles-4couleurs.png",
        "featured": False,
    },
    {
        "name": "Housse de Balai VERMOP® SPRINT Basic 50 cm",
        "reference": "HOU-VERM-50",
        "category": "Accessoires de nettoyage",
        "short_description": "Housse ultra-absorbante pour nettoyage de routine et d'entretien quotidien.",
        "description": "Frange de lavage haut de gamme de fabrication allemande pour système SPRINT. Conçue avec un mélange de fibres optimisé pour capter la saleté et restituer uniformément la solution nettoyante sur les sols.",
        "usage": "Lavage quotidien des sols durs, carrelages, grès et thermoplastiques.",
        "characteristics": "Très haute capacité d'absorption d'eau et de détergent\nLargeur de travail 50 cm\nSpécialement conçue pour un usage intensif quotidien\nRésiste aux lavages répétés en machine jusqu'à 60°C\nCompatible support VERMOP SPRINT PLUS",
        "image_source": "image34.jpg",
        "dest_image": "housse-balai-vermop-sprint-basic.jpg",
        "featured": False,
    },
    {
        "name": "Ensemble de Balais Industriels & Balai de Rue 60 cm",
        "reference": "BAL-IND-SET",
        "category": "Accessoires de nettoyage",
        "short_description": "Kit de balais industriels renforcés pour voirie, ateliers et grandes surfaces extérieures.",
        "description": "Ensemble complet de balais à fibres rigides renforcées, adapté aux conditions extrêmes et aux gros débris. Comprend un balai de rue large de 60 cm et des brosses industrielles interchangeables.",
        "usage": "Balayage extérieur, parkings, cours d'usines, entrepôts logistiques et chantiers.",
        "characteristics": "Tête large de balai de rue de 60 cm\nBalai industriel à monture amovible renforcée\nGrandes brosses de sol à fibres semi-rigides haute résistance\nManche ergonomique en bois dur ou fibre de verre",
        "image_source": "image35.jpg",
        "dest_image": "ensemble-balais-industriels.jpg",
        "featured": False,
    },
    {
        "name": "Chiffons Microfibre MicroClean Plus Haute Performance",
        "reference": "CHIF-MC-PLUS",
        "category": "Accessoires de nettoyage",
        "short_description": "Chiffons microfibres professionnels pour élimination des graisses et désinfection sans traces.",
        "description": "Chiffons en microfibres tricotées haute densité. Ils capturent poussières et particules microscopiques par capillarité et éliminent les traces grasses les plus tenaces sans laisser de peluches ni de traces.",
        "usage": "Essuyage des bureaux, postes de travail, écrans, poignées de portes et surfaces métalliques.",
        "characteristics": "Élimine efficacement les résidus gras et charges bactériennes\nExcellente résistance aux produits chimiques désinfectants\nCompatible méthode par pulvérisation et méthode au seau\nSéchage sans traces immédiat",
        "image_source": "image38.png",
        "dest_image": "chiffons-microfibre-microclean-plus.png",
        "featured": False,
    },
    {
        "name": "Poubelle 3 Compartiments Tri Sélectif Mobile",
        "reference": "POUB-TRI-03",
        "category": "Accessoires de nettoyage",
        "short_description": "Station de tri sélectif mobile avec couvercle à pression et contrôle des odeurs.",
        "description": "Station de tri sélectif 3 flux sur roulettes, idéale pour accompagner les politiques environnementales et RSE des entreprises et établissements médicaux.",
        "usage": "Bureaux, cafétérias, salles de pause, réceptions et établissements scolaires.",
        "characteristics": "3 compartiments distincts pour tri sélectif facilité\nBase roulante fluide avec freins\nSystème hermétique de contrôle des odeurs\nSéparation déchets secs / humides / recyclables\nCouvercle à ouverture pression hygiénique",
        "image_source": "image44.png",
        "dest_image": "poubelle-tri-selectif-3-compartiments.png",
        "featured": False,
    },

    # --- Section 2 : Produits d’entretien professionnels & Bionettoyage ---
    {
        "name": "Crème à Récurer SANIYAPUR Professionnelle",
        "reference": "CHIM-CREM-01",
        "category": "Produits chimiques & Bionettoyage",
        "short_description": "Nettoyant à récurer puissant aux agents de polissage naturels pour inox et sanitaires.",
        "description": "Formule professionnelle de crème à récurer enrichie d'agents de polissage minéraux naturels. Elle élimine instantanément les dépôts calcaires incrustés, les salissures grasses brûlées et redonne un éclat miroir à vos équipements.",
        "usage": "Cuisines professionnelles, inox, émail, céramique, éviers, bacs de plonge et sanitaires.",
        "characteristics": "Puissance des agents de polissage naturels micro-fins\nBrillance éclatante sans aucune micro-rayure\nÉlimine les saletés tenaces et films gras\nIdéal pour acier inoxydable, émail, faïence et sanitaires\nSe rince facilement à l'eau claire sans laisser de voile blanc",
        "image_source": "image49.png",
        "dest_image": "creme-a-recurer-saniyapur.png",
        "featured": True,
    },
    {
        "name": "Dr. Schnell SCHIROCCO CLEAN - Nettoyant Intensif Sols",
        "reference": "DRS-SCHIR-01",
        "category": "Produits chimiques & Bionettoyage",
        "short_description": "Nettoyant intensif puissant pour décapage et remise en état des sols durs.",
        "description": "Produit professionnel allemand de décapage et nettoyage intensif. Il élimine radicalement les anciennes couches de cires, les films de nettoyage accumulés et les graisses industrielles sur tous sols imperméables.",
        "usage": "Décapage avant protection de sol en marbre, carrelage, linoléum, caoutchouc et résine.",
        "characteristics": "Compatible caoutchouc, linoléum, marbre, pierres naturelles et artificielles\nSèche rapidement sans laisser de résidus\nAucun rinçage fastidieux requis selon le dosage\nUtilisation manuelle au balai rasant ou mécanique en monobrosse / autolaveuse\nPréparation optimale des sols avant pose d'émulsion de protection",
        "image_source": "image55.png",
        "dest_image": "dr-schnell-schirocco-clean.png",
        "featured": False,
    },
    {
        "name": "Dr. Schnell NOVO PEN-OFF - Détachant Spécial Encres & Traces",
        "reference": "DRS-NOV-01",
        "category": "Produits chimiques & Bionettoyage",
        "short_description": "Solution surpuissante contre les encres, marqueurs permanents et résidus d'adhésifs.",
        "description": "Nettoyant solvanté de précision spécialement formulé pour dissoudre instantanément les traces d'encre, stylos à bille, feutres indélébiles, résidus de rubans adhésifs et traces de semelles sur mobilier et sols.",
        "usage": "Mobilier de bureau, tableaux blancs, cloisons, portes, plastiques et métaux peints.",
        "characteristics": "Élimine encres de stylos, tampons, feutres et marqueurs permanents\nSupprime efficacement les résidus de colle et étiquettes tenaces\nEfface les traces noires de talons de chaussures sur les sols\nApplication par pulvérisation ciblée prête à l'emploi\nNe nécessite pas de retouche",
        "image_source": "image61.jpg",
        "dest_image": "dr-schnell-novo-pen-off.jpg",
        "featured": False,
    },
    {
        "name": "Dr. Schnell DESIFOR ONE V - Désinfectant Médical Haute Efficacité",
        "reference": "DRS-DESIF-01",
        "category": "Produits chimiques & Bionettoyage",
        "short_description": "Désinfectant de surfaces hautement certifié (normes IHO / HACCP) pour hôpitaux.",
        "description": "Désinfectant liquide concentré haut de gamme pour la désinfection de toutes surfaces en milieu médical et médico-social. Sans aldéhyde ni parfum, il offre une tolérance maximale pour le personnel et les patients.",
        "usage": "Bionettoyage des chambres de patients, blocs opératoires, cabinets médicaux et laboratoires d'analyse.",
        "characteristics": "Élimine bactéries, virus et champignons (spectre complet)\nBactéricide incluant SARM et levuricide\nVirucide contre HIV, Virus Hépatite B/C, Coronavirus\nFormule sans aldéhyde, sans parfum ni colorant allergisant\nClassé IHO et conforme aux normes HACCP\nConcentré économique ne laissant aucun résidu collant",
        "image_source": "image68.png",
        "dest_image": "dr-schnell-desifor-one-v.png",
        "featured": True,
    },
    {
        "name": "SURFANIOS PREMIUM - Détergent Désinfectant Hospitalier",
        "reference": "ANIOS-SURF-01",
        "category": "Produits chimiques & Bionettoyage",
        "short_description": "Référence internationale du bionettoyage et de la désinfection des sols et dispositifs médicaux.",
        "description": "Détergent désinfectant de référence pour le traitement des sols, des surfaces et des dispositifs médicaux non invasifs. Il assure une double action simultanée de nettoyage en profondeur et de désinfection antimicrobienne à large spectre en une seule opération.",
        "usage": "Bionettoyage hospitalier, services de soins intensifs, maternités, blocs opératoires et cliniques.",
        "characteristics": "Double action : détergence puissante + désinfection complète\nTemps de contact court et haute rémanence antimicrobienne\nFormulé sans aldéhyde, sans chlore agressif\nIdéal pour sols, plans de travail et dispositifs médicaux non invasifs\nHomologué selon les normes européennes d'hygiène hospitalière",
        "image_source": "image76.png",
        "dest_image": "surfanios-premium.png",
        "featured": True,
    },
    {
        "name": "EAU DE JAVEL PROFESSIONNELLE Concentrée 12%",
        "reference": "CHIM-JAV-12",
        "category": "Produits chimiques & Bionettoyage",
        "short_description": "Solution d'hypochlorite alcaline concentrée pour désinfection et assainissement intensifs.",
        "description": "Solution d'hypochlorite de sodium alcaline titrée à 12% de chlore actif. Produit économique et redoutablement efficace pour toutes les opérations d'assainissement, de désinfection collective et de blanchiment des textiles professionnels.",
        "usage": "Désinfection des sanitaires, poubelles collectives, sols extérieurs, caniveaux et blanchiment du linge.",
        "characteristics": "Concentration active à 12%\nForte action désinfectante bactéricide, virucide et sporicide\nAction blanchissante et désodorisante instantanée\nIndispensable dans les protocoles sanitaires institutionnels",
        "image_source": "image81.png",
        "dest_image": "eau-de-javel-12-pourcent.png",
        "featured": False,
    },
    {
        "name": "Dr. Schnell GLASFEE - Nettoyant Vitres & Miroirs Haute Performance",
        "reference": "DRS-GLAS-01",
        "category": "Produits chimiques & Bionettoyage",
        "short_description": "Concentré nettoyant rapide pour vitres, miroirs et surfaces brillantes sans traces.",
        "description": "Nettoyant professionnel rapide pour surfaces vitrées et brillantes. Sa formulation exclusive dissout instantanément le film gras, les traces de doigts et la poussière sans laisser de reflets ni de traînées.",
        "usage": "Vitres, baies vitrées, miroirs d'hôtels, écrans, meubles laqués et inox poli.",
        "characteristics": "Éprouvé pour le nettoyage hôtelier et tertiaire exigeant\nÉlimine huiles, graisses et traces grasses immédiatement\nSéchage ultra-rapide sans besoin d'essuyage répété\nCrée un effet antistatique retardant le réencrassement\nTête de pulvérisation professionnelle à micro-diffusion",
        "image_source": "image85.png",
        "dest_image": "dr-schnell-glasfee.png",
        "featured": False,
    },
    {
        "name": "Dr. Schnell MILIZID - Détartrant & Nettoyant Sanitaire",
        "reference": "DRS-MILIZ-01",
        "category": "Produits chimiques & Bionettoyage",
        "short_description": "Nettoyant sanitaire et détartrant puissant éliminant calcaire, tartre et rouille.",
        "description": "Produit détartrant acide hautement concentré pour l'entretien complet et la rénovation des installations sanitaires. Il élimine sans frottement les dépôts tenaces de calcaire, savon, tartre urique et rouille tout en laissant un parfum frais durable.",
        "usage": "Toilettes, douches, robinetterie, carrelages et parois de sanitaires collectifs.",
        "characteristics": "Élimine calcaire, tartre urique, résidus de ciment et rouille\nTesté sans danger pour les joints époxy et carrelages céramiques\nEffet détartrant instantané sans action mécanique abrasive\nProtège la robinetterie chromée, le plastique et l'émail (DIN ISO 2722)\nFormule concentrée éco-responsable",
        "image_source": "image93.png",
        "dest_image": "dr-schnell-milizid.png",
        "featured": True,
    },

    # --- Section 3 : Machines professionnelles ---
    {
        "name": "Machine de Nettoyage Pro Sprinter",
        "reference": "MACH-SPRINT-01",
        "category": "Machines professionnelles",
        "short_description": "Balai laveur électrique professionnel compact pour petits espaces et locaux encombrés.",
        "description": "Machine de lavage compacte autotractée spécialement conçue pour les espaces restreints où les grandes autolaveuses ne peuvent accéder. Elle lave et sèche les sols en un seul passage avec une maniabilité exceptionnelle.",
        "usage": "Cliniques, cabinets médicaux, restaurants, bureaux, salles de classe et boutiques.",
        "characteristics": "Conception compacte maniable à 360° pour espaces restreints\nPerformance de lavage électrique optimisée\nLavage et aspiration séchante immédiate\nTrès faible niveau sonore pour interventions en milieu occupé",
        "image_source": "image100.png",
        "dest_image": "machine-nettoyage-pro-sprinter.png",
        "featured": True,
    },
    {
        "name": "Monobrosse Professionnelle O 143 S 10",
        "reference": "MONO-O143-S10",
        "category": "Machines professionnelles",
        "short_description": "Monobrosse industrielle polyvalente pour décapage, récurage, lustrage et moquettes.",
        "description": "Monobrosse professionnelle de haute performance réputée pour sa robustesse et sa grande maniabilité. Équipée d'un moteur puissant à entraînement par engrenages hélicoïdaux pour un travail sans vibrations.",
        "usage": "Décapage des sols durs, lustrage haute brillance, cristallisation du marbre et shampoing des moquettes.",
        "characteristics": "Modèle O 143 S 10 haute performance industrielle\nPolyvalence totale : récurage, décapage de cires, lustrage, spray méthode\nIdéale pour sols thermoplastiques, pierres naturelles et moquettes\nMoteur robuste silencieux avec équilibrage parfait",
        "image_source": "image107.png",
        "dest_image": "monobrosse-professionnelle-o143-s10.png",
        "featured": True,
    },
    {
        "name": "Nettoyeur Haute Pression Kärcher K 7 Power Flex",
        "reference": "KARCH-K7-PF",
        "category": "Machines professionnelles",
        "short_description": "Nettoyeur haute pression à moteur refroidi par eau pour nettoyages intensifs extérieurs.",
        "description": "Nettoyeur haute pression d'élite Kärcher conçu pour des nettoyages fréquents et l'élimination des salissures les plus incrustées. Doté d'un moteur haute longévité refroidi par eau et d'un flexible flexible PremiumFlex.",
        "usage": "Façades d'immeubles, allées pavées, parkings, flottes de véhicules et abords de piscines.",
        "characteristics": "Moteur refroidi par eau pour une durée de vie prolongée\nPistolet Quick Connect ergonomique avec flexible PremiumFlex anti-vrille\nLance Vario Power (VPS) à pression réglable et rotabuse à jet crayon rotatif incluses\nAssistant d'application interactif via l'application smartphone Kärcher\nRendement surfacique élevé : 60 m²/h",
        "image_source": "image113.png",
        "dest_image": "nettoyeur-haute-pression-karcher-k7.png",
        "featured": True,
    },
    {
        "name": "Souffleur d'Air Sans Fil Lithium",
        "reference": "SOUF-SANSFIL-01",
        "category": "Machines professionnelles",
        "short_description": "Souffleur portatif à batterie lithium pour dépoussiérage des recoins et espaces complexes.",
        "description": "Souffleur portatif ultra-léger alimenté par batterie lithium-ion. Il permet un soufflage précis et puissant pour évacuer feuilles, sciures et poussières dans les zones inaccessibles.",
        "usage": "Ateliers techniques, halls d'entrée, terrasses, rails de portes et recoins encombrés.",
        "characteristics": "Alimentation sur batterie lithium haute autonomie sans câble encombrant\nLiberté de mouvement totale\nDébit d'air puissant et concentré\nPrise en main ergonomique et poids plume",
        "image_source": "image117.png",
        "dest_image": "souffleur-air-sans-fil.png",
        "featured": False,
    },
    {
        "name": "Aspirateur Dorsal Ultra-Léger Ergonomique",
        "reference": "ASP-DORS-01",
        "category": "Machines professionnelles",
        "short_description": "Aspirateur dorsal à batterie conçu pour escaliers, salles de spectacle et bureaux.",
        "description": "Aspirateur dorsal professionnel porté sur harnais capitonné anatomique. Idéal pour aspirer sans effort dans les espaces étroits et escaliers où un aspirateur traîneau ne peut rouler.",
        "usage": "Escaliers de secours, amphithéâtres, cinémas, rames de transport et bureaux encombrés.",
        "characteristics": "Structure ultra-légère et harnais ventilé pour un confort maximal de l'opérateur\nPuissance d'aspiration constante avec batterie lithium autonome\nMobilité et rapidité d'exécution décuplées\nFiltration haute efficacité HEPA",
        "image_source": "image120.png",
        "dest_image": "aspirateur-dorsal-ultra-leger.png",
        "featured": True,
    },
    {
        "name": "Autolaveuse Professionnelle TOPCLEAN 1600",
        "reference": "AUTO-TOP-1600",
        "category": "Machines professionnelles",
        "short_description": "Autolaveuse industrielle pour nettoyage et séchage instantané des grandes surfaces.",
        "description": "Autolaveuse industrielle alliant puissance de brossage et aspiration immédiate des eaux usées. Elle redonne une brillance éclatante aux sols très sollicités et permet une réouverture immédiate au public.",
        "usage": "Halls d'hôpitaux, supermarchés, entrepôts logistiques, aéroports et usines.",
        "characteristics": "Lavage intensif et aspiration séchante en un seul passage\nPerformance surfacique supérieure jusqu'à 1 600 m²/h\nBrosses à pression constante pour éliminer les traces tenaces\nGrand réservoir d'eau propre et de récupération séparé\nCommandes intuitives faciles à prendre en main",
        "image_source": "image126.jpg",
        "dest_image": "autolaveuse-topclean-1600.jpg",
        "featured": True,
    },
    {
        "name": "Aspirateur Eau et Poussière Kärcher WD 6 P Inox 30L",
        "reference": "KARCH-WD6P-30L",
        "category": "Machines professionnelles",
        "short_description": "Aspirateur industriel multifonction cuve inox 30L avec prise pour outils électroportatifs.",
        "description": "Aspirateur eau et poussière surpuissant et économe en énergie. Doté d'une cuve robuste en acier inoxydable de 30 litres, d'une prise d'asservissement d'outils et d'un décolmatage automatique du filtre.",
        "usage": "Aspiration des liquides, poussières fines de décapage, ateliers et nettoyage après chantiers.",
        "characteristics": "Cuve en acier inoxydable de 30 litres résistante aux chocs et liquides corrosifs\nConsommation nominale de 1 300 W pour une force d'aspiration extrême\nPrise intégrée pour raccordement d'appareils avec marche/arrêt automatique\nFiltre plissé plat sans contact avec la saleté avec bouton de décolmatage mécanique\nPoignée amovible antistatique",
        "image_source": "image129.jpg",
        "dest_image": "aspirateur-karcher-wd6p-inox.jpg",
        "featured": True,
    },
    {
        "name": "Nettoyeur à Vapeur Stérilisateur & Désinfecteur Pro",
        "reference": "VAP-STER-01",
        "category": "Machines professionnelles",
        "short_description": "Nettoyeur vapeur multifonction éliminant 99,9% des bactéries sans aucun produit chimique.",
        "description": "Générateur de vapeur sèche haute température pour la décontamination thermique et le dégraissage sans agents chimiques. Il détruit les germes, bactéries et allergènes même dans les micro-fissures inaccessibles.",
        "usage": "Stérilisation des blocs opératoires, cuisines de collectivités, sanitaires et literies hospitalières.",
        "characteristics": "Élimine 99,9% des bactéries et micro-organismes par choc thermique\nPression vapeur haute intensité adaptée à toutes surfaces (carrelage, vitres, inox, tissus)\nNettoyage 100% écologique sans aucun résidu chimique\nKit d'accessoires complet (buses de précision, brosses, raclettes)",
        "image_source": "image132.png",
        "dest_image": "nettoyeur-vapeur-sterilisateur-desinfecteur.png",
        "featured": True,
    },
]

print("=== SEEDING PRODUCTS ===")
# Clear existing or update
for item in PRODUCTS_DATA:
    # Copy image
    img_name = item.pop("image_source")
    dest_name = item.pop("dest_image")
    copied = copy_and_clean_image(CAT_MEDIA, img_name, PRODUCTS_MEDIA, dest_name)
    image_rel = f"products/{copied}" if copied else None
    
    prod, created = Product.objects.update_or_create(
        name=item["name"],
        defaults={
            "reference": item["reference"],
            "category": item["category"],
            "short_description": item["short_description"],
            "description": item["description"],
            "usage": item["usage"],
            "characteristics": item["characteristics"],
            "image": image_rel,
            "featured": item["featured"],
            "published": True,
        }
    )
    print(f"Product {'CREATED' if created else 'UPDATED'}: {prod.name} (img: {prod.image})")

print(f"Total products in DB: {Product.objects.count()}")

print("\n=== SEEDING TEAM PHOTOS & DETAILS ===")
# Copy director portrait
director_photo = copy_and_clean_image(PRES_MEDIA, "image5.jpeg", TEAM_MEDIA, "jules-tekpo-directeur-general.jpg")
director_photo_rel = f"team/{director_photo}" if director_photo else ""

TEAM_DATA = [
    {
        "name": "M. TEKPO D. Jules",
        "role": "DIRECTEUR GÉNÉRAL",
        "phone": "+226 06 55 67 09 / +49 172 771 7178",
        "photo": director_photo_rel,
        "bio": "Fondateur et Directeur Général de J&B SANIYAPUR SARL. Fort de plus de 20 ans d'expérience internationale acquise en Allemagne et en Afrique de l'Ouest, il impulse la vision « Propreté sur ordonnance » et veille à l'application rigoureuse des standards européens au Burkina Faso.",
        "order": 1,
        "published": True
    },
    {
        "name": "M. AMOUZOU Komlan Toussaint",
        "role": "DIRECTEUR TECHNIQUE",
        "phone": "+226 45 33 18 67",
        "photo": "",
        "bio": "Supervise l'ensemble des opérations techniques, la maintenance du parc de machines industrielles (autolaveuses, monobrosses, haute pression) et le respect des protocoles de décontamination sur les sites clients.",
        "order": 2,
        "published": True
    },
    {
        "name": "Mme KABORÉ Kadidiatou",
        "role": "DIRECTRICE DES RESSOURCES HUMAINES",
        "phone": "",
        "photo": "",
        "bio": "Pilote la politique sociale de l'entreprise, le bien-être au travail, la protection sociale du personnel et le suivi des programmes de formation continue aux standards hospitaliers internationaux.",
        "order": 3,
        "published": True
    },
    {
        "name": "M. Hamado OUÉDRAOGO",
        "role": "Chef de personnel et du recrutement",
        "phone": "",
        "photo": "",
        "bio": "En charge de la sélection rigoureuse, de l'encadrement sur le terrain et du déploiement opérationnel des près de 100 techniciens de surface qualifiés.",
        "order": 4,
        "published": True
    },
    {
        "name": "Mme KONÉ Bintou",
        "role": "DIRECTRICE ADMINISTRATIVE ET FINANCIÈRE",
        "phone": "",
        "photo": "",
        "bio": "Assure la gestion rigoureuse des finances, des relations institutionnelles et du suivi administratif des contrats de maintenance et bionettoyage.",
        "order": 5,
        "published": True
    },
    {
        "name": "Mme OUOUBA Aminata",
        "role": "Assistante de Direction & Planificatrice",
        "phone": "",
        "photo": "",
        "bio": "Coordonne les plannings d'intervention, la gestion des stocks de produits chimiques certifiés et le lien direct avec les responsables d'établissements de santé.",
        "order": 6,
        "published": True
    },
    {
        "name": "Dr DÉGLO Albertine",
        "role": "Hygiéniste Senior & Formatrice",
        "phone": "",
        "photo": "",
        "bio": "Experte en santé publique et hygiène hospitalière. Élabore les fiches techniques de bionettoyage, anime les sessions de formation continue et audite les procédures de prévention des infections nosocomiales.",
        "order": 7,
        "published": True
    },
    {
        "name": "M. SANOU Abdoulaye",
        "role": "Technicien Spécialiste Hygiène",
        "phone": "",
        "photo": "",
        "bio": "Expert dans le traitement des zones à haut risque (blocs opératoires, laboratoires, salles d'isolement) et l'application des protocoles stricts de désinfection chimique et thermique.",
        "order": 8,
        "published": True
    },
    {
        "name": "M. KPETE Promise",
        "role": "Superviseur Général des Chantiers",
        "phone": "",
        "photo": "",
        "bio": "Veille à la conformité de chaque intervention sur site, au port systématique des EPI et à la qualité du service rendu à Ouagadougou et Bobo-Dioulasso.",
        "order": 9,
        "published": True
    },
    {
        "name": "Mme SANOU Fatoumata",
        "role": "Superviseur Agréé Hygiène Hospitalière",
        "phone": "",
        "photo": "",
        "bio": "Contrôle les opérations quotidiennes de bionettoyage, la traçabilité des interventions et la satisfaction continue des équipes soignantes et des directions d'usines.",
        "order": 10,
        "published": True
    }
]

for t_info in TEAM_DATA:
    defaults_dict = {
        "role": t_info["role"],
        "phone": t_info["phone"],
        "bio": t_info["bio"],
        "order": t_info["order"],
        "published": t_info["published"]
    }
    if t_info["photo"]:
        defaults_dict["photo"] = t_info["photo"]
        
    member, created = TeamMember.objects.update_or_create(
        name=t_info["name"],
        defaults=defaults_dict
    )
    print(f"Team member {'CREATED' if created else 'UPDATED'}: {member.name} (photo: {member.photo})")

print("Seeding completed successfully!")
