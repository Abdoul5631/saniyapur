from django.contrib import admin
from .models import TeamGalleryPhoto, TeamGallerySettings, TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["name", "role", "order", "published"]
    list_editable = ["order", "published"]
    ordering = ["order", "name"]


@admin.register(TeamGallerySettings)
class TeamGallerySettingsAdmin(admin.ModelAdmin):
    fields = ["title", "description"]


@admin.register(TeamGalleryPhoto)
class TeamGalleryPhotoAdmin(admin.ModelAdmin):
    list_display = ["id", "caption", "order", "created_at"]
    list_editable = ["caption", "order"]
    ordering = ["order", "id"]
