from rest_framework import serializers
from .models import Sector, SectorImage


class SectorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectorImage
        fields = ("id", "sector", "image", "order")


class SectorSerializer(serializers.ModelSerializer):
    gallery = SectorImageSerializer(many=True, read_only=True)

    class Meta:
        model = Sector
        fields = "__all__"
