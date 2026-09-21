from django.db import migrations, models


def copy_service_to_services(apps, schema_editor):
    Realisation = apps.get_model("realisations", "Realisation")
    for item in Realisation.objects.exclude(service_id=None):
        item.services.add(item.service_id)


class Migration(migrations.Migration):

    dependencies = [
        ("realisations", "0004_alter_realisation_slug"),
        ("services", "0002_alter_service_options_service_icon_service_order"),
    ]

    operations = [
        migrations.AddField(
            model_name="realisation",
            name="services",
            field=models.ManyToManyField(blank=True, related_name="linked_realisations", to="services.service"),
        ),
        migrations.RunPython(copy_service_to_services, migrations.RunPython.noop),
    ]
