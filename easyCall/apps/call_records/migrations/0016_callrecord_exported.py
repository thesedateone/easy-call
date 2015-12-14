# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('call_records', '0015_auto_20150323_2221'),
    ]

    operations = [
        migrations.AddField(
            model_name='callrecord',
            name='exported',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
