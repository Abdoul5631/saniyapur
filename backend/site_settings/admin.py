from django.contrib import admin
from .models import SiteSettings, AboutSettings, ClientLogo


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Entreprise", {"fields": ("company_name", "logo", "tagline", "slogan", "description", "address")}),
        ("Contact", {"fields": ("phone", "whatsapp", "email", "opening_hours")}),
        ("Réseaux sociaux", {"fields": ("facebook_url", "linkedin_url", "instagram_url", "whatsapp_url")}),
        (
            "Accueil — Hero",
            {
                "fields": (
                    "hero_image",
                    "hero_image_2",
                    "hero_image_3",
                    "hero_title",
                    "hero_text",
                    "hero_primary_button_label",
                    "hero_primary_button_url",
                    "hero_secondary_button_label",
                    "hero_secondary_button_url",
                )
            },
        ),
        (
            "Accueil — En chiffres",
            {
                "fields": (
                    "stats_since_year",
                    "stat_1_value",
                    "stat_1_suffix",
                    "stat_1_label",
                    "stat_1_description",
                    "stat_2_value",
                    "stat_2_suffix",
                    "stat_2_label",
                    "stat_2_description",
                    "stat_3_value",
                    "stat_3_suffix",
                    "stat_3_label",
                    "stat_3_description",
                    "stat_4_value",
                    "stat_4_suffix",
                    "stat_4_label",
                    "stat_4_description",
                    "stat_5_value",
                    "stat_5_suffix",
                    "stat_5_label",
                    "stat_5_description",
                )
            },
        ),
    )


@admin.register(ClientLogo)
class ClientLogoAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "order", "created_at"]
    list_editable = ["name", "order"]
    ordering = ["order", "id"]


admin.site.register(AboutSettings)
