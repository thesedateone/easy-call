import csv

import pytz
from datetime import timedelta
from django.utils import timezone


from django.conf import settings
from easyCall.apps.call_records.models import CallRecord
from easyCall.apps.call_records.models import QueueEntry
from easyCall.apps.call_records.models import ExtraInformation
from easyCall.apps.call_records.models import SystemNotes


def import_csv(file_name, list_type):
    with open(file_name, 'rb') as csvfile:
        recordreader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
        for row in recordreader:
            record = CallRecord(
                list_type=list_type,
                serial_number=row['Serial No'],
                name_prefix=row['Title'],
                name_first=row['First Name'],
                name_family=row['Last Name'],
                tel_day=row['Tel (day)'],
                tel_evening=row['Tel (eve)'],
                tel_mobile=row['Mobile'],
                address_1=row['Address 1'],
                suburb=row['Suburb'],
                city=row['Town/City'],
                postcode=row['Postcode'],
                do_not_mail_reason=row['Do Not Mail Reason'],
                date_of_birth=row['Date of Birth'],
                age=row['Age'],
                status=CallRecord.NEW,
            )
            record.save()

            if (list_type.slug == 'badcc'):
                record_extras = ExtraInformation(
                    call_record=record,
                    field1=row['Frequency'],
                    field2=row['Start Date'],
                    field3=row['Instalment Due'],
                    field4=row['Instalment'],
                    field5=row['Pledge ID'],
                    field6=row['Card Type'],
                    field7=row['Card Name'],
                    field8=row['#Missed-Sept-Dec'],
                    field9=row['$Missed-Sept-Dec'],
                    field10=row['#Missed-2014'],
                    field11=row['$Missed-2014'],
                    field12=row['Status'],
                    field13=row['On List From'],
                    field14=row['Other Group'],
                    field15=row['Last Called'],
                    field16=row['Number of Times Called'],
                )
                record_notes = SystemNotes(
                    call_record=record,
                    note1=row['Note - Rapport'],
                    note2=row['Note - Procedural'],
                )
            elif (list_type.slug == 'nice'):
                record_extras = ExtraInformation(
                    call_record=record,
                    field1=row['Foo'],
                    field2=row['Bar'],
                    field3=row['Baz'],
                )
                record_notes = SystemNotes(
                    call_record=record,
                    note1=row['Note - Rapport'],
                    note2=row['Note - Procedural'],
                    note3=row['Note - Approach'],
                )
            elif (list_type.slug == 'street'):
                record_extras = ExtraInformation(
                    call_record=record,
                    field1=row['Foo'],
                    field2=row['Bar'],
                    field3=row['Baz'],
                )
                record_notes = SystemNotes(
                    call_record=record,
                    note1=row['Note - Procedural'],
                )
            record_extras.save()
            record_notes.save()
    _do_queue_repopulation()


def populate_queue():
    # TODO:  things will get hairy if the queue is completely empty
    queue_size = QueueEntry.objects.count()

    if queue_size > 0:
        print("there is something in the queue")
        # Figure out the earliest time we can repopulate
        timezone.activate(pytz.timezone(settings.TIME_ZONE))
        last_update = QueueEntry.objects.last().date_added
        print(last_update)
        delta = timedelta(minutes=2)
        now = timezone.now()

        if now < (last_update + delta):
            print("too soon, can't repopulate")
            return False

    # repopulate queue
    _do_queue_repopulation()
    return True


def _do_queue_repopulation():
    records = CallRecord.objects.filter(status=CallRecord.NEW)
    for record in records:
        entry = QueueEntry(call_record=record,
                           list_type=record.list_type)
        entry.save()
