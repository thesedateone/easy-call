# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0012_auto_20150307_1738'),
    ]

    operations = [
        migrations.AddField(
            model_name='callresult',
            name='status',
            field=models.CharField(default=b'nt', max_length=2, choices=[(b'gd', b'Good'), (b'bd', b'Bad'), (b'nt', b'Neutral'), (b'ic', b'Incomplete'), (b'dq', b'Dequeued')]),
            preserve_default=True,
        ),
    ]
