from django.db import models


class PageView(models.Model):
    """Une page vue du site public. Aucune donnée personnelle : le visiteur est un hachage qui change chaque jour."""

    date = models.DateField(db_index=True)
    path = models.CharField(max_length=300)
    visitor = models.CharField(max_length=32)
    source = models.CharField(max_length=40, blank=True, help_text="Renseignée seulement à l'arrivée sur le site.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["date", "path"])]

    def __str__(self):
        return f"{self.date} {self.path}"
