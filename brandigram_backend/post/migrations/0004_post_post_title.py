# Generated by Django 4.1.3 on 2022-11-18 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_rename_post_link_post_post_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='post_title',
            field=models.TextField(null=True),
        ),
    ]
