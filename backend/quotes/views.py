from django.db import models
from rest_framework import mixins, permissions, viewsets
from .models import QuoteRequest
from .serializers import QuoteRequestAdminSerializer, QuoteRequestSerializer
class QuoteRequestViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    pagination_class = None
    def get_permissions(self): return [permissions.AllowAny()] if self.action == "create" else [permissions.IsAdminUser()]
    def get_serializer_class(self): return QuoteRequestSerializer if self.action == "create" else QuoteRequestAdminSerializer
    def get_queryset(self):
        queryset = QuoteRequest.objects.all()
        params = self.request.query_params
        q = params.get("q")
        if q: queryset = queryset.filter(models.Q(name__icontains=q) | models.Q(organisation__icontains=q) | models.Q(email__icontains=q))
        status = params.get("status")
        if status: queryset = queryset.filter(status=status)
        service = params.get("service")
        if service: queryset = queryset.filter(service=service)
        return queryset
