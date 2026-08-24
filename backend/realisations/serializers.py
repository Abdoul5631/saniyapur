from rest_framework import serializers
from sectors.models import Sector
from services.models import Service
from .models import Realisation, RealisationImage
class RealisationImageSerializer(serializers.ModelSerializer):
    class Meta: model = RealisationImage; fields = "__all__"
class RealisationSerializer(serializers.ModelSerializer):
    images = RealisationImageSerializer(many=True, read_only=True)
    sector = serializers.SlugRelatedField(slug_field="name", queryset=Sector.objects.all())
    service = serializers.SlugRelatedField(slug_field="name", queryset=Service.objects.all(), required=False, allow_null=True)
    class Meta: model = Realisation; fields = "__all__"
