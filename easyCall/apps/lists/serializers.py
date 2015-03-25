from rest_framework import serializers
from easyCall.apps.lists.models import ListType


class ListTypeSerializer(serializers.ModelSerializer):
    results = serializers.StringRelatedField(many=True)

    class Meta:
        model = ListType
        fields = ('slug', 'display_name', 'results')
