# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('call_records', '0013_auto_20150313_0716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='callrecord',
            name='status',
            field=models.CharField(default=b'nw', max_length=2, choices=[(b'nw', b'New'), (b'ip', b'In Progress'), (b'cp', b'Completed'), (b'dq', b'Dequeued')]),
            preserve_default=True,
        ),
    ]
