from django.contrib import admin
from .models import SiteSettings, AboutSettings

admin.site.register(SiteSettings)
admin.site.register(AboutSettings)
