from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SiteSettings, AboutSettings
from .serializers import SiteSettingsSerializer, AboutSettingsSerializer


class SiteSettingsView(APIView):
    """Singleton : GET public, PATCH réservé aux utilisateurs authentifiés."""
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        return Response(SiteSettingsSerializer(SiteSettings.load(), context={"request": request}).data)

    def patch(self, request):
        instance = SiteSettings.load()
        serializer = SiteSettingsSerializer(instance, data=request.data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class AboutSettingsView(APIView):
    """Singleton : GET public, PATCH réservé aux utilisateurs authentifiés pour la page À propos."""
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        return Response(AboutSettingsSerializer(AboutSettings.load(), context={"request": request}).data)

    def patch(self, request):
        instance = AboutSettings.load()
        serializer = AboutSettingsSerializer(instance, data=request.data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
