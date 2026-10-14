from django.contrib import admin
from .models import Service, ServiceImage


class ServiceImageInline(admin.TabularInline):
    model = ServiceImage
    extra = 2


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "published", "updated_at")
    list_filter = ("published",)
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ServiceImageInline]
