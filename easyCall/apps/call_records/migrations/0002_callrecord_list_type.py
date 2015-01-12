# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0002_auto_20150108_1253'),
        ('call_records', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='callrecord',
            name='list_type',
            field=models.ForeignKey(related_name='records', default='badcc', to='lists.ListType'),
            preserve_default=False,
        ),
    ]
