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


class TeamGallerySettings(models.Model):
    """Ligne unique — titre et texte de la galerie photo de l’équipe."""

    title = models.CharField(max_length=200, default="Galerie de l’équipe")
    description = models.TextField(
        blank=True,
        help_text="Message descriptif affiché au-dessus des photos sur le site public.",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Paramètres de la galerie équipe"
        verbose_name_plural = "Paramètres de la galerie équipe"

    def __str__(self):
        return self.title or "Galerie de l’équipe"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        instance, _ = cls.objects.get_or_create(pk=1)
        return instance


class TeamGalleryPhoto(models.Model):
    image = models.ImageField(upload_to="team/gallery/")
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Photo de la galerie équipe"
        verbose_name_plural = "Photos de la galerie équipe"

    def __str__(self):
        return self.caption or f"Photo {self.pk}"
