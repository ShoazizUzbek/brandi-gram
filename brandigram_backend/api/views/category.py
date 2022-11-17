from rest_framework.response import Response
from rest_framework.views import APIView

from common.models import Category


class CategoryView(APIView):
    def get(self, request):
        category_list = Category.objects.all().values('id', 'name')
        return Response(data=category_list)