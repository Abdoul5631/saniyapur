from django.db import models
class Product(models.Model):
    name = models.CharField(max_length=180)
    slug = models.SlugField(unique=True)
    reference = models.CharField(max_length=80, blank=True)
    category = models.CharField(max_length=120)
    short_description = models.CharField(max_length=300)
    description = models.TextField()
    usage = models.TextField()
    characteristics = models.TextField(blank=True, help_text="Une caractéristique par ligne.")
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    technical_sheet = models.FileField(upload_to="products/technical-sheets/", blank=True, null=True)
    safety_sheet = models.FileField(upload_to="products/safety-sheets/", blank=True, null=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: ordering = ["name"]
    def __str__(self): return self.name
class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="gallery", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products/gallery/")
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)
    class Meta: ordering = ["order", "id"]
    def __str__(self): return f"{self.product} — image {self.order}"
