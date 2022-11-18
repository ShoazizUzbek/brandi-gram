from rest_framework.response import Response
from rest_framework.views import APIView

from post.models import Tag


class TagView(APIView):
    def get(self, request):
        category_list = Tag.objects.all().values('id', 'name')
        return Response(data=category_list)