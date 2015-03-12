from rest_framework import serializers
from easyCall.apps.lists.models import ListType
from easyCall.apps.lists.models import ListType, CallResult


class ResultSerializer(serializers.ModelSerializer):

	class Meta:
		model = CallResult
		fields = ('display_name', 'category', 'deactivated')


class ListTypeSerializer(serializers.ModelSerializer):
    results = ResultSerializer(many=True, read_only=True)

    class Meta:
        model = ListType
        fields = ('slug', 'display_name', 'results')
