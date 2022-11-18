import re
import tempfile

import requests
from django.core import files
from django.db import transaction
from drf_yasg.utils import swagger_auto_schema
from instagrapi import Client

from instascrape import Profile
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers.profile import UserSerializer
from common.models import Category
from user.models import User


class RegistrationView(APIView):

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

    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        password = validated_data.pop('password')
        category = validated_data.pop('category')
        if User.objects.filter(phone_number=validated_data['phone_number']).exists():
            raise APIException('This phone number already exists')
        with transaction.atomic():
            user = User.objects.create_user(password=password, **validated_data)
            category_list = Category.objects.filter(id__in=category)
            user.category.set(category_list)
            profile_url = validated_data.get('profile_url')
            result = re.search('https://www.instagram.com/(.*)/', profile_url)
            username = result.group(1)

            profile = Client()
            profile.login("brandigram.uz", "newkhantigr1998")

            user_insta = profile.user_info_by_username(username)
            profile_pic_url = user_insta.profile_pic_url
            file_name, lf = self.get_image(profile_pic_url)
            user.profile_picture.save(file_name, files.File(lf))
            user.followers = user_insta.follower_count
            user.instagram_category = user_insta.category_name
            user.username = username
            user.save()

        return Response(data={'success': True})




