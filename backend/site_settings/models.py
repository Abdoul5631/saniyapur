from django.db import models


class SiteSettings(models.Model):
    """Ligne unique (singleton) — paramètres globaux du site public."""

    # Informations entreprise
    company_name = models.CharField(max_length=200, default="J&B SANIYAPUR SARL")
    logo = models.ImageField(upload_to="settings/", blank=True, null=True)
    tagline = models.CharField(
        max_length=200,
        default="PROPRETÉ SUR ORDONNANCE",
        help_text="Devise officielle — ne pas modifier sans demande explicite.",
    )
    slogan = models.CharField(
        max_length=300,
        default="La propreté et l’hygiène qui protègent, la qualité qui rassure : Un bon équilibre entre santé, industrie et services.",
    )
    description = models.TextField(blank=True)
    address = models.CharField(max_length=300, default="Ouagadougou, Bobo-Dioulasso (BURKINA FASO)")

    # Contact
    phone = models.CharField(max_length=40, default="+226 45 33 18 67")
    whatsapp = models.CharField(max_length=40, default="+226 06556709")
    email = models.EmailField(default="info@jb-saniyapur.com")
    opening_hours = models.CharField(max_length=200, default="Lun - Sam : 07h30 - 18h00 / Urgences 24h/24")

    # Réseaux sociaux
    facebook_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    whatsapp_url = models.URLField(blank=True)

    # Accueil — section Hero
    hero_image = models.ImageField(upload_to="settings/", blank=True, null=True)
    hero_title = models.CharField(max_length=300, blank=True)
    hero_text = models.TextField(blank=True)
    hero_primary_button_label = models.CharField(max_length=80, blank=True)
    hero_primary_button_url = models.CharField(max_length=200, blank=True)
    hero_secondary_button_label = models.CharField(max_length=80, blank=True)
    hero_secondary_button_url = models.CharField(max_length=200, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        instance, _ = cls.objects.get_or_create(pk=1)
        return instance


class AboutSettings(models.Model):
    """Ligne unique (singleton) — contenu administrable complet de la page À propos (issu du document officiel)."""

    # 1. Présentation de la société
    presentation_title = models.CharField(max_length=200, default="PRÉSENTATION DE LA SOCIÉTÉ")
    presentation_devise = models.TextField(
        default='Notre Devise : "PROPRETÉ SUR ORDONNANCE"\nJ&B SANIYAPUR s’engage à créer et maintenir des environnements propres, sains et maîtrisés, en contribuant à la protection des personnes, à la préservation des espaces et des équipements, ainsi qu’à la qualité des activités, dans les établissements de santé comme dans les environnements professionnels et industriels.'
    )
    presentation_content = models.TextField(
        default="J&B SANIYAPUR SARL est une société spécialisée dans la maintenance immobilière, le nettoyage industriel et le bionettoyage des établissements de santé. Elle met son expertise au service des structures médicales et industries agro-alimentaires afin de garantir un environnement propre, sain et conforme aux normes d'hygiène les plus exigeantes. Grâce à une expérience internationale depuis 2003 et un partenariat avec des entreprises allemandes réputées, nous offrons au Burkina Faso et en Afrique une expertise de classe mondiale en matière d'hygiène hospitalière.\n\nEn effet, J&B SANIYAPUR SARL, dédiée au nettoyage industriel et aux centres médicaux, est une filiale de la société allemande « PUTZI SAUBER SERVICE et SYLT PURE REINIGUNG & PERSONALBEREITSTELLUNG GMBH & Co.KG », résultat de la fusion de deux entreprises allemandes d'entretien, PUTZI SYLT et SYLT PURE (www.putzi-sylt.de et www.sylt-pure.com). Il y a quelques années, le groupe a également créé des sociétés immobilières de maintenance et d'entretien (SIME) au Togo et la société de Maintenance immobilière et conciergerie Hospitalière (SMICH) au Senegal.\n\nFondée en 2025, J&B SANIYAPUR SARL est dirigée par Monsieur Jules TEKPO. Son siège est situé à Bobo-Dioulasso et à Ouagadougou."
    )
    presentation_legal_info = models.TextField(
        default="Raison sociale : J&B SANIYAPUR SARL\nSecteur d’activité : Nettoyage industriel et bionettoyage de centres médicaux\nSiège social : Bobo-Dioulasso, Ouagadougou (BURKINA FASO)\nDirecteur Général : Monsieur Jules TEKPO\nContact principal : Tel : +226 06556709 / WhatsApp : +49 1727717178\nEmail : info@jb-saniyapur.com\nSite web : www.jb-saniyapur.com\nPartenaires Groupes : PUTZI SAUBER SERVICE & SYLT PURE REINIGUNG (Entreprises allemandes - www.putzi-sylt.de / www.sylt-pure.com)\nNuméro IFU : 00 288 071 F\nRCCM : BF-OUA-01-2025-B13-16674\nRIB : BF 0022022440514000160166"
    )
    presentation_image = models.ImageField(upload_to="about/", blank=True, null=True)

    # 2. Présentation de l'équipe & Personnel opérationnel
    team_presentation_title = models.CharField(max_length=200, default="PRÉSENTATION DE L'ÉQUIPE DE DIRECTION ET DU PERSONNEL")
    team_presentation_content = models.TextField(
        default="J&B SANIYAPUR dispose d'une équipe expérimentée et qualifiée, formée aux standards internationaux. Notre personnel est notre premier atout pour garantir un service de qualité irréprochable."
    )
    operational_team_title = models.CharField(max_length=200, default="LE PERSONNEL OPÉRATIONNEL")
    operational_team_content = models.TextField(
        default="Notre équipe opérationnelle est composée de près de 100 techniciens de surface qualifiés, formés spécifiquement au bionettoyage hospitalier. Chaque membre du personnel :\n- Est déclaré à la Caisse de Sécurité Sociale.\n- Bénéficie d'une assurance maladie et de protections sociales.\n- Reçoit une formation continuous aux protocoles d'hygiène.\n- Est équipé d'EPI (Équipements de Protection Individuelle) conformes.\n- Suit des contrôles médicaux réguliers.\n- Est évalué périodiquement sur ses performances."
    )

    # 3. Notre engagement social
    social_commitment_title = models.CharField(max_length=200, default="NOTRE ENGAGEMENT SOCIAL")
    social_commitment_content = models.TextField(
        default="Nous nous engageons à offrir les meilleures conditions de travail à nos employés, qui sont avant tout nos concitoyens. À ce titre, nous prévoyons :\n- La mise en place d'une garderie pour les enfants de nos employés.\n- Un environnement de travail sain, sûr et respectueux.\n- Des opportunités de formation et d'évolution professionnelle.\n- Une rémunération équitable et des avantages sociaux.\n- Un soutien psychologique si nécessaire (travail en milieu hospitalier)."
    )

    # 4. Importance et enjeux du bionettoyage
    bionettoyage_title = models.CharField(max_length=200, default="L'IMPORTANCE ET LES ENJEUX DU BIONETTOYAGE")
    bionettoyage_content = models.TextField(
        default="Le bionettoyage en milieu hospitalier est un processus essentiel de nettoyage et de désinfection rigoureux des surfaces et équipements pour éliminer les micro-organismes pathogènes, prévenir les infections nosocomiales et assurer un environnement sûr pour patients et personnel.\n\nPrincipes clés :\n- Définition : Combinaison de nettoyage (élimination des saletés visibles) et de désinfection (élimination des micro-organismes invisibles).\n- Objectif : Maîtriser les infections nosocomiales, crucial dans les blocs opératoires et chambres.\n- Protocole : Suivi strict par des professionnels formés.\n\nEnjeux majeurs :\n- Prévention des infections nosocomiales : Réduire la charge microbienne et protéger les patients vulnérables.\n- Protection du personnel soignant : Réduire les risques de contamination professionnelle.\n- Conformité réglementaire : Exigences des autorités sanitaires (OMS, normes ISO).\n- Image et confiance : Un hôpital propre inspire confiance aux patients et à leurs familles."
    )

    # 5. Domaines de compétences
    competencies_title = models.CharField(max_length=200, default="NOS DOMAINES DE COMPÉTENCES")
    competencies_content = models.TextField(
        default="1. Bionettoyage et désinfection\n2. Décapage et entretien des plateaux techniques\n3. Gestion des déchets industriels\n4. Produits & Équipements professionnels\n5. Formation & Placement du personnel\n6. Traitement des sanitaires\n7. Hygiène publique & environnementale"
    )

    # 6. Notre mission
    mission_title = models.CharField(max_length=200, default="NOTRE MISSION")
    mission_content = models.TextField(
        default="BIONETTOYAGE : Méthode d'hygiène hospitalière (Nettoyage + Désinfection).\n\n- NETTOYAGE : Élimine les salissures visibles.\n- DÉSINFECTION : Détruit les micro-organismes.\n\nRésultat : ENVIRONNEMENT HOSPITALIER ET INDUSTRIEL PROPRE ET SÉCURISÉ.\n\n« La propreté et l’hygiène qui protègent, la qualité qui rassure : Un bon équilibre entre santé, industrie et services »"
    )

    # 7. Notre objectif et objectifs spécifiques
    objectives_title = models.CharField(max_length=200, default="NOTRE OBJECTIF ET OBJECTIFS SPÉCIFIQUES")
    objectives_content = models.TextField(
        default="L'objectif principal de J&B SANIYAPUR est de permettre aux établissements de santé et industriels d'exercer leurs activités dans les meilleures conditions d'hygiène, en collaboration étroite avec les professionnels pour assurer un service de qualité irréprochable."
    )
    specific_objectives_content = models.TextField(
        default="1. Maintenir la propreté dès la construction : Intervention dès la phase de construction pour préserver l'état d'origine des équipements sanitaires ou industriels.\n2. Prévenir la détérioration des équipements : Prévenir la rouille, l'usure et les fermetures d'établissements.\n3. Garantir la sécurité sanitaire : Protéger le personnel, les patients et consommateurs.\n4. Optimiser les coûts d'exploitation : Entretien préventif pour prolonger la durée de vie des équipements.\n5. Améliorer l'expérience client : Confort, bien-être et satisfaction des usagers.\n6. Valoriser l'image de l'établissement : Renforcer la confiance des clients, partenaires et autorités."
    )
    bionettoyage_advantages_content = models.TextField(
        default="Les avantages concrets du bionettoyage pour les établissements :\n- Réduire le risque d’infections.\n- Sécuriser les clients, le personnel, les consommateurs et les visiteurs.\n- Garantir une hygiène constante dans tous les services.\n- Préserver durablement les locaux et les équipements.\n- Améliorer le confort et l’expérience clients.\n- Faciliter le contrôle et la traçabilité des prestations.\n- Renforcer l’image et la confiance envers l’établissement.\n- Optimiser l’organisation du personnel."
    )

    # 8. Notre vision
    vision_title = models.CharField(max_length=200, default="NOTRE VISION : LA SATISFACTION DES CLIENTS")
    vision_content = models.TextField(
        default="Notre vision est simple mais puissante : Contribuer activement à la satisfaction des clients en créant un environnement hospitalier sain, propre et sécurisé, exempt de risques de contamination."
    )
    vision_paradox_content = models.TextField(
        default='Le paradoxe que nous combattons :\nNous combattons l\'idée ironique et malheureusement trop réelle selon laquelle "on entre à l\'hôpital avec une maladie et on repart avec une autre ou plusieurs maladies". Cette expression reflète une réalité préoccupante que nous éliminons par notre bionettoyage rigoureux.'
    )
    vision_execution_content = models.TextField(
        default="Comment nous réalisons cette vision :\n- Protocoles rigoureux : Application stricte et traçabilité complète.\n- Personnel hautement qualifié : Formation continue aux standards internationaux.\n- Produits et équipements de pointe : Produits certifiés bactéricides/virucides et matériel allemand.\n- Approche préventive : Intervention proactive permanente.\n- Contrôle qualité constant : Audits réguliers et contrôles microbiologiques.\n- Collaboration étroite avec les équipes hospitalières."
    )
    vision_impact_content = models.TextField(
        default="Impact direct sur la satisfaction :\n- Réduction des risques sanitaires et de contamination.\n- Amélioration de la sécurité, du confort et du bien-être.\n- Préservation des équipements et des infrastructures.\n- Amélioration de l’image et crédibilité de l’organisation."
    )

    # 9. Expertise internationale
    international_expertise_title = models.CharField(max_length=200, default="EXPERTISE INTERNATIONALE")
    international_expertise_content = models.TextField(
        default="Grâce au travail d’équipe avec nos groupes allemands PUTZI SAUBER SERVICE et SYLT PURE REINIGUNG, nous bénéficions de :\n- Plus de 20 ans d'expérience dans le nettoyage hospitalier en Allemagne.\n- Accès aux dernières technologies et innovations en matière de bionettoyage.\n- Formation continue de nos équipes aux standards européens.\n- Équipements et produits certifiés conformes aux normes les plus strictes.\n- Méthodologie éprouvée dans des établissements de renommée internationale.\n- Transfert de savoir-faire et de bonnes pratiques."
    )
    international_expertise_image = models.ImageField(upload_to="about/", blank=True, null=True)

    # 10. Nos références clients
    references_title = models.CharField(max_length=200, default="NOS RÉFÉRENCES CLIENTS")
    references_content = models.TextField(
        default="J&B SANIYAPUR, à travers ses partenariats avec les entreprises allemandes PUTZI SAUBER SERVICE et SYLT PURE REINIGUNG, a développé une expertise reconnue :\n\n1. CHU DE PALA (Bobo-Dioulasso, Burkina Faso) : Nettoyage, bionettoyage des locaux, gestion des déchets, désinfection blocs opératoires & surfaces.\n2. HÔPITAL DOGTA-LAFIÈ / CLINIQUE LE PRINTEMPS (Lomé, Togo) : Bionettoyage, désinfection, fourniture d'équipements, formation du personnel.\n3. HOTEL BUDERSAND & HOTEL A-ROSA (Sylt, Allemagne) : Entretien général, désinfection surfaces, standards hôtellerie de luxe.\n4. 411 MAISONS DE LUXE (Sylt, Allemagne) : Nettoyage, désinfection et maintenance régulière de haut standing."
    )

    # 11. Message du Directeur Général
    dg_name = models.CharField(max_length=160, default="Monsieur Jules D. TEKPO", blank=True)
    dg_role = models.CharField(max_length=160, default="Directeur Général — J&B SANIYAPUR SARL", blank=True)
    dg_photo = models.ImageField(upload_to="about/", blank=True, null=True)
    dg_message = models.TextField(
        default="Après plusieurs années en tant qu'entrepreneur en Occident, je suis de retour chez moi, en Afrique, plus précisément au Burkina Faso, dans le pays des hommes fiers et intègres, pour offrir mon soutien et partager mon expertise. Avec J&B SANIYAPUR SARL, je souhaite surpasser tout ce que j'ai appris ailleurs. Mes 22 années d'expérience en Afrique et en Europe m'ont permis d'identifier et de comprendre les besoins de nos concitoyens.\n\nJe suis ravi d'être à votre service pour apporter confort et bien-être dans votre foyer.",
        blank=True,
    )

    # 12. Nos engagements
    engagements_title = models.CharField(max_length=200, default="NOS ENGAGEMENTS")
    engagements_content = models.TextField(
        default="1. Respect strict des protocoles de bionettoyage hospitalier.\n2. Personnel qualifié, formé et protégé socialement.\n3. Utilisation exclusive de produits et équipements certifiés.\n4. Traçabilité complète de toutes nos interventions.\n5. Contrôle qualité permanent et audits réguliers.\n6. Disponibilité et réactivité 24h/24, 7j/7.\n7. Collaboration étroite avec les équipes.\n8. Amélioration continue de nos services."
    )

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Contenu de la page À propos"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        instance, _ = cls.objects.get_or_create(pk=1)
        return instance
