"""Models for the call_records app"""

from django.db import models


class CallRecord(models.Model):
    serial_number = models.CharField(max_length=20)

    name_prefix = models.CharField(max_length=20)
    name_first = models.CharField(max_length=255)
    name_middle = models.CharField(max_length=255)
    name_family = models.CharField(max_length=255)
    name_suffix = models.CharField(max_length=60)

    tel_day = models.CharField(max_length=20)
    tel_evening = models.CharField(max_length=20)
    tel_work = models.CharField(max_length=20)
    tel_mobile = models.CharField(max_length=20)

    address_1 = models.CharField(max_length=255)
    address_2 = models.CharField(max_length=255)
    address_3 = models.CharField(max_length=255)
    suburb = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    postcode = models.CharField(max_length=20)
    do_not_mail_reason = models.CharField(max_length=255)

    date_of_birth = models.DateField()
    age = models.CharField(max_length=20)

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
