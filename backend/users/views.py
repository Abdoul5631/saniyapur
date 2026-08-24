from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .models import Profile
from .serializers import UserSerializer

User = get_user_model()


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = getattr(getattr(user, "profile", None), "role", Profile.Role.ADMIN if user.is_superuser else Profile.Role.EDITOR)
        return Response({"username": user.username, "email": user.email, "role": role, "is_superuser": user.is_superuser})


class UserViewSet(ModelViewSet):
    """Réservé aux administrateurs : gestion des comptes du panneau d’administration."""
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    queryset = User.objects.select_related("profile").order_by("username")
