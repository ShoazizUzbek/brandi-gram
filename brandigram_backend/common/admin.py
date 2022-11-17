from django.contrib import admin

from common.models import Category
from post.models import Tag


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', )


admin.site.register(Category, CategoryAdmin)

class TagAdmin(admin.ModelAdmin):
    list_display = ('name', )


admin.site.register(Tag, TagAdmin)