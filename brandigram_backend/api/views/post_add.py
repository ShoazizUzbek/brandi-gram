from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers.post import PostSerializer
from post.models import Post, Tag


class PostView(APIView):
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(request_body=PostSerializer)
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        tags = validated_data.pop('tags')
        post = Post.objects.create(**validated_data)
        tags_list = Tag.objects.filter(id__in=tags)
        post.tags.set(tags_list)
        #scrape image post.image = ....
        return Response(data={'success': True})
