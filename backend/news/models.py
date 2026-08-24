from django.db import models
class NewsArticle(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.CharField(max_length=350)
    content = models.TextField()
    author = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to="news/", blank=True, null=True)
    published = models.BooleanField(default=False)
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: ordering = ["-published_at", "-created_at"]
    def __str__(self): return self.title
