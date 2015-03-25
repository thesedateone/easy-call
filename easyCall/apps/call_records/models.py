"""Models for the call_records app."""

from django.db import models
from django.contrib.auth.models import User

from easyCall.apps.lists.models import ListType, CallResult


class CallRecord(models.Model):
    list_type = models.ForeignKey(ListType, related_name='records')
    serial_number = models.CharField(max_length=20)

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

    date_of_birth = models.DateField(blank=True, null=True)
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
    added = models.DateTimeField(auto_now_add=True)

    def get_current_call(self):
        call = self.results.first()
        return call.id

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


class ExtraInformation(models.Model):
    call_record = models.OneToOneField(CallRecord, primary_key=True)
    field1 = models.CharField(max_length=255, blank=True)
    field2 = models.CharField(max_length=255, blank=True)
    field3 = models.CharField(max_length=255, blank=True)
    field4 = models.CharField(max_length=255, blank=True)
    field5 = models.CharField(max_length=255, blank=True)
    field6 = models.CharField(max_length=255, blank=True)
    field7 = models.CharField(max_length=255, blank=True)
    field8 = models.CharField(max_length=255, blank=True)
    field9 = models.CharField(max_length=255, blank=True)
    field10 = models.CharField(max_length=255, blank=True)
    field11 = models.CharField(max_length=255, blank=True)
    field12 = models.CharField(max_length=255, blank=True)
    field13 = models.CharField(max_length=255, blank=True)
    field14 = models.CharField(max_length=255, blank=True)
    field15 = models.CharField(max_length=255, blank=True)
    field16 = models.CharField(max_length=255, blank=True)
    field17 = models.CharField(max_length=255, blank=True)
    field18 = models.CharField(max_length=255, blank=True)
    field19 = models.CharField(max_length=255, blank=True)
    field20 = models.CharField(max_length=255, blank=True)

    def field1_display(self):
        return self.call_record.list_type.extramapping.field1_display

    def field2_display(self):
        return self.call_record.list_type.extramapping.field2_display

    def field3_display(self):
        return self.call_record.list_type.extramapping.field3_display

    def field4_display(self):
        return self.call_record.list_type.extramapping.field4_display

    def field5_display(self):
        return self.call_record.list_type.extramapping.field5_display

    def field6_display(self):
        return self.call_record.list_type.extramapping.field6_display

    def field7_display(self):
        return self.call_record.list_type.extramapping.field7_display

    def field8_display(self):
        return self.call_record.list_type.extramapping.field8_display

    def field9_display(self):
        return self.call_record.list_type.extramapping.field9_display

    def field10_display(self):
        return self.call_record.list_type.extramapping.field10_display

    def field11_display(self):
        return self.call_record.list_type.extramapping.field11_display

    def field12_display(self):
        return self.call_record.list_type.extramapping.field12_display

    def field13_display(self):
        return self.call_record.list_type.extramapping.field13_display

    def field14_display(self):
        return self.call_record.list_type.extramapping.field14_display

    def field15_display(self):
        return self.call_record.list_type.extramapping.field15_display

    def field16_display(self):
        return self.call_record.list_type.extramapping.field16_display

    def field17_display(self):
        return self.call_record.list_type.extramapping.field17_display

    def field18_display(self):
        return self.call_record.list_type.extramapping.field18_display

    def field19_display(self):
        return self.call_record.list_type.extramapping.field19_display

    def field20_display(self):
        return self.call_record.list_type.extramapping.field20_display


class SystemNotes(models.Model):
    call_record = models.OneToOneField(CallRecord, primary_key=True)
    note1 = models.CharField(max_length=255, blank=True)
    note2 = models.CharField(max_length=255, blank=True)
    note3 = models.CharField(max_length=255, blank=True)

    def note1_display(self):
        return self.call_record.list_type.notemapping.note1_display

    def note2_display(self):
        return self.call_record.list_type.notemapping.note2_display

    def note3_display(self):
        return self.call_record.list_type.notemapping.note3_display


class Call(models.Model):
    call_record = models.ForeignKey(CallRecord, related_name='results')
    caller = models.ForeignKey(User, related_name='calls')
    result = models.ForeignKey(CallResult, blank=True, null=True)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(blank=True, null=True)
    data1 = models.CharField(max_length=255, blank=True)
    data2 = models.CharField(max_length=255, blank=True)
    data3 = models.CharField(max_length=255, blank=True)
    data4 = models.CharField(max_length=255, blank=True)
    data5 = models.CharField(max_length=255, blank=True)
    data6 = models.CharField(max_length=255, blank=True)
    data7 = models.CharField(max_length=255, blank=True)
    data8 = models.CharField(max_length=255, blank=True)

    def data1_display(self):
        return self.call_record.list_type.callmapping.data1_display

    def data1_addon(self):
        return self.call_record.list_type.callmapping.data1_addon

    def data2_display(self):
        return self.call_record.list_type.callmapping.data2_display

    def data2_addon(self):
        return self.call_record.list_type.callmapping.data2_addon

    def data3_display(self):
        return self.call_record.list_type.callmapping.data3_display

    def data3_addon(self):
        return self.call_record.list_type.callmapping.data3_addon

    def data4_display(self):
        return self.call_record.list_type.callmapping.data4_display

    def data4_addon(self):
        return self.call_record.list_type.callmapping.data4_addon

    def data5_display(self):
        return self.call_record.list_type.callmapping.data5_display

    def data5_addon(self):
        return self.call_record.list_type.callmapping.data5_addon

    def data6_display(self):
        return self.call_record.list_type.callmapping.data6_display

    def data6_addon(self):
        return self.call_record.list_type.callmapping.data6_addon

    def data7_display(self):
        return self.call_record.list_type.callmapping.data7_display

    def data7_addon(self):
        return self.call_record.list_type.callmapping.data7_addon

    def data8_display(self):
        return self.call_record.list_type.callmapping.data8_display

    def data8_addon(self):
        return self.call_record.list_type.callmapping.data8_addon
