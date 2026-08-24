from django.db import models
from rest_framework.viewsets import ModelViewSet
from .models import Service
from .serializers import ServiceSerializer
class ServiceViewSet(ModelViewSet):
    serializer_class = ServiceSerializer
    lookup_field = "slug"
    def get_queryset(self):
        queryset = Service.objects.all() if self.request.user.is_authenticated else Service.objects.filter(published=True)
        q = self.request.query_params.get("q")
        if q: queryset = queryset.filter(models.Q(name__icontains=q) | models.Q(short_description__icontains=q))
        published = self.request.query_params.get("published")
        if published is not None: queryset = queryset.filter(published=published.lower() == "true")
        return queryset
