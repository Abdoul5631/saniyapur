import winocr, os
from PIL import Image

for i in range(7, 18):
    fn = f'image{i}.jpeg'
    p = os.path.abspath(os.path.join('../extracted_media_full', fn))
    if os.path.exists(p):
        img = Image.open(p)
        res = winocr.recognize_pil_sync(img, lang='fr-FR')
        print(f'================ {fn} (size: {img.size}) ================')
        print(res.get('text', ''))
