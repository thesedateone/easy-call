# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0015_auto_20150315_1453'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='callmapping',
            name='data1_source',
        ),
        migrations.RemoveField(
            model_name='callmapping',
            name='data2_source',
        ),
        migrations.RemoveField(
            model_name='callmapping',
            name='data3_source',
        ),
        migrations.RemoveField(
            model_name='callmapping',
            name='data4_source',
        ),
        migrations.RemoveField(
            model_name='callmapping',
            name='data5_source',
        ),
        migrations.RemoveField(
            model_name='callmapping',
            name='data6_source',
        ),
        migrations.RemoveField(
            model_name='callmapping',
            name='data7_source',
        ),
        migrations.RemoveField(
            model_name='callmapping',
            name='data8_source',
        ),
        migrations.AddField(
            model_name='callmapping',
            name='caller_output',
            field=models.CharField(default=b'Caller', max_length=255, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data1_output',
            field=models.CharField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data2_output',
            field=models.CharField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data3_output',
            field=models.CharField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data4_output',
            field=models.CharField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data5_output',
            field=models.CharField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data6_output',
            field=models.CharField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data7_output',
            field=models.CharField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data8_output',
            field=models.CharField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='duration_output',
            field=models.CharField(default=b'Duration', max_length=255),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='end_time_output',
            field=models.CharField(default=b'EndTime', max_length=255),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='result_output',
            field=models.CharField(default=b'Result', max_length=255),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='start_time_output',
            field=models.CharField(default=b'StartTime', max_length=255),
            preserve_default=True,
        ),
    ]
