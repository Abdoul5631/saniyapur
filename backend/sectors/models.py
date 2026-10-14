from django.db import models
from django.utils.text import slugify


class Sector(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    description = models.TextField(blank=True)
    besoins_specifiques = models.TextField(
        blank=True,
        help_text="Besoins propres et exigences techniques propres à ce type d’environnement.",
    )
    image = models.ImageField(upload_to="sectors/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name) or "secteur"
            slug = base_slug
            counter = 1
            while Sector.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class SectorImage(models.Model):
    """Photos supplémentaires d'un secteur, affichées en diaporama sur le site."""

    sector = models.ForeignKey(Sector, related_name="gallery", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="sectors/")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.sector.name} #{self.order}"
