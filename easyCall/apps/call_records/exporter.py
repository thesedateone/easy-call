"""Handles exporting EasyCall data from the database to CSV files.

CallRecord data is stored in fixed schemas defined in apps.call_records.models.
Data is imported and exported from arbitrary CSV files via mapping defined in
app.lists.models - which requires this module to look up and apply the mapping.

The main pieces of data each have their own model and mapping table:
    * demographics:  CallRecord & DemographicsMapping
    * notes:         SystemNotes & NoteMapping
    * extra fields:  ExtraInformation & ExtraMapping
    * call outcome:  Call & CallMapping


Caller stats is stored in a fixed schema and is exported without customization.
"""

import csv
import os
from collections import OrderedDict

from django.conf import settings
from django.db.models import fields, Q
from django.db import transaction
from django.utils import timezone
from boto.s3.connection import S3Connection
from boto.s3.key import Key

from easyCall.apps.call_records.models import CallRecord
from easyCall.apps.lists.models import ListType


def get_demographics_mapping(list_type):
    """Generate the dict to export demographics data.

    Key:   CSV file column name
    Value: apps.call_records.models.CallRecord.<fieldname>
    """
    demo_mapping = OrderedDict()

    mapping = list_type.demographicsmapping
    for field in mapping._meta.fields:
        field_type = type(field)
        if field_type == fields.related.OneToOneField:
            continue
        name = field.name
        use_name = name.replace("_source", "")
        theattr = getattr(mapping, name)
        if theattr:
            demo_mapping[theattr.column_name] = use_name

    return demo_mapping


def get_notes_mapping(list_type):
    """Generate the dict to export notes data.

    Key:   CSV file column name
    Value: apps.call_records.models.SystemNotes.<fieldname>
    """
    notes_mapping = OrderedDict()

    mapping = list_type.notemapping
    for field in mapping._meta.fields:
        field_type = type(field)
        if field_type == fields.related.OneToOneField:
            continue
        name = field.name
        if name.endswith("_display"):
            continue
        use_name = name.replace("_source", "")
        theattr = getattr(mapping, name)
        if theattr:
            notes_mapping[theattr.column_name] = use_name

    return notes_mapping


def get_extra_mapping(list_type):
    """Generate the dict to export extra fields data.

    Key:   CSV file column name
    Value: apps.call_records.models.ExtraInformation.<fieldname>
    """
    extra_mapping = OrderedDict()

    mapping = list_type.extramapping
    for field in mapping._meta.fields:
        field_type = type(field)
        if field_type == fields.related.OneToOneField:
            continue
        name = field.name
        if name.endswith("_display"):
            continue
        use_name = name.replace("_source", "")
        theattr = getattr(mapping, name)
        if theattr:
            extra_mapping[theattr.column_name] = use_name

    return extra_mapping


def get_outcome_mapping(list_type):
    """Generate the dict to export call outcome data.

    Key:   CSV file column name
    Value: apps.call_records.models.Call.<fieldname>
    """
    outcome_mapping = OrderedDict()

    mapping = list_type.callmapping
    for field in mapping._meta.fields:
        field_type = type(field)
        if field_type == fields.related.OneToOneField:
            continue
        name = field.name
        if (name.endswith("_display") or name.endswith("_addon")):
            continue
        use_name = name.replace("_output", "")
        theattr = getattr(mapping, name)
        if theattr:
            outcome_mapping[theattr] = use_name

    return outcome_mapping


def get_mapping(list_type):
    """Collect the mapping dicts for each area of data."""
    mapping = {
        "demo": get_demographics_mapping(list_type),
        "notes": get_notes_mapping(list_type),
        "extra": get_extra_mapping(list_type),
        "outcome": get_outcome_mapping(list_type),
    }
    return mapping


def get_fieldnames(mapping):
    """Collate the list of columns for the CSV file base on mappings."""
    fieldnames = []
    fieldnames += mapping["demo"].keys()
    fieldnames += mapping["notes"].keys()
    fieldnames += mapping["extra"].keys()
    fieldnames += mapping["outcome"].keys()
    return fieldnames


def get_data(list_type, mapping):
    """Read data into a list of dicts that can be written to CSV.

    Filter included data by:
        * ListType
        * Only include records that have the 'completed' time stamp set.
        * Exclude records that have the 'exported' time stamp set.
    """
    records = CallRecord.objects.filter(list_type=list_type)
    records = records.filter(~Q(completed=None) & Q(exported=None))

    data = []
    for record in records:
        row = {}
        demo_map = mapping["demo"]
        for key, value in demo_map.iteritems():
            row[key] = getattr(record, value)
        notes_map = mapping["notes"]
        for key, value in notes_map.iteritems():
            row[key] = getattr(record.systemnotes, value)
        notes_map = mapping["extra"]
        for key, value in notes_map.iteritems():
            row[key] = getattr(record.extrainformation, value)
        notes_map = mapping["outcome"]
        if (record.status == CallRecord.DEQUEUED):
            # TODO:  Fix the DEQUEUED case properly
            for key, value in notes_map.iteritems():
                if value == 'result':
                    row[key] = record.get_status_display()
                else:
                    continue
        else:
            for key, value in notes_map.iteritems():
                result = record.results.last()
                if value == 'duration':  # duration is not a real field
                    row[key] = result.get_duration()
                else:
                    row[key] = getattr(result, value)
        data.append(row)
        record.exported = timezone.now()
        record.save()

    return data


def export_call_records(filebase):
    """Do the export of CallRecord data and write the CSV file to disk.

    Iterate over ListType objects and for each one:
        1. figure out the mapping
        2. pull the data out of the database & update export timestamp
        3. write data to a file on disk
        4. upload the temporary file to Amazon S3
        5. delete the temporary file
    """
    for list_type in ListType.objects.all():

        filename = "{}_{}_{}.csv".format(filebase, list_type.slug,
                                         timezone.now().strftime("%d%m%H%M"))
        tempfile = "/tmp/{}".format(filename)
        try:
            with transaction.atomic():

                mapping = get_mapping(list_type)
                fieldnames = get_fieldnames(mapping)
                data = get_data(list_type, mapping)

                if data:
                    with open(tempfile, 'w') as csvfile:
                        writer = csv.DictWriter(csvfile, dialect='excel',
                                                fieldnames=fieldnames,
                                                delimiter=',', quotechar='"',
                                                quoting=csv.QUOTE_ALL)
                        writer.writeheader()
                        for row in data:
                            writer.writerow(row)

                    upload_to_s3(filename, tempfile)
                    try:
                        os.remove(tempfile)
                    except OSError:
                        pass

        except Exception as e:
            print("Something went wrong, rolled it all back.")
            print(e)
            raise


def upload_to_s3(filename, tempfile):
    """Upload the temporary file to Amazon S3 based on environment vars."""
    bucket = os.environ['S3_BUCKET']
    conn = S3Connection()
    mybucket = conn.get_bucket(bucket)

    k = Key(mybucket)
    k.key = filename
    k.set_contents_from_filename(tempfile)


def get_list_from_s3_bucket():
    """Query S3 for the list of available keys."""
    bucket = os.environ['S3_BUCKET']
    conn = S3Connection()
    mybucket = conn.get_bucket(bucket)

    s3_keys = []
    for key in mybucket.list():
        s3_keys.append(S3Key(key))
    return s3_keys


class S3Key:

    def __init__(self, key):
        self.key = key

    def filename(self):
        return self.key.name

    def URL(self):
        return self.key.generate_url(240)
