from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("team", "0002_teammember_phone_alter_teammember_bio_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="TeamGallerySettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(default="Galerie de l’équipe", max_length=200)),
                (
                    "description",
                    models.TextField(
                        blank=True,
                        help_text="Message descriptif affiché au-dessus des photos sur le site public.",
                    ),
                ),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Paramètres de la galerie équipe",
                "verbose_name_plural": "Paramètres de la galerie équipe",
            },
        ),
        migrations.CreateModel(
            name="TeamGalleryPhoto",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("image", models.ImageField(upload_to="team/gallery/")),
                ("caption", models.CharField(blank=True, max_length=255)),
                ("order", models.PositiveIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["order", "id"],
                "verbose_name": "Photo de la galerie équipe",
                "verbose_name_plural": "Photos de la galerie équipe",
            },
        ),
    ]
