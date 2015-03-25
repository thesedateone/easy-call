from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.http import Http404

from easyCall.apps.lists.models import ListType
from easyCall.apps.lists.serializers import ListTypeSerializer


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

    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, slug):
        try:
            return ListType.objects.get(slug=slug)
        except ListType.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        list_type = self.get_object(slug)
        serializer = ListTypeSerializer(list_type)
        return Response(serializer.data)
