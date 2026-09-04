import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from site_settings.models import AboutSettings

about = AboutSettings.load()

new_content = """1. CENTRE HOSPITALIER UNIVERSITAIRE (CHU) DE PALA
Services : Nettoyage, bionettoyage des locaux, gestion des déchets, fournitures produits d'entretien, désinfection blocs opératoires, entretiens sanitaires, désinfection des surfaces.
Localisation : Bobo-Dioulasso, BURKINA FASO

2. HÔPITAL DOGTA-LAFIÈ / CLINIQUE LE PRINTEMPS
Services : Bionettoyage et désinfection, fourniture équipements, entretien général bureaux, désinfection des surfaces, formation du personnel.
Localisation : Lomé, TOGO (www.hopitaldogtalafie.tg)

J&B SANIYAPUR, à travers ses partenariats avec les entreprises allemandes PUTZI SAUBER SERVICE et SYLT PURE REINIGUNG, a développé une expertise reconnue dans le bionettoyage hospitalier et le nettoyage professionnel de haut standing :

3. HOTEL BUDERSAND & HOTEL A-ROSA
Services : Entretien et nettoyage général, désinfection des surfaces, nettoyage chambres, standards hôtellerie de luxe, entretien résidentiel haut de gamme.
Localisation : Sylt, ALLEMAGNE (www.budersand.de / www.a-rosa.de)

4. 411 MAISONS DE LUXE
Services : Nettoyage et désinfection, maintenance régulière.
Localisation : Sylt, ALLEMAGNE"""

about.references_content = new_content
about.save()
print("Updated successfully to: CENTRE HOSPITALIER UNIVERSITAIRE (CHU) DE PALA")
