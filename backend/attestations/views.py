from rest_framework import permissions, viewsets
from .models import Attestation
from .serializers import AttestationSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class AttestationViewSet(viewsets.ModelViewSet):
    queryset = Attestation.objects.all()
    serializer_class = AttestationSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "pk"

    def get_queryset(self):
        qs = Attestation.objects.all()
        # Seuls les administrateurs voient les brouillons
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(published=True)

        type_filter = self.request.query_params.get("type")
        if type_filter:
            qs = qs.filter(type=type_filter)

        featured = self.request.query_params.get("featured")
        if featured == "true":
            qs = qs.filter(featured=True)

        return qs
