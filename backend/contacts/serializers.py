from rest_framework import serializers
from .models import ContactRequest


class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = "__all__"
        read_only_fields = ("created_at",)
