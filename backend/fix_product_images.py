import os
import shutil
import zipfile
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product

media_products_dir = os.path.abspath('media/products')
os.makedirs(media_products_dir, exist_ok=True)

# Extract image63.png from Catalogue SANIYAPUR SARL .docx
dest_img_name = 'dr-schnell-novo-pen-off.png'
dest_img_path = os.path.join(media_products_dir, dest_img_name)

with zipfile.ZipFile('../Catalogue SANIYAPUR SARL .docx', 'r') as z:
    if 'word/media/image63.png' in z.namelist():
        data = z.read('word/media/image63.png')
        with open(dest_img_path, 'wb') as f:
            f.write(data)
        print(f"Extracted image63.png -> {dest_img_path} ({len(data)} bytes)")

# Update product in DB
p = Product.objects.filter(slug__icontains='novo-pen-off').first()
if p:
    p.image = f'products/{dest_img_name}'
    p.save()
    print(f"Updated product #{p.id} '{p.name}' with image: {p.image}")

# Check all other products
print("\nChecking all products image status:")
for prod in Product.objects.all():
    img_field = getattr(prod, 'image', None)
    img_path = os.path.join('media', str(img_field)) if img_field else None
    exists = os.path.exists(img_path) if img_path else False
    size = os.path.getsize(img_path) if exists else 0
    print(f"- {prod.name}: image='{img_field}', exists={exists}, size={size} bytes")
