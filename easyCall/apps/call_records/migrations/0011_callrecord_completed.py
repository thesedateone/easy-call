# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('call_records', '0010_callrecord_added'),
    ]

    operations = [
        migrations.AddField(
            model_name='callrecord',
            name='completed',
            field=models.DateField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
