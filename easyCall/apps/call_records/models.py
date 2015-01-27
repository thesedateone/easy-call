"""Models for the call_records app."""

from django.db import models
from django.contrib.auth.models import User

from easyCall.apps.lists.models import ListType


class CallRecord(models.Model):
    list_type = models.ForeignKey(ListType, related_name='records')
    serial_number = models.CharField(max_length=20)  # TODO: should not be required

    name_prefix = models.CharField(max_length=20, blank=True)
    name_first = models.CharField(max_length=255, blank=True)
    name_middle = models.CharField(max_length=255, blank=True)
    name_family = models.CharField(max_length=255, blank=True)
    name_suffix = models.CharField(max_length=60, blank=True)

    tel_day = models.CharField(max_length=20, blank=True)
    tel_evening = models.CharField(max_length=20, blank=True)
    tel_work = models.CharField(max_length=20, blank=True)
    tel_mobile = models.CharField(max_length=20, blank=True)

    address_1 = models.CharField(max_length=255, blank=True)
    address_2 = models.CharField(max_length=255, blank=True)
    address_3 = models.CharField(max_length=255, blank=True)
    suburb = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    postcode = models.CharField(max_length=20, blank=True)
    do_not_mail_reason = models.CharField(max_length=255, blank=True)

    date_of_birth = models.DateField(blank=True)
    age = models.CharField(max_length=20, blank=True)

    NEW = 'nw'
    IN_PROGRESS = 'ip'
    COMPLETE = 'cp'
    STATUS_CHOICES = (
        (NEW, 'New'),
        (IN_PROGRESS, 'In Progress'),
        (COMPLETE, 'Completed'),
    )
    status = models.CharField(max_length=2,
                              choices=STATUS_CHOICES,
                              default=NEW)

    def __unicode__(self):
        """CallRecord to_string method."""
        return self.serial_number


class QueueEntry(models.Model):
    list_type = models.ForeignKey(ListType)
    call_record = models.ForeignKey(CallRecord)
    date_added = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        """CallRecord to_string method."""
        return "{} ({})".format(self.call_record.id, self.list_type.slug)


class UserNote(models.Model):
    creator = models.ForeignKey(User)
    call_record = models.ForeignKey(CallRecord)
    date_added = models.DateTimeField(auto_now_add=True)
    text = models.TextField()

    def get_user_name(self):
        return self.creator.username

    def get_pretty_date_time(self):
        return self.date_added.strftime("%a %d %b %Y %I:%M %p")
