from django.contrib import admin
from .models import Realisation, RealisationImage
class RealisationImageInline(admin.TabularInline): model = RealisationImage; extra = 1
@admin.register(Realisation)
class RealisationAdmin(admin.ModelAdmin):
    list_display = ("title", "sector", "date", "featured", "published"); list_filter = ("sector", "featured", "published"); search_fields = ("title", "client", "location"); prepopulated_fields = {"slug": ("title",)}; inlines = [RealisationImageInline]
