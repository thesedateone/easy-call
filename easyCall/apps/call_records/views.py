import pytz

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from django.http import Http404
from django.db import transaction
from django.db import OperationalError
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings

from easyCall.apps.call_records.models import CallRecord
from easyCall.apps.call_records.models import QueueEntry
from easyCall.apps.call_records.models import UserNote
from easyCall.apps.call_records.models import Call
from easyCall.apps.lists.models import CallResult
from easyCall.apps.call_records.importer import populate_queue
from easyCall.apps.call_records.serializers import CallRecordSerializer
from easyCall.apps.call_records.serializers import UserNoteSerializer
from easyCall.apps.call_records.serializers import SystemNoteSerializer
from easyCall.apps.call_records.serializers import CallRecordExtraSerializer
from easyCall.apps.call_records.serializers import CallSerializer


class UserNoteList(APIView):

    """Retrieve all the user created notes for a CallRecord. """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, call_pk, format=None):
        call_record = self._get_call_object(call_pk)
        notes = UserNote.objects.filter(call_record=call_record)
        serializer = UserNoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request, call_pk, format=None):
        call_record = self._get_call_object(call_pk)
        data = request.data
        data["call_record"] = call_record.pk
        data["creator"] = request.user.id
        print(data)
        serializer = UserNoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _get_call_object(self, call_pk):
        try:
            return CallRecord.objects.get(pk=call_pk)
        except CallRecord.DoesNotExist:
            raise Http404


class UserNoteDetail(APIView):

    """Retrieve, update or delete a UserNote instance. """

    permission_classes = (permissions.IsAuthenticated,)

    def _get_object(self, pk):
        try:
            return UserNote.objects.get(pk=pk)
        except UserNote.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        note = self._get_object(pk)
        serializer = UserNoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        note = self._get_object(pk)
        data = request.data
        data["creator"] = request.user.id
        serializer = UserNoteSerializer(note, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        note = self._get_object(pk)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SystemNoteDetail(APIView):

    """Get and update system notes for a CallRecord. """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, call_pk, format=None):
        notes = self._get_object(call_pk)
        serializer = SystemNoteSerializer(notes)
        return Response(serializer.data)

    def put(self, request, call_pk, format=None):
        notes = self._get_object(call_pk)
        data = request.data
        serializer = SystemNoteSerializer(notes, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _get_object(self, call_pk):
        try:
            return CallRecord.objects.get(pk=call_pk).systemnotes
        except CallRecord.DoesNotExist:
            raise Http404


class CallRecordList(APIView):

    """Retrieve all CallRecords with optional queryparam. """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        searchstring = self.request.QUERY_PARAMS.get('search', None)
        call_records = CallRecord.objects.all()
        if searchstring:
            call_records = CallRecord.objects.filter(
                serial_number__startswith=searchstring)
        serializer = CallRecordSerializer(call_records, many=True)
        return Response(serializer.data)


class CallRecordDetail(APIView):

    """Retrieve details of a CallRecord. """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, format=None):
        record = self._get_object(pk)
        serializer = CallRecordSerializer(record)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        record = self._get_object(pk)
        data = request.data
        serializer = CallRecordSerializer(record, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _get_object(self, pk):
        try:
            return CallRecord.objects.get(pk=pk)
        except CallRecord.DoesNotExist:
            raise Http404


class CallRecordExtraDetail(APIView):

    """Retrieve details of a CallRecord. """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, call_pk, format=None):
        extra = self._get_object(call_pk)
        serializer = CallRecordExtraSerializer(extra)
        return Response(serializer.data)

    def _get_object(self, pk):
        try:
            return CallRecord.objects.get(pk=pk).extrainformation
        except CallRecord.DoesNotExist:
            raise Http404


class CallDetail(APIView):

    """Retrieve details of Call. """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, format=None):
        call = self._get_object(pk)
        serializer = CallSerializer(call)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        timezone.activate(pytz.timezone(settings.TIME_ZONE))
        call = self._get_object(pk)
        data = request.data
        result, result_cat = self._get_result(data, call)
        data['result'] = result
        data['end_time'] = timezone.now()
        serializer = CallSerializer(call, data=data)
        if serializer.is_valid():
            serializer.save()
            call.call_record.update_status(result_cat)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _get_result(self, data, call):
        result_in = data['result']
        if result_in == "Next":
            return ("Next", CallResult.INCOMPLETE)
        try:
            list_type = call.call_record.list_type
            result = CallResult.objects.get(display_name=result_in,
                                            list_type=list_type)
            return (result.display_name, result.category)
        except CallResult.DoesNotExist:
            raise Http404

    def _get_object(self, pk):
        try:
            return Call.objects.get(pk=pk)
        except Call.DoesNotExist:
            raise Http404


class NextCallRecord(APIView):

    """Retrieve the next record of the specified type."""

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, list_type, format=None):
        record = self._get_object(list_type)
        caller = User.objects.get(id=request.user.id)
        call = Call(call_record=record, caller=caller)
        call.save()
        print(call.id)
        serializer = CallRecordSerializer(record)
        return Response(serializer.data)

    def _get_object(self, list_type):
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
