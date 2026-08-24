from django.contrib import admin
from .models import Sector
@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin): list_display = ("name", "published", "updated_at"); list_filter = ("published",); prepopulated_fields = {"slug": ("name",)}
