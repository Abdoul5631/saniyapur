from rest_framework import serializers
from sectors.models import Sector
from sectors.serializers import SectorSerializer
from .models import Service, ServiceImage


class ServiceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceImage
        fields = ("id", "service", "image", "order")


class ServiceSerializer(serializers.ModelSerializer):
    gallery = ServiceImageSerializer(many=True, read_only=True)
    sector_details = SectorSerializer(source="sectors", many=True, read_only=True)
    sectors = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Sector.objects.all(), required=False
    )

    class Meta:
        model = Service
        fields = "__all__"

