from rest_framework import serializers
from sectors.models import Sector
from sectors.serializers import SectorSerializer
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    sector_details = SectorSerializer(source="sectors", many=True, read_only=True)
    sectors = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Sector.objects.all(), required=False
    )

    class Meta:
        model = Service
        fields = "__all__"

