from django.db import models
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet
from .models import Product, ProductImage
from .serializers import ProductImageSerializer, ProductSerializer


class ProductPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = "page_size"
    max_page_size = 100


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = "slug"
    pagination_class = ProductPagination

    def get_queryset(self):
        queryset = Product.objects.prefetch_related("gallery").all() if self.request.user.is_authenticated else Product.objects.prefetch_related("gallery").filter(published=True)
        params = self.request.query_params
        q = params.get("q")
        if q:
            queryset = queryset.filter(models.Q(name__icontains=q) | models.Q(reference__icontains=q) | models.Q(category__icontains=q))
        category = params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        published = params.get("published")
        if published is not None:
            queryset = queryset.filter(published=published.lower() == "true")
        return queryset


class ProductImageViewSet(ModelViewSet):
    serializer_class = ProductImageSerializer
    queryset = ProductImage.objects.select_related("product")

