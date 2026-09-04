from rest_framework import serializers
from .models import Attestation


class AttestationSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source="get_type_display", read_only=True)

    class Meta:
        model = Attestation
        fields = "__all__"
