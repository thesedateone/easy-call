# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lists', '0005_callmapping'),
        ('call_records', '0007_systemnotes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Call',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('start_time', models.DateTimeField(auto_now_add=True)),
                ('end_time', models.DateTimeField(null=True, blank=True)),
                ('data1', models.CharField(max_length=255, blank=True)),
                ('data2', models.CharField(max_length=255, blank=True)),
                ('data3', models.CharField(max_length=255, blank=True)),
                ('data4', models.CharField(max_length=255, blank=True)),
                ('data5', models.CharField(max_length=255, blank=True)),
                ('data6', models.CharField(max_length=255, blank=True)),
                ('data7', models.CharField(max_length=255, blank=True)),
                ('data8', models.CharField(max_length=255, blank=True)),
                ('call_record', models.ForeignKey(related_name='results', to='call_records.CallRecord')),
                ('caller', models.ForeignKey(related_name='calls', to=settings.AUTH_USER_MODEL)),
                ('result', models.ForeignKey(blank=True, to='lists.CallResult', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
