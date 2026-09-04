from django.db import models
from django.utils.text import slugify


class Attestation(models.Model):
    class TypeChoices(models.TextChoices):
        ATTESTATION = "attestation", "Attestation"
        CERTIFICATE = "certificate", "Certificat"
        REFERENCE = "reference", "Référence"
        OTHER = "other", "Autre"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    client_organisation = models.CharField(max_length=200, help_text="Client ou Organisme ayant délivré le document")
    type = models.CharField(max_length=20, choices=TypeChoices.choices, default=TypeChoices.ATTESTATION)
    date = models.CharField(max_length=100, blank=True, help_text="Date ou période indiquée sur le document")
    description = models.TextField(blank=True, help_text="Contexte ou détails du document")
    image = models.ImageField(upload_to="attestations/images/", blank=True, null=True)
    pdf_file = models.FileField(upload_to="attestations/pdf/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return f"{self.title} — {self.client_organisation}"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "attestation"
            slug = base_slug
            counter = 1
            while Attestation.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)
