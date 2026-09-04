from django.db import models
from django.utils.text import slugify


class NewsArticle(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    excerpt = models.CharField(max_length=350, blank=True)
    content = models.TextField()
    category = models.CharField(max_length=100, blank=True, help_text="Catégorie (ex. Entreprise, Hygiène, Événement).")
    author = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to="news/", blank=True, null=True)
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=False)
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "actualite"
            slug = base_slug
            counter = 1
            while NewsArticle.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        if not self.excerpt and self.content:
            self.excerpt = self.content[:300]
        super().save(*args, **kwargs)
