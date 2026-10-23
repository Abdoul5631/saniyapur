from django.contrib import admin
from .models import PageView


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ("date", "path", "source", "created_at")
    list_filter = ("date", "source")
    search_fields = ("path",)
