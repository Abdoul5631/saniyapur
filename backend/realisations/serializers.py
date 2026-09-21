from rest_framework import serializers
from sectors.models import Sector
from services.models import Service
from .models import Realisation, RealisationImage


class RealisationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealisationImage
        fields = "__all__"


class RealisationSerializer(serializers.ModelSerializer):
    images = RealisationImageSerializer(many=True, read_only=True)
    sector = serializers.SlugRelatedField(slug_field="name", queryset=Sector.objects.all())
    service = serializers.SlugRelatedField(
        slug_field="name", queryset=Service.objects.all(), required=False, allow_null=True
    )
    services = serializers.SlugRelatedField(
        slug_field="name", queryset=Service.objects.all(), many=True, required=False
    )

    class Meta:
        model = Realisation
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        names = list(data.get("services") or [])
        data["service"] = names[0] if names else data.get("service")
        return data

    def _sync_services(self, instance, services):
        instance.services.set(services)
        instance.service = services[0] if services else None
        instance.save(update_fields=["service"])

    def to_internal_value(self, data):
        if hasattr(data, "copy") and hasattr(data, "getlist"):
            data = data.copy()
            data.setlist("services", [name for name in data.getlist("services") if str(name).strip()])
        return super().to_internal_value(data)

    def _posted_services(self):
        """Liste M2M : distingue champ absent et liste vide (aucun service coché)."""
        raw = self.initial_data
        if raw is None:
            return None
        if hasattr(raw, "getlist"):
            if "services" not in raw:
                return None
            names = [name for name in raw.getlist("services") if str(name).strip()]
            return list(Service.objects.filter(name__in=names))
        if isinstance(raw, dict) and "services" in raw:
            value = raw.get("services") or []
            if isinstance(value, str):
                value = [value]
            names = [str(name).strip() for name in value if str(name).strip()]
            return list(Service.objects.filter(name__in=names))
        return None

    def create(self, validated_data):
        posted = self._posted_services()
        services = posted if posted is not None else validated_data.pop("services", [])
        validated_data.pop("services", None)
        instance = super().create(validated_data)
        if services:
            self._sync_services(instance, services)
        elif instance.service:
            instance.services.set([instance.service])
        return instance

    def update(self, instance, validated_data):
        posted = self._posted_services()
        validated_data.pop("services", None)
        instance = super().update(instance, validated_data)
        if posted is not None:
            self._sync_services(instance, posted)
        return instance
