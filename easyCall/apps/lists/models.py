"""Models for the lists app."""

from django.db import models


class ListType(models.Model):

    """Model to represent the reason why calls are being made."""

    slug = models.CharField(max_length=10, primary_key=True)
    display_name = models.CharField(max_length=200)

    def __unicode__(self):
        """ListType to_string method."""
        return self.slug


class CsvColumn(models.Model):

    """The list of columns available for import for a ListType"""
    list_type = models.ForeignKey(ListType, related_name='csvcolumns')
    column_name = models.CharField(max_length=255)

    def __unicode__(self):
        """CsvColumn to_string method."""
        return self.column_name

class DemographicsMapping(models.Model):

    """CSV field mappings for main call record fields."""

    list_type = models.OneToOneField(ListType, primary_key=True)
    serial_number_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    name_prefix_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    name_first_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    name_middle_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    name_family_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    name_suffix_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    tel_day_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    tel_evening_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    tel_work_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    tel_mobile_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    address_1_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    address_2_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    address_3_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    suburb_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    city_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    postcode_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    do_not_mail_reason_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    date_of_birth_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)
    age_source = models.ForeignKey(CsvColumn, related_name="+", on_delete=models.PROTECT, blank=True, null=True)


class ExtraMapping(models.Model):

    """Display names and csv field mappings for the extra fields per list_type."""

    list_type = models.OneToOneField(ListType, primary_key=True)
    field1_display = models.CharField(max_length=255, blank=True)
    field1_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field2_display = models.CharField(max_length=255, blank=True)
    field2_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field3_display = models.CharField(max_length=255, blank=True)
    field3_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field4_display = models.CharField(max_length=255, blank=True)
    field4_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field5_display = models.CharField(max_length=255, blank=True)
    field5_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field6_display = models.CharField(max_length=255, blank=True)
    field6_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field7_display = models.CharField(max_length=255, blank=True)
    field7_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field8_display = models.CharField(max_length=255, blank=True)
    field8_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field9_display = models.CharField(max_length=255, blank=True)
    field9_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field10_display = models.CharField(max_length=255, blank=True)
    field10_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field11_display = models.CharField(max_length=255, blank=True)
    field11_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field12_display = models.CharField(max_length=255, blank=True)
    field12_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field13_display = models.CharField(max_length=255, blank=True)
    field13_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field14_display = models.CharField(max_length=255, blank=True)
    field14_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field15_display = models.CharField(max_length=255, blank=True)
    field15_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field16_display = models.CharField(max_length=255, blank=True)
    field16_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field17_display = models.CharField(max_length=255, blank=True)
    field17_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field18_display = models.CharField(max_length=255, blank=True)
    field18_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field19_display = models.CharField(max_length=255, blank=True)
    field19_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    field20_display = models.CharField(max_length=255, blank=True)
    field20_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)


class NoteMapping(models.Model):

    """Display names and field mappings for the system notes per list_type."""

    list_type = models.OneToOneField(ListType, primary_key=True)
    note1_display = models.CharField(max_length=255, blank=True)
    note1_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    note2_display = models.CharField(max_length=255, blank=True)
    note2_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)
    note3_display = models.CharField(max_length=255, blank=True)
    note3_source = models.ForeignKey(CsvColumn, related_name='+', on_delete=models.PROTECT, blank=True, null=True)


class CallMapping(models.Model):

    """Display names and field mappings for the system notes per list_type."""

    list_type = models.OneToOneField(ListType, primary_key=True)
    caller_output = models.CharField(max_length=255, blank=True,
                                     default="Caller")
    result_output = models.CharField(max_length=255, default="Result")
    start_time_output = models.CharField(max_length=255, default="StartTime")
    end_time_output = models.CharField(max_length=255, default="EndTime")
    duration_output = models.CharField(max_length=255, default="Duration")
    data1_display = models.CharField(max_length=255, blank=True)
    data1_addon = models.CharField(max_length=20, blank=True)
    data1_output = models.CharField(max_length=255, blank=True, null=True)
    data2_display = models.CharField(max_length=255, blank=True)
    data2_addon = models.CharField(max_length=20, blank=True)
    data2_output = models.CharField(max_length=255, blank=True, null=True)
    data3_display = models.CharField(max_length=255, blank=True)
    data3_addon = models.CharField(max_length=20, blank=True)
    data3_output = models.CharField(max_length=255, blank=True, null=True)
    data4_display = models.CharField(max_length=255, blank=True)
    data4_addon = models.CharField(max_length=20, blank=True)
    data4_output = models.CharField(max_length=255, blank=True, null=True)
    data5_display = models.CharField(max_length=255, blank=True)
    data5_addon = models.CharField(max_length=20, blank=True)
    data5_output = models.CharField(max_length=255, blank=True, null=True)
    data6_display = models.CharField(max_length=255, blank=True)
    data6_addon = models.CharField(max_length=20, blank=True)
    data6_output = models.CharField(max_length=255, blank=True, null=True)
    data7_display = models.CharField(max_length=255, blank=True)
    data7_addon = models.CharField(max_length=20, blank=True)
    data7_output = models.CharField(max_length=255, blank=True, null=True)
    data8_display = models.CharField(max_length=255, blank=True)
    data8_addon = models.CharField(max_length=20, blank=True)
    data8_output = models.CharField(max_length=255, blank=True, null=True)


class CallResult(models.Model):

    """Model to represent the outcome of a call.

    The list of possible outcomes is customizable per type of list.
    """

    list_type = models.ForeignKey(ListType, related_name='results')
    display_name = models.CharField(max_length=50)
    deactivated = models.BooleanField(default=False)

    GOOD = 'gd'
    BAD = 'bd'
    NEUTRAL = 'nt'
    INCOMPLETE = 'ic'
    STATUS_CHOICES = (
        (GOOD, 'Good'),
        (BAD, 'Bad'),
        (NEUTRAL, 'Neutral'),
        (INCOMPLETE, 'Incomplete'),
    )
    category = models.CharField(max_length=2,
                                choices=STATUS_CHOICES,
                                default=NEUTRAL)

    def __unicode__(self):
        """CallResult to_string method."""
        return self.display_name
