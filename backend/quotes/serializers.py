from rest_framework import serializers
from .models import QuoteRequest


class QuoteRequestSerializer(serializers.ModelSerializer):
    """Utilisé pour la création publique : statut et notes internes non modifiables."""

    class Meta:
        model = QuoteRequest
        fields = "__all__"
        read_only_fields = ("status", "notes", "created_at")


class QuoteRequestAdminSerializer(serializers.ModelSerializer):
    """Réservé aux actions admin : statut et notes internes modifiables."""

    class Meta:
        model = QuoteRequest
        fields = "__all__"
        read_only_fields = ("created_at",)
