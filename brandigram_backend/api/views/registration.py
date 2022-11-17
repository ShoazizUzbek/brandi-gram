import re
import tempfile

import requests
from django.core import files
from django.db import transaction
from drf_yasg.utils import swagger_auto_schema

from instascrape import Profile
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers.profile import UserSerializer
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
        if User.objects.filter(phone_number=validated_data['phone_number']).exists():
            raise APIException('This phone number already exists')
        with transaction.atomic():
            user = User.objects.create_user(password=password, **validated_data)
            # profile_url = validated_data.get('profile_url')
            # result = re.search('https://www.instagram.com/(.*)/', profile_url)
            # session_id = '7134031422%3A3nLWvvbPlTvjgU%3A14%3AAYcCYaJXUWLIG3XqoCBnjG3fmaM1cnVWIgy7YY1hIug'
            # username = result.group(1)
            # ins_user = InstagramUser(username=username, sessionid=session_id)
            # print(ins_user)

            # session_id = '7134031422%3A3nLWvvbPlTvjgU%3A14%3AAYcCYaJXUWLIG3XqoCBnjG3fmaM1cnVWIgy7YY1hIug'
            # headers = {
            #     "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36 Edg/87.0.664.57",
            #     "cookie": f"sessionid={session_id};"}
            # result = re.search('https://www.instagram.com/(.*)/', profile_url)
            # username = result.group(1)
            #
            # profile = Profile(profile_url)
            # profile.scrape(headers=headers)
            # print(profile.to_dict())
            #
            # profile_pic_url = profile.profile_pic_url
            # print(profile_pic_url)
            # file_name, lf = self.get_image(profile_pic_url)
            #
            # user.profile_picture.save(file_name, files.File(lf))
            # user.username = username
            # user.save()

        return Response(data={'success': True})




