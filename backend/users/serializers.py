from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Profile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=Profile.Role.choices, source="profile.role", default=Profile.Role.EDITOR)
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "role", "is_active", "date_joined", "last_login", "password")
        read_only_fields = ("date_joined", "last_login")

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", {})
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password:
            validate_password(password, user)
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        Profile.objects.filter(user=user).update(role=profile_data.get("role", Profile.Role.EDITOR))
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", None)
        password = validated_data.pop("password", None)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        if password:
            validate_password(password, instance)
            instance.set_password(password)
        instance.save()
        if profile_data and "role" in profile_data:
            Profile.objects.update_or_create(user=instance, defaults={"role": profile_data["role"]})
        return instance
