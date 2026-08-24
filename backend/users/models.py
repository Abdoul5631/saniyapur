from django.conf import settings
from django.db import models


class Profile(models.Model):
    class Role(models.TextChoices):
        ADMIN = "admin", "Administrateur"
        EDITOR = "editor", "Éditeur"
        COMMERCIAL = "commercial", "Commercial"

    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name="profile", on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.EDITOR)

    def __str__(self):
        return f"{self.user} ({self.get_role_display()})"
