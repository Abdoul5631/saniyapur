from django.db import models
from rest_framework.viewsets import ModelViewSet
from .models import NewsArticle
from .serializers import NewsArticleSerializer
class NewsViewSet(ModelViewSet):
    serializer_class = NewsArticleSerializer; lookup_field = "slug"
    def get_queryset(self):
        queryset = NewsArticle.objects.all() if self.request.user.is_authenticated else NewsArticle.objects.filter(published=True)
        q = self.request.query_params.get("q")
        if q: queryset = queryset.filter(models.Q(title__icontains=q) | models.Q(excerpt__icontains=q))
        published = self.request.query_params.get("published")
        if published is not None: queryset = queryset.filter(published=published.lower() == "true")
        return queryset
