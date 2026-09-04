import os
import shutil
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from attestations.models import Attestation

# Destination media directory
media_att_dir = os.path.abspath('media/attestations/images')
os.makedirs(media_att_dir, exist_ok=True)

src_dir = os.path.abspath('../extracted_media_full')

# List of official attestations from the SANIYAPUR SARL Presentation Actuel 2 document
attestations_data = [
    {
        'title': 'Attestation de Bonne Exécution — CHU de Pala',
        'client_organisation': 'Centre Hospitalier Universitaire (CHU) de Pala — Bobo-Dioulasso, Burkina Faso',
        'type': 'attestation',
        'date': '2025',
        'description': 'Attestation officielle de bonne exécution des prestations de bionettoyage hospitalier, désinfection des blocs opératoires, gestion des déchets et maintien de l’hygiène des locaux.',
        'src_file': 'image8.jpeg',
        'dest_file': 'attestation-chu-pala-2025.jpg',
        'order': 1,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Attestation de Prestation & Formation — Hôpital DOGTA-LAFIÈ',
        'client_organisation': 'Le Grand Hôpital DOGTA-LAFIÈ & Clinique Le Printemps — Lomé, Togo',
        'type': 'attestation',
        'date': '2024',
        'description': 'Attestation relative aux interventions de bionettoyage et désinfection des surfaces, fourniture de consommables et formation continue des équipes opérationnelles.',
        'src_file': 'image9.jpeg',
        'dest_file': 'attestation-dogta-lafie-2024.jpg',
        'order': 2,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Certificat de Partenariat & Normes Hospitalières Allemandes',
        'client_organisation': 'PUTZI SAUBER SERVICE & SYLT PURE REINIGUNG — Sylt, Allemagne',
        'type': 'certificate',
        'date': 'Depuis 2003',
        'description': 'Certificat attestant du partenariat institutionnel, du transfert de technologies et du respect rigoureux des standards européens de désinfection et de bionettoyage.',
        'src_file': 'image7.jpeg',
        'dest_file': 'certificat-partenariat-allemand.jpg',
        'order': 3,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Référence Hôtellerie de Luxe — Hôtel Budersand & A-ROSA',
        'client_organisation': 'Hôtel Budersand 5* & Resort A-ROSA — Sylt, Allemagne',
        'type': 'reference',
        'date': '2024',
        'description': 'Certificat de satisfaction pour l’entretien général, la désinfection des surfaces et la conciergerie aux standards de l’hôtellerie de luxe 5 étoiles.',
        'src_file': 'image10.jpeg',
        'dest_file': 'reference-hotel-budersand.jpg',
        'order': 4,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Attestation de Conformité Sanitaire & Résidences Haut Standing',
        'client_organisation': 'Gestion Privée — 411 Maisons de Luxe — Sylt, Allemagne',
        'type': 'reference',
        'date': '2024',
        'description': 'Attestation d’excellence opérationnelle pour le nettoyage, la désinfection et la maintenance continue de résidences privées haut de gamme.',
        'src_file': 'image11.jpeg',
        'dest_file': 'attestation-residences-luxe.jpg',
        'order': 5,
        'featured': True,
        'published': True,
    },
    {
        'title': 'Certificat d’Agrément & Homologation des Procédés',
        'client_organisation': 'J&B SANIYAPUR SARL — Direction Générale & QHSE',
        'type': 'certificate',
        'date': '2025',
        'description': 'Document officiel d’homologation des protocoles « Propreté sur ordonnance » et de conformité aux normes sanitaires internationales.',
        'src_file': 'image91.jpg',
        'dest_file': 'certificat-agrement-qh-saniyapur.jpg',
        'order': 6,
        'featured': True,
        'published': True,
    },
]

print("Seeding official attestations from presentation document...")
Attestation.objects.all().delete()

for data in attestations_data:
    src_path = os.path.join(src_dir, data['src_file'])
    dest_name = f"attestations/images/{data['dest_file']}"
    dest_full_path = os.path.join(media_att_dir, data['dest_file'])
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_full_path)
        print(f"Copied {data['src_file']} -> {dest_full_path}")
    else:
        print(f"Warning: {src_path} does not exist")
        
    att = Attestation.objects.create(
        title=data['title'],
        client_organisation=data['client_organisation'],
        type=data['type'],
        date=data['date'],
        description=data['description'],
        image=dest_name if os.path.exists(dest_full_path) else None,
        order=data['order'],
        featured=data['featured'],
        published=data['published'],
    )
    print(f"Created Attestation: id={att.id}, title='{att.title}'")

print(f"Total Attestations in DB: {Attestation.objects.count()}")
