from rest_framework import serializers
from .models import QuoteRequest
class QuoteRequestSerializer(serializers.ModelSerializer):
    """Utilisé pour la création publique et la lecture : le statut et les notes internes ne sont pas modifiables ici."""
    class Meta: model = QuoteRequest; fields = "__all__"; read_only_fields = ("status", "notes", "created_at")
class QuoteRequestAdminSerializer(serializers.ModelSerializer):
    """Réservé aux actions admin (update) : statut et notes internes deviennent modifiables."""
    class Meta: model = QuoteRequest; fields = "__all__"; read_only_fields = ("created_at",)
