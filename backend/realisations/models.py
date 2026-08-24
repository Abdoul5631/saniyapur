from django.db import models
from sectors.models import Sector
from services.models import Service
class Realisation(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    client = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=200, blank=True)
    sector = models.ForeignKey(Sector, related_name="realisations", on_delete=models.PROTECT)
    service = models.ForeignKey(Service, related_name="realisations", on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField()
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: ordering = ["-date", "-created_at"]
    def __str__(self): return self.title
class RealisationImage(models.Model):
    class ImageType(models.TextChoices): MAIN = "main", "Principale"; BEFORE = "before", "Avant"; AFTER = "after", "Après"; GALLERY = "gallery", "Galerie"
    realisation = models.ForeignKey(Realisation, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="realisations/")
    caption = models.CharField(max_length=255, blank=True)
    type = models.CharField(max_length=10, choices=ImageType.choices, default=ImageType.GALLERY)
    order = models.PositiveIntegerField(default=0)
    class Meta: ordering = ["order", "id"]
    def __str__(self): return f"{self.realisation} — {self.type}"
