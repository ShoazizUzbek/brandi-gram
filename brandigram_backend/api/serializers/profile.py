from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone_number = serializers.CharField()
    password = serializers.CharField()
    profile_url = serializers.URLField()
    category = serializers.ListSerializer(child=serializers.IntegerField())
