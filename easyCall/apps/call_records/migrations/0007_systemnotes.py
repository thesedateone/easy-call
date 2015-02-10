# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('call_records', '0006_extrainformation'),
    ]

    operations = [
        migrations.CreateModel(
            name='SystemNotes',
            fields=[
                ('call_record', models.OneToOneField(primary_key=True, serialize=False, to='call_records.CallRecord')),
                ('note1', models.CharField(max_length=255, blank=True)),
                ('note2', models.CharField(max_length=255, blank=True)),
                ('note3', models.CharField(max_length=255, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
