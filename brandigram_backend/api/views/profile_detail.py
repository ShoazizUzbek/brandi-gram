from rest_framework.response import Response
from rest_framework.views import APIView

from user.models import User


class ProfileDetailView(APIView):

    def get(self, request, pk):
        profile = User.objects.prefetch_related('posts', 'category').get(pk=pk)
        post_data = []
        category_data = []
        profile_picture = None
        for post in profile.posts.all():
            post_img = None
            if post.post_image:
                post_img = post.post_image.url
            post_data.append({
                'id': post.id,
                'post_url': post.post_url,
                'post_image': post_img,
                'price': post.price,
                'description': post.description,
                'title': post.post_title
            })

        if profile.profile_picture:
            profile_picture = profile.profile_picture.url

        for category in profile.category.all():
            category_data.append(category.name)

        data = {
            'id': profile.pk,
            'username': profile.username,
            'followers': profile.followers,
            'profile_picture': profile_picture,
            'category': category_data,
            'profile_url': profile.profile_url,
            'posts': post_data
        }
        return Response(data=data)

