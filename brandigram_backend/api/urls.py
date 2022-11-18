from django.urls import path

from api.views.category import CategoryView
from api.views.login import MyTokenObtainPairView
from api.views.post_add import PostView
from api.views.profile_detail import ProfileDetailView
from api.views.profile_list import ProfileListView
from api.views.registration import RegistrationView
from api.views.tag import TagView

urlpatterns = [
    path('registration', RegistrationView.as_view(), name='user_registration'),
    path('login', MyTokenObtainPairView.as_view(), name='user_login'),
    path('profile/list', ProfileListView.as_view(), name='profile_list'),
    path('profile/detail/<int:pk>', ProfileDetailView.as_view(), name='profile_detail'),
    path('category', CategoryView.as_view(), name='category_list'),
    path('tag', TagView.as_view(), name='tag_list'),
    path('post/create', PostView.as_view(), name='post_create'),

]