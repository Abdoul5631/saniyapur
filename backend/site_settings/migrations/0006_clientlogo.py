from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("site_settings", "0005_sitesettings_homepage_stats"),
    ]

    operations = [
        migrations.CreateModel(
            name="ClientLogo",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("image", models.ImageField(upload_to="settings/client-logos/")),
                (
                    "name",
                    models.CharField(
                        blank=True,
                        help_text="Nom du client (accessibilité). Laisser vide si vous préférez.",
                        max_length=160,
                    ),
                ),
                ("order", models.PositiveIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "Logo client",
                "verbose_name_plural": "Logos clients",
                "ordering": ["order", "id"],
            },
        ),
    ]
