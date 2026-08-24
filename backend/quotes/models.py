from django.db import models
class QuoteRequest(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "Nouveau"
        IN_PROGRESS = "in_progress", "En cours"
        DONE = "done", "Traité"
        ARCHIVED = "archived", "Archivé"

    name = models.CharField(max_length=160)
    organisation = models.CharField(max_length=200, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    service = models.CharField(max_length=180, blank=True)
    sector = models.CharField(max_length=180, blank=True)
    location = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    attachment = models.FileField(upload_to="quotes/attachments/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    notes = models.TextField(blank=True, help_text="Notes internes, non visibles publiquement.")
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta: ordering = ["-created_at"]
    def __str__(self): return f"{self.name} — demande de devis"
