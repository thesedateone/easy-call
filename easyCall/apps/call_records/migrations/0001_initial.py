# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CallRecord',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('serial_number', models.CharField(max_length=20)),
                ('name_prefix', models.CharField(max_length=20)),
                ('name_first', models.CharField(max_length=255)),
                ('name_middle', models.CharField(max_length=255)),
                ('name_family', models.CharField(max_length=255)),
                ('name_suffix', models.CharField(max_length=60)),
                ('tel_day', models.CharField(max_length=20)),
                ('tel_evening', models.CharField(max_length=20)),
                ('tel_work', models.CharField(max_length=20)),
                ('tel_mobile', models.CharField(max_length=20)),
                ('address_1', models.CharField(max_length=255)),
                ('address_2', models.CharField(max_length=255)),
                ('address_3', models.CharField(max_length=255)),
                ('suburb', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('postcode', models.CharField(max_length=20)),
                ('do_not_mail_reason', models.CharField(max_length=255)),
                ('date_of_birth', models.DateField()),
                ('age', models.CharField(max_length=20)),
                ('status', models.CharField(default=b'nw', max_length=2, choices=[(b'nw', b'New'), (b'ip', b'In Progress'), (b'cp', b'Completed')])),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
