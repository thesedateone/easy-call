# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('call_records', '0005_auto_20150115_1151'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExtraInformation',
            fields=[
                ('call_record', models.OneToOneField(primary_key=True, serialize=False, to='call_records.CallRecord')),
                ('field1', models.CharField(max_length=255, blank=True)),
                ('field2', models.CharField(max_length=255, blank=True)),
                ('field3', models.CharField(max_length=255, blank=True)),
                ('field4', models.CharField(max_length=255, blank=True)),
                ('field5', models.CharField(max_length=255, blank=True)),
                ('field6', models.CharField(max_length=255, blank=True)),
                ('field7', models.CharField(max_length=255, blank=True)),
                ('field8', models.CharField(max_length=255, blank=True)),
                ('field9', models.CharField(max_length=255, blank=True)),
                ('field10', models.CharField(max_length=255, blank=True)),
                ('field11', models.CharField(max_length=255, blank=True)),
                ('field12', models.CharField(max_length=255, blank=True)),
                ('field13', models.CharField(max_length=255, blank=True)),
                ('field14', models.CharField(max_length=255, blank=True)),
                ('field15', models.CharField(max_length=255, blank=True)),
                ('field16', models.CharField(max_length=255, blank=True)),
                ('field17', models.CharField(max_length=255, blank=True)),
                ('field18', models.CharField(max_length=255, blank=True)),
                ('field19', models.CharField(max_length=255, blank=True)),
                ('field20', models.CharField(max_length=255, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
