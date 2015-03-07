# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0009_auto_20150307_1636'),
    ]

    operations = [
        migrations.CreateModel(
            name='DemographicsMapping',
            fields=[
                ('list_type', models.OneToOneField(primary_key=True, serialize=False, to='lists.ListType')),
                ('address_1_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('address_2_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('address_3_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('age_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('city_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('date_of_birth_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('do_not_mail_reason_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('name_family_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('name_first_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('name_middle_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('name_prefix_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('name_suffix_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('postcode_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('serial_number_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('suburb_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('tel_day_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('tel_evening_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('tel_mobile_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
                ('tel_work_source', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.PROTECT, to='lists.CsvColumn')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
