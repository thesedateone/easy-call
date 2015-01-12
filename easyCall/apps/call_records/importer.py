import csv

import pytz
from datetime import timedelta
from django.utils import timezone


from django.conf import settings
from easyCall.apps.call_records.models import CallRecord
from easyCall.apps.lists.models import ListType
from easyCall.apps.call_records.models import QueueEntry


list_type = ListType.objects.get(slug='street')


def import_csv(file_name):
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
    _do_queue_repopulation()


def populate_queue():
    # Figure out the earliest time we can repopulate
    timezone.activate(pytz.timezone(settings.TIME_ZONE))
    last_update = QueueEntry.objects.last().date_added
    delta = timedelta(minutes=10)
    now = timezone.now()

    if now < (last_update + delta):
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
