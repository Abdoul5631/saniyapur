from django.contrib import admin
from .models import Attestation


@admin.register(Attestation)
class AttestationAdmin(admin.ModelAdmin):
    list_display = ("title", "client_organisation", "type", "date", "order", "featured", "published", "created_at")
    list_filter = ("type", "published", "featured")
    search_fields = ("title", "client_organisation", "description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order", "-created_at")
