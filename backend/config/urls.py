from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from services.views import ServiceViewSet
from sectors.views import SectorViewSet
from realisations.views import RealisationImageViewSet, RealisationViewSet
from products.views import ProductImageViewSet, ProductViewSet
from news.views import NewsViewSet
from contacts.views import ContactRequestViewSet
from quotes.views import QuoteRequestViewSet
from users.views import MeView, UserViewSet
from site_settings.views import SiteSettingsView, AboutSettingsView
from team.views import TeamMemberViewSet
from attestations.views import AttestationViewSet

router = DefaultRouter()
router.register("services", ServiceViewSet, basename="service")
router.register("sectors", SectorViewSet, basename="sector")
router.register("realisations", RealisationViewSet, basename="realisation")
router.register("realisation-images", RealisationImageViewSet, basename="realisation-image")
router.register("users", UserViewSet, basename="user")
router.register("products", ProductViewSet, basename="product")
router.register("product-images", ProductImageViewSet, basename="product-image")
router.register("news", NewsViewSet, basename="news")
router.register("contacts", ContactRequestViewSet, basename="contact")
router.register("quotes", QuoteRequestViewSet, basename="quote")
router.register("team", TeamMemberViewSet, basename="team")
router.register("attestations", AttestationViewSet, basename="attestation")
urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/auth/me/", MeView.as_view(), name="token_me"),
    path("api/settings/", SiteSettingsView.as_view(), name="site_settings"),
    path("api/about/", AboutSettingsView.as_view(), name="about_settings"),
    path("api/", include(router.urls)),
]
if settings.DEBUG: urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
