from django.contrib import admin
from .models import Sector, SectorImage


class SectorImageInline(admin.TabularInline):
    model = SectorImage
    extra = 2


@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ("name", "published", "updated_at")
    list_filter = ("published",)
    prepopulated_fields = {"slug": ("name",)}
    inlines = [SectorImageInline]
