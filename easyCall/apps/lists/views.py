from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.http import Http404

from easyCall.apps.lists.models import ListType, CallResult
from easyCall.apps.lists.serializers import ListTypeSerializer
from easyCall.apps.lists.serializers import CallResultSerializer


class ListTypeList(APIView):

    """
    List all list types.
    """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        list_types = ListType.objects.all()
        serializer = ListTypeSerializer(list_types, many=True)
        return Response(serializer.data)


class CallResultList(APIView):

    """
    Retrieve details of a list type.
    """

    permission_classes = (permissions.IsAuthenticated)

    def get_object(self, slug):
        try:
            list_type = ListType.objects.get(slug=slug)
            return CallResult.objects.filter(list_type=list_type)
        except ListType.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        call_results = self.get_object(slug)
        serializer = CallResultSerializer(call_results, many=True)
        return Response(serializer.data)
