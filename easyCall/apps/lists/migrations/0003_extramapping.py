# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0002_auto_20150108_1253'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExtraMapping',
            fields=[
                ('list_type', models.OneToOneField(primary_key=True, serialize=False, to='lists.ListType')),
                ('field1_display', models.CharField(max_length=255, blank=True)),
                ('field2_display', models.CharField(max_length=255, blank=True)),
                ('field3_display', models.CharField(max_length=255, blank=True)),
                ('field4_display', models.CharField(max_length=255, blank=True)),
                ('field5_display', models.CharField(max_length=255, blank=True)),
                ('field6_display', models.CharField(max_length=255, blank=True)),
                ('field7_display', models.CharField(max_length=255, blank=True)),
                ('field8_display', models.CharField(max_length=255, blank=True)),
                ('field9_display', models.CharField(max_length=255, blank=True)),
                ('field10_display', models.CharField(max_length=255, blank=True)),
                ('field11_display', models.CharField(max_length=255, blank=True)),
                ('field12_display', models.CharField(max_length=255, blank=True)),
                ('field13_display', models.CharField(max_length=255, blank=True)),
                ('field14_display', models.CharField(max_length=255, blank=True)),
                ('field15_display', models.CharField(max_length=255, blank=True)),
                ('field16_display', models.CharField(max_length=255, blank=True)),
                ('field17_display', models.CharField(max_length=255, blank=True)),
                ('field18_display', models.CharField(max_length=255, blank=True)),
                ('field19_display', models.CharField(max_length=255, blank=True)),
                ('field20_display', models.CharField(max_length=255, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
