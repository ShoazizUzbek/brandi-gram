from django.contrib import admin

# Register your models here.
from user.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'phone_number',)


admin.site.register(User, UserAdmin)