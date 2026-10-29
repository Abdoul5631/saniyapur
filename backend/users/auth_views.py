from rest_framework.throttling import AnonRateThrottle
from rest_framework_simplejwt.views import TokenObtainPairView


class LoginThrottle(AnonRateThrottle):
    scope = "login"


class ThrottledTokenObtainPairView(TokenObtainPairView):
    """Connexion JWT avec limite d'essais par adresse IP (protection contre le devinage de mot de passe)."""

    throttle_classes = [LoginThrottle]
