from django.db import migrations
from app.models import UserAccount


def create_user(apps, schema_editor):
    UserAccount.objects.get_or_create(username="test")


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_user)
    ]