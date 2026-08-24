from django.contrib import admin
from .models import Product, ProductImage
class ProductImageInline(admin.TabularInline): model = ProductImage; extra = 1
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "published", "updated_at"); list_filter = ("category", "published"); search_fields = ("name", "category"); prepopulated_fields = {"slug": ("name",)}; inlines = [ProductImageInline]
