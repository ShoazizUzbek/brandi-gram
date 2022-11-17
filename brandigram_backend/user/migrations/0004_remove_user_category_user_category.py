# Generated by Django 4.1.3 on 2022-11-17 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
        ('user', '0003_alter_user_followers_alter_user_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='category',
        ),
        migrations.AddField(
            model_name='user',
            name='category',
            field=models.ManyToManyField(related_name='profiles', to='common.category'),
        ),
    ]