# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0010_demographicsmapping'),
    ]

    operations = [
        migrations.AlterField(
            model_name='callmapping',
            name='data1_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='callmapping',
            name='data2_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='callmapping',
            name='data3_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='callmapping',
            name='data4_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='callmapping',
            name='data5_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='callmapping',
            name='data6_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='callmapping',
            name='data7_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='callmapping',
            name='data8_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='address_1_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='address_2_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='address_3_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='age_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='city_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='date_of_birth_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='do_not_mail_reason_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='name_family_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='name_first_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='name_middle_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='name_prefix_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='name_suffix_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='postcode_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='serial_number_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='suburb_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='tel_day_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='tel_evening_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='tel_mobile_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='demographicsmapping',
            name='tel_work_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field10_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field11_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field12_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field13_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field14_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field15_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field16_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field17_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field18_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field19_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field1_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field20_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field2_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field3_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field4_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field5_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field6_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field7_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field8_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='extramapping',
            name='field9_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='notemapping',
            name='note1_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='notemapping',
            name='note2_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='notemapping',
            name='note3_source',
            field=models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, blank=True, to='lists.CsvColumn'),
            preserve_default=True,
        ),
    ]
