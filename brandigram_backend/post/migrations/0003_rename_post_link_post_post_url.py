# Generated by Django 4.1.3 on 2022-11-17 11:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='post_link',
            new_name='post_url',
        ),
    ]