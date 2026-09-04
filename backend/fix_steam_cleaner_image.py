import os
import shutil
import zipfile
import django
from PIL import Image

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product

media_products_dir = os.path.abspath('media/products')
os.makedirs(media_products_dir, exist_ok=True)

dest_img_name = 'nettoyeur-vapeur-sterilisateur-desinfecteur.jpg'
dest_img_path = os.path.join(media_products_dir, dest_img_name)

with zipfile.ZipFile('../Catalogue SANIYAPUR SARL .docx', 'r') as z:
    # image122.jpg is the actual steam cleaner machine photo
    if 'word/media/image122.jpg' in z.namelist():
        data = z.read('word/media/image122.jpg')
        with open(dest_img_path, 'wb') as f:
            f.write(data)
        print(f"Extracted image122.jpg -> {dest_img_path} ({len(data)} bytes)")

# Update product in DB
p = Product.objects.filter(reference='VAP-STER-01').first() or Product.objects.filter(slug__icontains='nettoyeur-a-vapeur').first()
if p:
    p.image = f'products/{dest_img_name}'
    p.save()
    print(f"Updated product #{p.id} '{p.name}' with real image: {p.image}")
else:
    print("Product VAP-STER-01 not found!")
