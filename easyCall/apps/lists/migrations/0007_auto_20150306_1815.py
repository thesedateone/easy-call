# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0006_csvcolumn'),
    ]

    operations = [
        migrations.AddField(
            model_name='notemapping',
            name='note1_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='notemapping',
            name='note2_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='notemapping',
            name='note3_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, default=1, to='lists.CsvColumn'),
            preserve_default=False,
        ),
    ]
