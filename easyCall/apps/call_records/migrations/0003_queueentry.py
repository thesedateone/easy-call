# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0002_auto_20150108_1253'),
        ('call_records', '0002_callrecord_list_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='QueueEntry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('call_record', models.ForeignKey(to='call_records.CallRecord')),
                ('list_type', models.ForeignKey(to='lists.ListType')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
