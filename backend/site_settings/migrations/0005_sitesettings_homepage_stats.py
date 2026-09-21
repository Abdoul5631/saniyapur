from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("site_settings", "0004_sitesettings_hero_image_2_hero_image_3"),
    ]

    operations = [
        migrations.AddField(model_name="sitesettings", name="stats_since_year", field=models.PositiveIntegerField(default=2009)),
        migrations.AddField(model_name="sitesettings", name="stat_1_value", field=models.PositiveIntegerField(default=15)),
        migrations.AddField(model_name="sitesettings", name="stat_1_suffix", field=models.CharField(default="+", max_length=8)),
        migrations.AddField(model_name="sitesettings", name="stat_1_label", field=models.CharField(default="Années d'expérience", max_length=80)),
        migrations.AddField(model_name="sitesettings", name="stat_1_description", field=models.CharField(default="Expertise terrain éprouvée", max_length=120)),
        migrations.AddField(model_name="sitesettings", name="stat_2_value", field=models.PositiveIntegerField(default=500)),
        migrations.AddField(model_name="sitesettings", name="stat_2_suffix", field=models.CharField(default="+", max_length=8)),
        migrations.AddField(model_name="sitesettings", name="stat_2_label", field=models.CharField(default="Clients servis", max_length=80)),
        migrations.AddField(model_name="sitesettings", name="stat_2_description", field=models.CharField(default="Santé, industrie, hôtellerie", max_length=120)),
        migrations.AddField(model_name="sitesettings", name="stat_3_value", field=models.PositiveIntegerField(default=7)),
        migrations.AddField(model_name="sitesettings", name="stat_3_suffix", field=models.CharField(blank=True, default="", max_length=8)),
        migrations.AddField(model_name="sitesettings", name="stat_3_label", field=models.CharField(default="Domaines d'intervention", max_length=80)),
        migrations.AddField(model_name="sitesettings", name="stat_3_description", field=models.CharField(default="Bionettoyage, décapage & plus", max_length=120)),
        migrations.AddField(model_name="sitesettings", name="stat_4_value", field=models.PositiveIntegerField(default=100)),
        migrations.AddField(model_name="sitesettings", name="stat_4_suffix", field=models.CharField(default="%", max_length=8)),
        migrations.AddField(model_name="sitesettings", name="stat_4_label", field=models.CharField(default="Produits biodégradables", max_length=80)),
        migrations.AddField(model_name="sitesettings", name="stat_4_description", field=models.CharField(default="FDS certifiées, conformité totale", max_length=120)),
        migrations.AddField(model_name="sitesettings", name="stat_5_value", field=models.PositiveIntegerField(default=24)),
        migrations.AddField(model_name="sitesettings", name="stat_5_suffix", field=models.CharField(default="/7", max_length=8)),
        migrations.AddField(model_name="sitesettings", name="stat_5_label", field=models.CharField(default="Disponibilité opérationnelle", max_length=80)),
        migrations.AddField(model_name="sitesettings", name="stat_5_description", field=models.CharField(default="Interventions d'urgence possibles", max_length=120)),
    ]
