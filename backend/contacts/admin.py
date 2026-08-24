from django.contrib import admin
from .models import ContactRequest
@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin): list_display = ("name", "company", "email", "subject", "processed", "created_at"); list_filter = ("processed",); search_fields = ("name", "company", "email", "subject"); readonly_fields = ("created_at",)
