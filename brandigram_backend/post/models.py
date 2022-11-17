from django.db import models

# Create your models here.
from common.models import BaseModel


class Tag(BaseModel):
    name = models.CharField(max_length=255, )


class Post(BaseModel):
    profile = models.ForeignKey(
        'user.User',
        on_delete=models.CASCADE,
        related_name='posts',
    )
    tags = models.ManyToManyField(Tag, related_name='tag_posts')
    post_url = models.URLField()
    post_image = models.ImageField()
    price = models.IntegerField()
    description = models.TextField(default="")