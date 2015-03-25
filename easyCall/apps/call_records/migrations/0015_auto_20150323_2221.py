# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('call_records', '0014_auto_20150315_1453'),
    ]

    operations = [
        migrations.AlterField(
            model_name='queueentry',
            name='call_record',
            field=models.OneToOneField(to='call_records.CallRecord'),
            preserve_default=True,
        ),
    ]
