from django.db import models
from rest_framework.viewsets import ModelViewSet
from .models import Sector
from .serializers import SectorSerializer
class SectorViewSet(ModelViewSet):
    serializer_class = SectorSerializer; lookup_field = "slug"
    def get_queryset(self):
        queryset = Sector.objects.all() if self.request.user.is_authenticated else Sector.objects.filter(published=True)
        q = self.request.query_params.get("q")
        if q: queryset = queryset.filter(models.Q(name__icontains=q) | models.Q(description__icontains=q))
        published = self.request.query_params.get("published")
        if published is not None: queryset = queryset.filter(published=published.lower() == "true")
        return queryset
