# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('call_records', '0011_callrecord_completed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='callrecord',
            name='completed',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
