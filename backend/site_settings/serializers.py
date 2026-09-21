from rest_framework import serializers
from .models import SiteSettings, AboutSettings, ClientLogo


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"
        read_only_fields = ("id", "updated_at")


class ClientLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientLogo
        fields = "__all__"
        read_only_fields = ("id", "created_at")


class AboutSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSettings
        fields = "__all__"
        read_only_fields = ("id", "updated_at")
