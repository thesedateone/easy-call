# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0007_auto_20150306_1815'),
    ]

    operations = [
        migrations.AddField(
            model_name='callmapping',
            name='data1_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data2_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data3_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data4_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data5_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data6_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data7_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='callmapping',
            name='data8_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
    ]
