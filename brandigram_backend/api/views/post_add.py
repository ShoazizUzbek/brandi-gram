import tempfile

import requests
from django.core import files
from django.db import transaction
from drf_yasg.utils import swagger_auto_schema
from instagrapi import Client
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers.post import PostSerializer
from post.models import Post, Tag


class PostView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_image(self, profile_picture):
        response = requests.get(profile_picture, stream=True)

        file_name = profile_picture.split('/')[-1] + '.jpg'

        lf = tempfile.NamedTemporaryFile()

        for block in response.iter_content(1024 * 8):

            if not block:
                break

            # Write image block to temporary file
            lf.write(block)
        return file_name, lf

    @swagger_auto_schema(request_body=PostSerializer)
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        tags = validated_data.pop('tags')
        with transaction.atomic():
            post = Post.objects.create(**validated_data)
            tags_list = Tag.objects.filter(id__in=tags)
            post.tags.set(tags_list)
            #scrape image post.image = ....
            post_url = validated_data.get('post_url')
            profile = Client()
            profile.login("brandigram.uz", "newkhantigr1998")
            media_id = profile.media_pk_from_url(post_url)
            media = profile.media_info(media_id)
            caption_text = media.caption_text
            resource = media.resources[0]
            thumbnail_url = resource.thumbnail_url
            file_name, lf = self.get_image(thumbnail_url)
            post.post_image.save(file_name, files.File(lf))
            post.post_title = caption_text
            post.save()
        return Response(data={'success': True})
