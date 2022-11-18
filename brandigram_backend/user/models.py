from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from user.managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=75, default="" )
    last_name = models.CharField(max_length=75, default="")
    phone_number = models.CharField(max_length=12,unique=True)
    profile_url = models.URLField()
    instagram_category = models.CharField(default="", max_length=255, null=True)

    category = models.ManyToManyField('common.Category', related_name='profiles' )

    profile_picture = models.ImageField(null=True)
    followers = models.IntegerField(default=0)
    username = models.CharField(max_length=255, null=True, )

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'phone_number'

    objects = CustomUserManager()

    # class Meta:
        # permissions = [
        #     ('can_see_all_clients', 'User can see all clients\' information'),
        # ]

    def __str__(self):
        return f'{self.phone_number} - {self.first_name} {self.last_name}'
