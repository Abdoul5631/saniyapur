import hashlib
import json
import re
from datetime import timedelta
from urllib.parse import urlparse

from django.conf import settings
from django.db.models import Count
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import PageView

BOT_PATTERN = re.compile(r"bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|curl|wget|python|headless|lighthouse", re.I)
IGNORED_PREFIXES = ("/admin", "/api", "/_next")

SOURCES = (
    ("Recherche", ("google.", "bing.", "yahoo.", "duckduckgo.", "ecosia.", "qwant.")),
    ("Facebook / Instagram", ("facebook.", "fb.", "instagram.", "l.messenger.")),
    ("WhatsApp", ("whatsapp.", "wa.me", "l.wl.co")),
    ("LinkedIn", ("linkedin.", "lnkd.in")),
)


class PageViewThrottle(AnonRateThrottle):
    scope = "pageview"
    rate = "120/min"


def client_ip(request) -> str:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
    return forwarded.split(",")[0].strip() if forwarded else request.META.get("REMOTE_ADDR", "")


def source_from_referrer(referrer: str) -> str:
    host = (urlparse(referrer).hostname or "").lower() if referrer else ""
    if not host:
        return "Direct"
    for label, needles in SOURCES:
        if any(needle in host for needle in needles):
            return label
    return "Autre site"


class TrackView(APIView):
    """Enregistre une page vue. Public, sans cookie, sans IP stockée."""

    authentication_classes: list = []
    permission_classes = [permissions.AllowAny]
    throttle_classes = [PageViewThrottle]

    def post(self, request):
        try:
            payload = json.loads(request.body[:2000] or b"{}")
            path = str(payload.get("path", "")).split("?")[0].split("#")[0][:300]
        except (ValueError, AttributeError):
            return HttpResponse(status=204)
        agent = request.META.get("HTTP_USER_AGENT", "")
        if not path.startswith("/") or path.startswith(IGNORED_PREFIXES) or not agent or BOT_PATTERN.search(agent):
            return HttpResponse(status=204)
        today = timezone.localdate()
        digest = hashlib.sha256(f"{settings.SECRET_KEY}|{today}|{client_ip(request)}|{agent}".encode()).hexdigest()[:32]
        source = source_from_referrer(str(payload.get("referrer", ""))[:500]) if payload.get("entry") else ""
        PageView.objects.create(date=today, path=path, visitor=digest, source=source)
        return HttpResponse(status=204)


def _totals(queryset) -> dict:
    return queryset.aggregate(views=Count("id"), visitors=Count("visitor", distinct=True))


class SummaryView(APIView):
    """Statistiques de visites — réservées aux administrateurs."""

    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        try:
            days = min(max(int(request.query_params.get("days", 30)), 7), 90)
        except ValueError:
            days = 30
        today = timezone.localdate()
        start = today - timedelta(days=days - 1)
        window = PageView.objects.filter(date__gte=start)

        per_day = {row["date"]: row for row in window.values("date").annotate(views=Count("id"), visitors=Count("visitor", distinct=True))}
        daily = []
        for offset in range(days):
            day = start + timedelta(days=offset)
            row = per_day.get(day, {})
            daily.append({"date": day.isoformat(), "views": row.get("views", 0), "visitors": row.get("visitors", 0)})

        def period(first_day, last_day=None):
            qs = PageView.objects.filter(date__gte=first_day)
            if last_day:
                qs = qs.filter(date__lte=last_day)
            return _totals(qs)

        return Response({
            "days": days,
            "today": period(today),
            "yesterday": period(today - timedelta(days=1), today - timedelta(days=1)),
            "last_7": period(today - timedelta(days=6)),
            "last_30": period(today - timedelta(days=29)),
            "range": _totals(window),
            "daily": daily,
            "top_pages": list(window.values("path").annotate(views=Count("id"), visitors=Count("visitor", distinct=True)).order_by("-views", "path")[:10]),
            "sources": list(window.exclude(source="").values("source").annotate(visits=Count("id")).order_by("-visits")),
        })
