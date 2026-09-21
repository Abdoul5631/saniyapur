from django.db import models
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Realisation, RealisationImage
from .serializers import RealisationImageSerializer, RealisationSerializer


class RealisationViewSet(ModelViewSet):
    serializer_class = RealisationSerializer
    lookup_field = "slug"
    pagination_class = None

    def get_queryset(self):
        queryset = Realisation.objects.select_related("sector", "service").prefetch_related("images", "services")
        queryset = queryset if self.request.user.is_authenticated else queryset.filter(published=True)
        params = self.request.query_params
        q = params.get("q")
        if q:
            queryset = queryset.filter(models.Q(title__icontains=q) | models.Q(client__icontains=q))
        client = params.get("client")
        if client:
            queryset = queryset.filter(client__iexact=client)
        sector = params.get("sector")
        if sector:
            queryset = queryset.filter(sector__name=sector)
        location = params.get("location")
        if location:
            queryset = queryset.filter(location__icontains=location)
        published = params.get("published")
        if published is not None:
            queryset = queryset.filter(published=published.lower() == "true")
        featured = params.get("featured")
        if featured is not None:
            queryset = queryset.filter(featured=featured.lower() == "true")
        return queryset

    @action(detail=False, methods=["get"])
    def clients(self, request):
        qs = Realisation.objects.exclude(client="").order_by("client")
        if not request.user.is_authenticated:
            qs = qs.filter(published=True)
        return Response(list(qs.values_list("client", flat=True).distinct()))
class RealisationImageViewSet(ModelViewSet):
    serializer_class = RealisationImageSerializer
    queryset = RealisationImage.objects.select_related("realisation")
    pagination_class = None

    def _demote_other_main_images(self, instance):
        if instance.type == RealisationImage.ImageType.MAIN:
            RealisationImage.objects.filter(realisation=instance.realisation, type=RealisationImage.ImageType.MAIN).exclude(pk=instance.pk).update(type=RealisationImage.ImageType.GALLERY)

    def perform_create(self, serializer):
        instance = serializer.save()
        self._demote_other_main_images(instance)

    def perform_update(self, serializer):
        instance = serializer.save()
        self._demote_other_main_images(instance)
