from rest_framework import serializers


class PostSerializer(serializers.Serializer):
    post_url = serializers.URLField()
    profile_id = serializers.IntegerField()
    price = serializers.IntegerField()
    description = serializers.CharField()
    tags = serializers.ListSerializer(child=serializers.IntegerField())
