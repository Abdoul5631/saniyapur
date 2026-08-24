from django.db import models
from rest_framework import mixins, permissions, viewsets
from .models import ContactRequest
from .serializers import ContactRequestSerializer
class ContactRequestViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = ContactRequestSerializer; pagination_class = None
    def get_permissions(self): return [permissions.AllowAny()] if self.action == "create" else [permissions.IsAdminUser()]
    def get_queryset(self):
        queryset = ContactRequest.objects.all()
        params = self.request.query_params
        q = params.get("q")
        if q: queryset = queryset.filter(models.Q(name__icontains=q) | models.Q(company__icontains=q) | models.Q(email__icontains=q) | models.Q(subject__icontains=q))
        processed = params.get("processed")
        if processed is not None: queryset = queryset.filter(processed=processed.lower() == "true")
        return queryset
