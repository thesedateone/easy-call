# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0004_notemapping'),
    ]

    operations = [
        migrations.CreateModel(
            name='CallMapping',
            fields=[
                ('list_type', models.OneToOneField(primary_key=True, serialize=False, to='lists.ListType')),
                ('data1_display', models.CharField(max_length=255, blank=True)),
                ('data2_display', models.CharField(max_length=255, blank=True)),
                ('data3_display', models.CharField(max_length=255, blank=True)),
                ('data4_display', models.CharField(max_length=255, blank=True)),
                ('data5_display', models.CharField(max_length=255, blank=True)),
                ('data6_display', models.CharField(max_length=255, blank=True)),
                ('data7_display', models.CharField(max_length=255, blank=True)),
                ('data8_display', models.CharField(max_length=255, blank=True)),
                ('data1_addon', models.CharField(max_length=20, blank=True)),
                ('data2_addon', models.CharField(max_length=20, blank=True)),
                ('data3_addon', models.CharField(max_length=20, blank=True)),
                ('data4_addon', models.CharField(max_length=20, blank=True)),
                ('data5_addon', models.CharField(max_length=20, blank=True)),
                ('data6_addon', models.CharField(max_length=20, blank=True)),
                ('data7_addon', models.CharField(max_length=20, blank=True)),
                ('data8_addon', models.CharField(max_length=20, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
