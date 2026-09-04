import os
import shutil
import django
from PIL import Image

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from attestations.models import Attestation

media_att_dir = os.path.abspath('media/attestations/images')
os.makedirs(media_att_dir, exist_ok=True)

src_dir = os.path.abspath('../extracted_media_full')

# Rotate image7.jpeg by 270 (or 90) so it is properly oriented horizontally
img7_path = os.path.join(src_dir, 'image7.jpeg')
if os.path.exists(img7_path):
    im = Image.open(img7_path)
    im_rot = im.rotate(270, expand=True) # orient properly
    im_rot.save(os.path.join(media_att_dir, 'attestation-sensibilisation-qhse-saniyapur.jpg'), quality=95)
    print("image7.jpeg rotated and saved successfully!")

# Define authentic attestations matching the exact text on the scanned documents
items = [
    {
        'title': 'Attestation de Sensibilisation — Secourisme & Sécurité Incendie',
        'client_organisation': 'Cabinet QHSE ACADEMY SARL (Ouagadougou, Burkina Faso)',
        'type': 'attestation',
        'date': '10 Août 2026',
        'description': 'Attestation délivrée à SANIYAPUR SARL pour la participation réussie aux modules de formation sur le Secourisme (gestes qui sauvent) et la Sécurité Incendie (manipulation extincteurs). Réf: PSSI-141.',
        'src_file': None,
        'dest_file': 'attestation-sensibilisation-qhse-saniyapur.jpg',
        'order': 1,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Attestation de Formation Superviseur HSE — KPETE Amesron Promise',
        'client_organisation': 'Cabinet QHSE ACADEMY SARL (Ouagadougou, Burkina Faso)',
        'type': 'attestation',
        'date': '20 Août 2026',
        'description': 'Attestation certifiant que M. KPETE Amesron Promise a terminé avec succès le programme de formation de Superviseur HSE : santé sécurité au travail, risques chimiques (SIMDUT 2015) et rôles du superviseur au quotidien. Réf: SHSE N° 144.',
        'src_file': 'image8.jpeg',
        'dest_file': 'attestation-superviseur-kpete-amesron.jpg',
        'order': 2,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Attestation de Formation Superviseur HSE — AMOUZOU Komlan Edem',
        'client_organisation': 'Cabinet QHSE ACADEMY SARL (Ouagadougou, Burkina Faso)',
        'type': 'attestation',
        'date': '20 Août 2026',
        'description': 'Attestation certifiant que M. AMOUZOU Komlan Edem (Directeur Technique & Hygiène) a terminé avec succès la formation de Superviseur HSE : prévention des risques professionnels et chimiques (SIMDUT 2015). Réf: SHSE.',
        'src_file': 'image9.jpeg',
        'dest_file': 'attestation-superviseur-amouzou-komlan.jpg',
        'order': 3,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Attestation de Formation Superviseur HSE — SANOU Fatoumata',
        'client_organisation': 'Cabinet QHSE ACADEMY SARL (Ouagadougou, Burkina Faso)',
        'type': 'attestation',
        'date': '20 Août 2026',
        'description': 'Attestation certifiant que Mme SANOU Fatoumata a validé avec succès le cursus de Superviseur HSE sur la santé et sécurité au travail et les protocoles de prévention des risques. Réf: SHSE N° 151.',
        'src_file': 'image10.jpeg',
        'dest_file': 'attestation-superviseur-sanou-fatoumata.jpg',
        'order': 4,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Attestation de Formation Superviseur HSE — SANOU Abdoulaye',
        'client_organisation': 'Cabinet QHSE ACADEMY SARL (Ouagadougou, Burkina Faso)',
        'type': 'attestation',
        'date': '20 Août 2026',
        'description': 'Attestation certifiant que M. SANOU Abdoulaye a terminé avec succès la formation de Superviseur HSE : maîtrise des risques professionnels et gestion opérationnelle de la sécurité. Réf: SHSE N° 145.',
        'src_file': 'image11.jpeg',
        'dest_file': 'attestation-superviseur-sanou-abdoulaye.jpg',
        'order': 5,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Prix d’Excellence — Deutschlands Beste Arbeitgeber 2024',
        'client_organisation': 'Great Place to Work® Deutschland & Handelsblatt (Köln, Allemagne)',
        'type': 'certificate',
        'date': 'Mars 2024',
        'description': 'Distinction officielle : SYLT PURE (Inh. Jules TEKPO) a obtenu la 2e place au palmarès des Meilleurs Employeurs d’Allemagne (entreprises de 251 à 500 salariés) pour la qualité de son management, le respect du personnel et l’esprit d’équipe.',
        'src_file': 'image12.jpeg',
        'dest_file': 'great-place-to-work-sylt-pure-tekpo.jpg',
        'order': 6,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Diplôme Fachwirt/in für Reinigungs- und Hygienemanagement (IRHT)',
        'client_organisation': 'Institut für Reinigungs- und Hygienetechnik (IRHT — Allemagne / Togo)',
        'type': 'certificate',
        'date': '22 Octobre 2020',
        'description': 'Diplôme professionnel certifiant que M. AMOUZOU Komlan Edem a réussi avec la note d’excellence 1,7 (Sehr Gut / Très Bien) l’examen supérieur de Management du Nettoyage et de l’Hygiène Hospitalière.',
        'src_file': 'image13.jpeg',
        'dest_file': 'diplome-irht-hygiene-amouzou.jpg',
        'order': 7,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Zertifikat IHK Anwendungsberater für Reinigungs- und Hygienetechnik — Jules TEKPO',
        'client_organisation': 'IHK Region Stuttgart (Chambre de Commerce et d’Industrie de Stuttgart, Allemagne)',
        'type': 'certificate',
        'date': '30 Septembre 2024',
        'description': 'Certificat de qualification professionnelle d’État allemand délivré à M. Jules TEKPO (Directeur Général) après 120 heures de formation spécialisée en conseil technique et technologies de bionettoyage et hygiène hospitalière.',
        'src_file': 'image14.jpeg',
        'dest_file': 'zertifikat-ihk-stuttgart-jules-tekpo.jpg',
        'order': 8,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Zertifikat Fachwirtin Reinigungs- und Hygienemanagement — Hamburg',
        'client_organisation': 'Forschungs- und Prüfinstitut für Facility Management GmbH (Hambourg, Allemagne)',
        'type': 'certificate',
        'date': '22 Octobre 2020',
        'description': 'Certificat d’aptitude professionnelle en gestion des installations et de l’hygiène hospitalière délivré à M. AMOUZOU Komlan Edem.',
        'src_file': 'image15.jpeg',
        'dest_file': 'zertifikat-facility-management-hamburg.jpg',
        'order': 9,
        'featured': False,
        'published': True,
    },
    {
        'title': 'Zertifikat IHK Anwendungsberater für Reinigungs- und Hygienetechnik — AMOUZOU Komlan Edem',
        'client_organisation': 'IHK Region Stuttgart (Chambre de Commerce et d’Industrie de Stuttgart, Allemagne)',
        'type': 'certificate',
        'date': '30 Septembre 2024',
        'description': 'Certificat d’État allemand délivré à M. AMOUZOU Komlan Edem (Directeur Technique) pour la réussite du cursus de Conseiller Technique en Hygiène et Bionettoyage (120 heures).',
        'src_file': 'image16.jpeg',
        'dest_file': 'zertifikat-ihk-stuttgart-amouzou.jpg',
        'order': 10,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Certificat International de Management de la Qualité ISO 9001:2015',
        'client_organisation': 'QA Technic Survey GmbH / DAkkS (Sylt, Allemagne)',
        'type': 'certificate',
        'date': '2021 - 2024 / 2026',
        'description': 'Certification officielle attestant que la société Gebäudereinigung SYLT PURE (Inh. Jules TEKPO) applique un système de gestion de la qualité conforme aux normes internationales ISO 9001:2015 dans le domaine du nettoyage et bionettoyage. N° d’enregistrement : QA-0190010067.',
        'src_file': 'image17.jpeg',
        'dest_file': 'certificat-iso-9001-sylt-pure-tekpo.jpg',
        'order': 11,
        'featured': True,
        'published': True,
    },
]

print("Purging and inserting exact, 100% authentic attestations...")
Attestation.objects.all().delete()

for item in items:
    dest_name = f"attestations/images/{item['dest_file']}"
    dest_full_path = os.path.join(media_att_dir, item['dest_file'])
    
    if item['src_file']:
        src_full_path = os.path.join(src_dir, item['src_file'])
        if os.path.exists(src_full_path):
            shutil.copy2(src_full_path, dest_full_path)
            print(f"Copied {item['src_file']} -> {item['dest_file']}")
        else:
            print(f"File {src_full_path} does not exist")
            
    att = Attestation.objects.create(
        title=item['title'],
        client_organisation=item['client_organisation'],
        type=item['type'],
        date=item['date'],
        description=item['description'],
        image=dest_name if os.path.exists(dest_full_path) else None,
        order=item['order'],
        featured=item['featured'],
        published=item['published'],
    )
    print(f"Created Attestation #{att.id}: {att.title} ({att.client_organisation})")

print(f"\nTotal authentic attestations seeded: {Attestation.objects.count()}")
