from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .models import TeamGalleryPhoto, TeamGallerySettings, TeamMember
from .serializers import (
    TeamGalleryPhotoSerializer,
    TeamGallerySettingsSerializer,
    TeamMemberSerializer,
)


class TeamMemberViewSet(ModelViewSet):
    serializer_class = TeamMemberSerializer
    pagination_class = None

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return TeamMember.objects.all()
        return TeamMember.objects.filter(published=True)


class TeamGallerySettingsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        return Response(
            TeamGallerySettingsSerializer(TeamGallerySettings.load(), context={"request": request}).data
        )

    def patch(self, request):
        instance = TeamGallerySettings.load()
        serializer = TeamGallerySettingsSerializer(
            instance, data=request.data, partial=True, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class TeamGalleryPhotoViewSet(ModelViewSet):
    serializer_class = TeamGalleryPhotoSerializer
    queryset = TeamGalleryPhoto.objects.all()
    pagination_class = None
