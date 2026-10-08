from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("site_settings", "0006_clientlogo"),
    ]

    operations = [
        migrations.AddField(
            model_name="aboutsettings",
            name="social_commitment_image",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to="about/",
                verbose_name="Photo page Engagement social",
            ),
        ),
    ]
