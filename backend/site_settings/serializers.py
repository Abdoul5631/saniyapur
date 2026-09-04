from rest_framework import serializers
from .models import SiteSettings, AboutSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"
        read_only_fields = ("id", "updated_at")


class AboutSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSettings
        fields = "__all__"
        read_only_fields = ("id", "updated_at")
