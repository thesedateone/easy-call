from rest_framework import serializers
from easyCall.apps.call_records.models import CallRecord


class CallRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallRecord
        fields = (
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
