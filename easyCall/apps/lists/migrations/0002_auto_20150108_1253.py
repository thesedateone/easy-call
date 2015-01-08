# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='callresult',
            name='list_type',
            field=models.ForeignKey(related_name='results', to='lists.ListType'),
            preserve_default=True,
        ),
    ]
