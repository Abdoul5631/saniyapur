from django.db import models
from django.utils.text import slugify


class Service(models.Model):
    name = models.CharField(max_length=180)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    short_description = models.CharField(max_length=300, blank=True, default="")
    description = models.TextField()
    prestations = models.TextField(
        blank=True,
        help_text="Détail des prestations associées (un point par ligne ou texte explicatif).",
    )
    avantages = models.TextField(
        blank=True,
        help_text="Avantages spécifiques du service (un point par ligne ou texte explicatif).",
    )
    sectors = models.ManyToManyField(
        "sectors.Sector",
        related_name="services",
        blank=True,
        help_text="Secteurs d’activité concernés par ce service.",
    )
    image = models.ImageField(upload_to="services/", blank=True, null=True)
    icon = models.CharField(
        max_length=40,
        blank=True,
        help_text="Clé d’icône (ex. droplet, grid, trash, box, people, tap, shield).",
    )
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
            base_slug = slugify(self.name) or "service"
            slug = base_slug
            counter = 1
            while Service.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        if not self.short_description and self.description:
            self.short_description = self.description[:280]
        super().save(*args, **kwargs)
