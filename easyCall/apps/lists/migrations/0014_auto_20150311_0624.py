# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0013_callresult_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='callresult',
            old_name='status',
            new_name='category',
        ),
    ]
