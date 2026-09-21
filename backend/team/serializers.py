from rest_framework import serializers
from .models import TeamGalleryPhoto, TeamGallerySettings, TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = "__all__"


class TeamGallerySettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamGallerySettings
        fields = "__all__"
        read_only_fields = ("id", "updated_at")


class TeamGalleryPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamGalleryPhoto
        fields = "__all__"
        read_only_fields = ("id", "created_at")
