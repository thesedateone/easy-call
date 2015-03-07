# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0005_callmapping'),
    ]

    operations = [
        migrations.CreateModel(
            name='CsvColumn',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('column_name', models.CharField(max_length=255)),
                ('list_type', models.ForeignKey(related_name='csvcolumns', to='lists.ListType')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
