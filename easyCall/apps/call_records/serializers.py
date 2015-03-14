from rest_framework import serializers

from easyCall.apps.call_records.models import CallRecord
from easyCall.apps.call_records.models import UserNote
from easyCall.apps.call_records.models import SystemNotes
from easyCall.apps.call_records.models import ExtraInformation
from easyCall.apps.call_records.models import Call


class CallRecordSerializer(serializers.ModelSerializer):
    call = serializers.CharField(source='get_current_call',
                                 allow_null=True, read_only=True)
    list_type_display = serializers.CharField(allow_null=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display',
                                           allow_null=True, read_only=True)

    class Meta:
        model = CallRecord
        read_only_fields = ('list_type', 'serial_number', 'status')


class CallRecordExtraSerializer(serializers.ModelSerializer):
    field1_display = serializers.CharField(allow_null=True, read_only=True)
    field2_display = serializers.CharField(allow_null=True, read_only=True)
    field3_display = serializers.CharField(allow_null=True, read_only=True)
    field4_display = serializers.CharField(allow_null=True, read_only=True)
    field5_display = serializers.CharField(allow_null=True, read_only=True)
    field6_display = serializers.CharField(allow_null=True, read_only=True)
    field7_display = serializers.CharField(allow_null=True, read_only=True)
    field8_display = serializers.CharField(allow_null=True, read_only=True)
    field9_display = serializers.CharField(allow_null=True, read_only=True)
    field10_display = serializers.CharField(allow_null=True, read_only=True)
    field11_display = serializers.CharField(allow_null=True, read_only=True)
    field12_display = serializers.CharField(allow_null=True, read_only=True)
    field13_display = serializers.CharField(allow_null=True, read_only=True)
    field14_display = serializers.CharField(allow_null=True, read_only=True)
    field15_display = serializers.CharField(allow_null=True, read_only=True)
    field16_display = serializers.CharField(allow_null=True, read_only=True)
    field17_display = serializers.CharField(allow_null=True, read_only=True)
    field18_display = serializers.CharField(allow_null=True, read_only=True)
    field19_display = serializers.CharField(allow_null=True, read_only=True)
    field20_display = serializers.CharField(allow_null=True, read_only=True)

    class Meta:
        model = ExtraInformation


class SystemNoteSerializer(serializers.ModelSerializer):
    note1_display = serializers.CharField(allow_null=True, read_only=True)
    note2_display = serializers.CharField(allow_null=True, read_only=True)
    note3_display = serializers.CharField(allow_null=True, read_only=True)

    class Meta:
        model = SystemNotes
        read_only_fields = ('call_record',)


class UserNoteSerializer(serializers.ModelSerializer):
    creator_name = serializers.CharField(source='get_user_name',
                                         allow_null=True, read_only=True)
    pretty_date = serializers.CharField(source='get_pretty_date_time',
                                        allow_null=True, read_only=True)

    class Meta:
        model = UserNote
        fields = (
            'pk',
            'creator',
            'creator_name',
            'call_record',
            'pretty_date',
            'text',)


class CallSerializer(serializers.ModelSerializer):
    data1_display = serializers.CharField(allow_null=True, read_only=True)
    data1_addon = serializers.CharField(allow_null=True, read_only=True)
    data2_display = serializers.CharField(allow_null=True, read_only=True)
    data2_addon = serializers.CharField(allow_null=True, read_only=True)
    data3_display = serializers.CharField(allow_null=True, read_only=True)
    data3_addon = serializers.CharField(allow_null=True, read_only=True)
    data4_display = serializers.CharField(allow_null=True, read_only=True)
    data4_addon = serializers.CharField(allow_null=True, read_only=True)
    data5_display = serializers.CharField(allow_null=True, read_only=True)
    data5_addon = serializers.CharField(allow_null=True, read_only=True)
    data6_display = serializers.CharField(allow_null=True, read_only=True)
    data6_addon = serializers.CharField(allow_null=True, read_only=True)
    data7_display = serializers.CharField(allow_null=True, read_only=True)
    data7_addon = serializers.CharField(allow_null=True, read_only=True)
    data8_display = serializers.CharField(allow_null=True, read_only=True)
    data8_addon = serializers.CharField(allow_null=True, read_only=True)

    class Meta:
        model = Call
        fields = (
            'pk',
            'caller',
            'result',
            'start_time',
            'end_time',
            'data1',
            'data1_display',
            'data1_addon',
            'data2',
            'data2_display',
            'data2_addon',
            'data3',
            'data3_display',
            'data3_addon',
            'data4',
            'data4_display',
            'data4_addon',
            'data5',
            'data5_display',
            'data5_addon',
            'data6',
            'data6_display',
            'data6_addon',
            'data7',
            'data7_display',
            'data7_addon',
            'data8',
            'data8_display',
            'data8_addon',)
