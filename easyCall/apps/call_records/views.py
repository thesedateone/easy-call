from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.http import Http404
from django.db import transaction
from django.db import OperationalError

from easyCall.apps.call_records.models import CallRecord
from easyCall.apps.call_records.models import QueueEntry
from easyCall.apps.lists.models import ListType
from easyCall.apps.call_records.importer import populate_queue
from easyCall.apps.call_records.serializers import CallRecordSerializer


class CallRecordDetail(APIView):

    """Retrieve details of a CallRecord. """

    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return CallRecord.objects.get(pk=pk)
        except CallRecord.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        record = self.get_object(pk)
        serializer = CallRecordSerializer(record)
        return Response(serializer.data)


class NextCallRecord(APIView):

    """Retrieve the next record of the specified type."""

    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, list_type):
        while True:
            try:
                with transaction.atomic():
                    # lock the queue entry
                    entry = QueueEntry.objects.filter(
                        list_type=list_type).select_for_update()[0:1].get()
                    record = entry.call_record
                    # delete the queue entry
                    entry.delete()
                    return record
            except OperationalError:
                # kind of expected, try again
                pass
            except QueueEntry.DoesNotExist:
                could_repopulate = populate_queue()
                if not could_repopulate:
                    raise Http404

    def get(self, request, list_type, format=None):
        record = self.get_object(list_type)
        serializer = CallRecordSerializer(record)
        return Response(serializer.data)
