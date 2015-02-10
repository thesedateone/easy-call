# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0003_extramapping'),
    ]

    operations = [
        migrations.CreateModel(
            name='NoteMapping',
            fields=[
                ('list_type', models.OneToOneField(primary_key=True, serialize=False, to='lists.ListType')),
                ('note1_display', models.CharField(max_length=255, blank=True)),
                ('note2_display', models.CharField(max_length=255, blank=True)),
                ('note3_display', models.CharField(max_length=255, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
