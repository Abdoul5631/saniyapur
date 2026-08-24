from django.db import models
class Service(models.Model):
    name = models.CharField(max_length=180)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=300)
    description = models.TextField()
    image = models.ImageField(upload_to="services/", blank=True, null=True)
    icon = models.CharField(max_length=40, blank=True, help_text="Clé d’icône (ex. droplet, sanitation, waste).")
    order = models.PositiveIntegerField(default=0)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: ordering = ["order", "name"]
    def __str__(self): return self.name
