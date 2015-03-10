# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('call_records', '0009_auto_20150310_1805'),
    ]

    operations = [
        migrations.AddField(
            model_name='callrecord',
            name='added',
            field=models.DateTimeField(default=datetime.datetime(2015, 3, 10, 6, 34, 4, 254287, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
    ]
