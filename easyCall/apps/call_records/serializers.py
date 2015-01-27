from rest_framework import serializers

from easyCall.apps.call_records.models import CallRecord
from easyCall.apps.call_records.models import UserNote


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
