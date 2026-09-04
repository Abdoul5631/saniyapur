from django.db import models
from django.utils.text import slugify


class Product(models.Model):
    name = models.CharField(max_length=180)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    reference = models.CharField(max_length=80, blank=True)
    category = models.CharField(max_length=120)
    short_description = models.CharField(max_length=300, blank=True, default="")
    description = models.TextField()
    usage = models.TextField(blank=True, default="")
    characteristics = models.TextField(blank=True, help_text="Une caractéristique par ligne.")
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    technical_sheet = models.FileField(upload_to="products/technical-sheets/", blank=True, null=True)
    safety_sheet = models.FileField(upload_to="products/safety-sheets/", blank=True, null=True)
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name) or "produit"
            slug = base_slug
            counter = 1
            while Product.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        if not self.short_description and self.description:
            self.short_description = self.description[:280]
        super().save(*args, **kwargs)
class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="gallery", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products/gallery/")
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)
    class Meta: ordering = ["order", "id"]
    def __str__(self): return f"{self.product} — image {self.order}"
