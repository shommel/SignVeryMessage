# Generated by Django 3.2.9 on 2021-11-24 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='GeneratedURL',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=200)),
                ('minutes_valid_for', models.IntegerField(default=5)),
                ('create_timestamp', models.DateField()),
                ('challenge_message', models.CharField(max_length=200)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.useraccount')),
            ],
        ),
    ]
