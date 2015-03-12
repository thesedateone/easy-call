# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('call_records', '0012_auto_20150311_0742'),
    ]

    operations = [
        migrations.AlterField(
            model_name='call',
            name='result',
            field=models.CharField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
    ]
