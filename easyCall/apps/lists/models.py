"""Models for the lists app."""

from django.db import models


class ListType(models.Model):

    """Model to represent the reason why calls are being made."""

    slug = models.CharField(max_length=10, primary_key=True)
    display_name = models.CharField(max_length=200)

    def __unicode__(self):
        """ListType to_string method."""
        return self.slug


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
