from PIL import Image, ImageChops


def trim_margins(path: str, padding_ratio: float = 0.02) -> bool:
    """Retire les marges vides (blanches ou transparentes) autour d'un logo, sur place.

    Garde une petite marge (2 % de la plus grande dimension). Retourne True si le fichier a été recadré.
    """
    with Image.open(path) as opened:
        image = opened.copy()
        image_format = opened.format

    rgba = image.convert("RGBA")
    white = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    white.alpha_composite(rgba)
    differs = ImageChops.difference(white.convert("RGB"), Image.new("RGB", rgba.size, (255, 255, 255))).convert("L")
    box = differs.point(lambda value: 255 if value > 25 else 0).getbbox()
    if not box:
        return False

    pad = round(max(image.size) * padding_ratio)
    box = (max(box[0] - pad, 0), max(box[1] - pad, 0), min(box[2] + pad, image.width), min(box[3] + pad, image.height))
    # Rien à retirer si les marges sont déjà très fines.
    if (box[2] - box[0]) * (box[3] - box[1]) >= 0.97 * image.width * image.height:
        return False

    cropped = image.crop(box)
    if image_format == "JPEG":
        cropped.convert("RGB").save(path, "JPEG", quality=92)
    else:
        cropped.save(path, image_format or "PNG")
    return True
