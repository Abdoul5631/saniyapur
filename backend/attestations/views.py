from rest_framework import permissions, viewsets
from .models import Attestation
from .serializers import AttestationSerializer


class AttestationViewSet(viewsets.ModelViewSet):
    serializer_class = AttestationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "pk"
    pagination_class = None

    def get_queryset(self):
        qs = Attestation.objects.all()
        if not self.request.user.is_authenticated:
            qs = qs.filter(published=True)

        type_filter = self.request.query_params.get("type")
        if type_filter:
            qs = qs.filter(type=type_filter)

        featured = self.request.query_params.get("featured")
        if featured == "true":
            qs = qs.filter(featured=True)

        return qs
