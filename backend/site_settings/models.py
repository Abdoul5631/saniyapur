from django.db import models


class SiteSettings(models.Model):
    """Ligne unique (singleton) — paramètres globaux du site public."""

    # Informations entreprise
    company_name = models.CharField(max_length=200, default="J&B SANIYAPUR SARL")
    logo = models.ImageField(upload_to="settings/", blank=True, null=True)
    tagline = models.CharField(max_length=200, default="PROPRETÉ SUR ORDONNANCE", help_text="Devise officielle — ne pas modifier sans demande explicite.")
    slogan = models.CharField(max_length=300, default="La propreté et l’hygiène qui protègent, la qualité qui rassure.")
    description = models.TextField(blank=True)
    address = models.CharField(max_length=300, blank=True)

    # Contact
    phone = models.CharField(max_length=40, blank=True)
    whatsapp = models.CharField(max_length=40, blank=True)
    email = models.EmailField(blank=True)
    opening_hours = models.CharField(max_length=200, blank=True)

    # Réseaux sociaux
    facebook_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    whatsapp_url = models.URLField(blank=True)

    # Accueil — section Hero
    hero_image = models.ImageField(upload_to="settings/", blank=True, null=True)
    hero_title = models.CharField(max_length=300, blank=True)
    hero_text = models.TextField(blank=True)
    hero_primary_button_label = models.CharField(max_length=80, blank=True)
    hero_primary_button_url = models.CharField(max_length=200, blank=True)
    hero_secondary_button_label = models.CharField(max_length=80, blank=True)
    hero_secondary_button_url = models.CharField(max_length=200, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        instance, _ = cls.objects.get_or_create(pk=1)
        return instance
