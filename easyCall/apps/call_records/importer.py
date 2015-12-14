import csv

import pytz
from datetime import timedelta
from django.utils import timezone

from django.conf import settings
from django.db.models import Q
from django.db import IntegrityError

from easyCall.apps.call_records.models import CallRecord
from easyCall.apps.call_records.models import QueueEntry
from easyCall.apps.call_records.models import ExtraInformation
from easyCall.apps.call_records.models import SystemNotes
from easyCall.apps.lists.models import CsvColumn


def import_headings(file_name, list_type):
    CsvColumn.objects.filter(list_type=list_type).delete()
    with open(file_name, 'rb') as csvfile:
        recordreader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
        for field in recordreader.fieldnames:
            col = CsvColumn(
                list_type=list_type,
                column_name=field
            )
            col.save()


def import_csv(file_name, list_type):
    with open(file_name, 'rb') as csvfile:
        recordreader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
        for row in recordreader:
            record = create_main_record(list_type, row)
            record.save()
            save_notes(list_type, row, record)
            save_extras(list_type, row, record)


def create_main_record(list_type, row):
    serial_number = ''
    if list_type.demographicsmapping.serial_number_source:
        serial_number = row.get(list_type.demographicsmapping.serial_number_source.column_name, '')
    name_prefix = ''
    if list_type.demographicsmapping.name_prefix_source:
        name_prefix = row.get(list_type.demographicsmapping.name_prefix_source.column_name, '')
    name_first = ''
    if list_type.demographicsmapping.name_first_source:
        name_first = row.get(list_type.demographicsmapping.name_first_source.column_name, '')
    name_middle = ''
    if list_type.demographicsmapping.name_middle_source:
        name_middle = row.get(list_type.demographicsmapping.name_middle_source.column_name, '')
    name_family = ''
    if list_type.demographicsmapping.name_family_source:
        name_family = row.get(list_type.demographicsmapping.name_family_source.column_name, '')
    name_suffix = ''
    if list_type.demographicsmapping.name_suffix_source:
        name_suffix = row.get(list_type.demographicsmapping.name_suffix_source.column_name, '')
    tel_day = ''
    if list_type.demographicsmapping.tel_day_source:
        tel_day = row.get(list_type.demographicsmapping.tel_day_source.column_name, '')
    tel_evening = ''
    if list_type.demographicsmapping.tel_evening_source:
        tel_evening = row.get(list_type.demographicsmapping.tel_evening_source.column_name, '')
    tel_work = ''
    if list_type.demographicsmapping.tel_work_source:
        tel_work = row.get(list_type.demographicsmapping.tel_work_source.column_name, '')
    tel_mobile = ''
    if list_type.demographicsmapping.tel_mobile_source:
        tel_mobile = row.get(list_type.demographicsmapping.tel_mobile_source.column_name, '')
    address_1 = ''
    if list_type.demographicsmapping.address_1_source:
        address_1 = row.get(list_type.demographicsmapping.address_1_source.column_name, '')
    address_2 = ''
    if list_type.demographicsmapping.address_2_source:
        address_2 = row.get(list_type.demographicsmapping.address_2_source.column_name, '')
    address_3 = ''
    if list_type.demographicsmapping.address_3_source:
        address_3 = row.get(list_type.demographicsmapping.address_3_source.column_name, '')
    suburb = ''
    if list_type.demographicsmapping.suburb_source:
        suburb = row.get(list_type.demographicsmapping.suburb_source.column_name, '')
    city = ''
    if list_type.demographicsmapping.city_source:
        city = row.get(list_type.demographicsmapping.city_source.column_name, '')
    postcode = ''
    if list_type.demographicsmapping.postcode_source:
        postcode = row.get(list_type.demographicsmapping.postcode_source.column_name, '')
    do_not_mail_reason = ''
    if list_type.demographicsmapping.do_not_mail_reason_source:
        do_not_mail_reason = row.get(list_type.demographicsmapping.do_not_mail_reason_source.column_name, '')
    date_of_birth = None
    if list_type.demographicsmapping.date_of_birth_source:
        date_of_birth = row.get(list_type.demographicsmapping.date_of_birth_source.column_name, '')
    age = ''
    if list_type.demographicsmapping.age_source:
        age = row.get(list_type.demographicsmapping.age_source.column_name, '')

    return CallRecord(
        list_type=list_type,
        serial_number=serial_number,
        name_prefix=name_prefix,
        name_first=name_first,
        name_middle=name_middle,
        name_family=name_family,
        name_suffix=name_suffix,
        tel_day=tel_day,
        tel_evening=tel_evening,
        tel_work=tel_work,
        tel_mobile=tel_mobile,
        address_1=address_1,
        address_2=address_2,
        address_3=address_3,
        suburb=suburb,
        city=city,
        postcode=postcode,
        do_not_mail_reason=do_not_mail_reason,
        date_of_birth=date_of_birth,
        age=age,
        status=CallRecord.NEW,
    )


def save_notes(list_type, row, record):
    note1 = ''
    if list_type.notemapping.note1_source:
        note1 = row.get(list_type.notemapping.note1_source.column_name, '')
    note2 = ''
    if list_type.notemapping.note2_source:
        note2 = row.get(list_type.notemapping.note2_source.column_name, '')
    note3 = ''
    if list_type.notemapping.note3_source:
        note3 = row.get(list_type.notemapping.note3_source.column_name, '')

    record_notes = SystemNotes(
        call_record=record,
        note1=note1,
        note2=note2,
        note3=note3,
    )
    record_notes.save()


def save_extras(list_type, row, record):
    field1 = ''
    if list_type.extramapping.field1_source:
        field1 = row.get(list_type.extramapping.field1_source.column_name, '')
    field2 = ''
    if list_type.extramapping.field2_source:
        field2= row.get(list_type.extramapping.field2_source.column_name, '')
    field3 = ''
    if list_type.extramapping.field3_source:
        field3 = row.get(list_type.extramapping.field3_source.column_name, '')
    field4 = ''
    if list_type.extramapping.field4_source:
        field4 = row.get(list_type.extramapping.field4_source.column_name, '')
    field5 = ''
    if list_type.extramapping.field5_source:
        field5 = row.get(list_type.extramapping.field5_source.column_name, '')
    field6 = ''
    if list_type.extramapping.field6_source:
        field6 = row.get(list_type.extramapping.field6_source.column_name, '')
    field7 = ''
    if list_type.extramapping.field7_source:
        field7 = row.get(list_type.extramapping.field7_source.column_name, '')
    field8 = ''
    if list_type.extramapping.field8_source:
        field8 = row.get(list_type.extramapping.field8_source.column_name, '')
    field9 = ''
    if list_type.extramapping.field9_source:
        field9 = row.get(list_type.extramapping.field9_source.column_name, '')
    field10 = ''
    if list_type.extramapping.field10_source:
        field10 = row.get(list_type.extramapping.field10_source.column_name, '')
    field11 = ''
    if list_type.extramapping.field11_source:
        field11 = row.get(list_type.extramapping.field11_source.column_name, '')
    field12 = ''
    if list_type.extramapping.field12_source:
        field12 = row.get(list_type.extramapping.field12_source.column_name, '')
    field13 = ''
    if list_type.extramapping.field13_source:
        field13 = row.get(list_type.extramapping.field13_source.column_name, '')
    field14 = ''
    if list_type.extramapping.field14_source:
        field14 = row.get(list_type.extramapping.field14_source.column_name, '')
    field15 = ''
    if list_type.extramapping.field15_source:
        field15 = row.get(list_type.extramapping.field15_source.column_name, '')
    field16 = ''
    if list_type.extramapping.field16_source:
        field16 = row.get(list_type.extramapping.field16_source.column_name, '')
    field17 = ''
    if list_type.extramapping.field17_source:
        field17 = row.get(list_type.extramapping.field17_source.column_name, '')
    field18 = ''
    if list_type.extramapping.field18_source:
        field18 = row.get(list_type.extramapping.field18_source.column_name, '')
    field19 = ''
    if list_type.extramapping.field19_source:
        field19 = row.get(list_type.extramapping.field19_source.column_name, '')
    field20 = ''
    if list_type.extramapping.field20_source:
        field20 = row.get(list_type.extramapping.field20_source.column_name, '')

    record_extras = ExtraInformation(
        call_record=record,
        field1=field1,
        field2=field2,
        field3=field3,
        field4=field4,
        field5=field5,
        field6=field6,
        field7=field7,
        field8=field8,
        field9=field9,
        field10=field10,
        field11=field11,
        field12=field12,
        field13=field13,
        field14=field14,
        field15=field15,
        field16=field16,
        field17=field17,
        field18=field18,
        field19=field19,
        field20=field20,
    )
    record_extras.save()


def populate_queue(slug):
    records = CallRecord.objects.filter(Q(status=CallRecord.NEW) | Q(status=CallRecord.IN_PROGRESS))
    for record in records.filter(list_type=slug):
        try:
            entry = QueueEntry(call_record=record,
                               list_type=record.list_type)
            entry.save()
        except IntegrityError as ie:
            pass  # Record is already in queue, do nothing
