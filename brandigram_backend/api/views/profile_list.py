from rest_framework.response import Response
from rest_framework.views import APIView

from user.models import User


class ProfileListView(APIView):

    def get(self, request):
        query_params = dict(request.query_params)
        category = []
        category_data = query_params.get('category_id')
        if category_data:
            category.append(category_data[0])
            profiles = User.objects.prefetch_related('posts', 'category').filter(category__in=category)
        else:
            profiles = User.objects.prefetch_related('posts', 'category').all()

        data = []
        for profile in profiles:
            post_data = []
            category_data = []
            profile_picture = None
            index = 0
            for post in profile.posts.all():
                if index > 2:
                    break
                if post.post_image:
                    post_data.append(post.post_image.url)
                    index += 1

            if profile.profile_picture:
                profile_picture = profile.profile_picture.url

            for category in profile.category.all():
                category_data.append(category.name)

            data.append({
                'id': profile.pk,
                'username': profile.username,
                'followers': profile.followers,
                'profile_picture': profile_picture,
                'category': category_data,
                'posts': post_data
            })
        return Response(data=data)

