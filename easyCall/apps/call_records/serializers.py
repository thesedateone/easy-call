from rest_framework import serializers

from easyCall.apps.call_records.models import CallRecord
from easyCall.apps.call_records.models import UserNote
from easyCall.apps.call_records.models import SystemNotes
from easyCall.apps.call_records.models import ExtraInformation


class CallRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallRecord
        fields = (
            'pk',
            'serial_number',
            'name_prefix',
            'name_first',
            'name_middle',
            'name_family',
            'name_suffix',
            'tel_day',
            'tel_evening',
            'tel_work',
            'tel_mobile',
            'address_1',
            'address_2',
            'address_3',
            'suburb',
            'city',
            'postcode',
            'do_not_mail_reason',
            'date_of_birth',
            'age',)


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
