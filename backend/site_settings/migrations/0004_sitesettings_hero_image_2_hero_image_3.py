from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("site_settings", "0003_remove_aboutsettings_expertise_content_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="sitesettings",
            name="hero_image_2",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to="settings/",
                verbose_name="Image hero 2",
            ),
        ),
        migrations.AddField(
            model_name="sitesettings",
            name="hero_image_3",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to="settings/",
                verbose_name="Image hero 3",
            ),
        ),
        migrations.AlterField(
            model_name="sitesettings",
            name="hero_image",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to="settings/",
                verbose_name="Image hero 1",
            ),
        ),
    ]
