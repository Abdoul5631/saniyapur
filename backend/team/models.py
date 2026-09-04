from django.db import models


class TeamMember(models.Model):
    name = models.CharField(max_length=160)
    role = models.CharField(max_length=160)
    phone = models.CharField(max_length=120, blank=True)
    photo = models.ImageField(upload_to="team/", blank=True, null=True)
    bio = models.TextField(blank=True, help_text="Description de la fonction et des responsabilités")
    order = models.PositiveIntegerField(default=0)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return f"{self.name} — {self.role}"
