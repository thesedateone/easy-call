from rest_framework import serializers
from easyCall.apps.lists.models import ListType, CallResult


class ListTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListType
        fields = ('slug', 'display_name')


class CallResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallResult
        fields = ('display_name', 'deactivated')
