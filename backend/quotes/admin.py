from django.contrib import admin
from .models import QuoteRequest
@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin): list_display = ("name", "organisation", "service", "status", "created_at"); list_filter = ("status", "service"); search_fields = ("name", "organisation", "email"); readonly_fields = ("created_at",)
