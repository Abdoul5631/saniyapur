from django.contrib import admin
from .models import TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["name", "role", "order", "published"]
    list_editable = ["order", "published"]
    ordering = ["order", "name"]
