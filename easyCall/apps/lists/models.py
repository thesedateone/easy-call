"""Models for the lists app."""

from django.db import models


class ListType(models.Model):

    """Model to represent the reason why calls are being made."""

    slug = models.CharField(max_length=10, primary_key=True)
    display_name = models.CharField(max_length=200)

    def __unicode__(self):
        """ListType to_string method."""
        return self.slug


class ExtraMapping(models.Model):

    """Display names and csv field mappings for the extra fields per list_type."""

    list_type = models.OneToOneField(ListType, primary_key=True)
    field1_display = models.CharField(max_length=255, blank=True)
    field2_display = models.CharField(max_length=255, blank=True)
    field3_display = models.CharField(max_length=255, blank=True)
    field4_display = models.CharField(max_length=255, blank=True)
    field5_display = models.CharField(max_length=255, blank=True)
    field6_display = models.CharField(max_length=255, blank=True)
    field7_display = models.CharField(max_length=255, blank=True)
    field8_display = models.CharField(max_length=255, blank=True)
    field9_display = models.CharField(max_length=255, blank=True)
    field10_display = models.CharField(max_length=255, blank=True)
    field11_display = models.CharField(max_length=255, blank=True)
    field12_display = models.CharField(max_length=255, blank=True)
    field13_display = models.CharField(max_length=255, blank=True)
    field14_display = models.CharField(max_length=255, blank=True)
    field15_display = models.CharField(max_length=255, blank=True)
    field16_display = models.CharField(max_length=255, blank=True)
    field17_display = models.CharField(max_length=255, blank=True)
    field18_display = models.CharField(max_length=255, blank=True)
    field19_display = models.CharField(max_length=255, blank=True)
    field20_display = models.CharField(max_length=255, blank=True)


class CallResult(models.Model):

    """Model to represent the outcome of a call.

    The list of possible outcomes is customizable per type of list.
    """

    list_type = models.ForeignKey(ListType, related_name='results')
    display_name = models.CharField(max_length=50)
    deactivated = models.BooleanField(default=False)

    def __unicode__(self):
        """CallResult to_string method."""
        return self.display_name
