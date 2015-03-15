# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0014_auto_20150311_0624'),
    ]

    operations = [
        migrations.AlterField(
            model_name='callresult',
            name='category',
            field=models.CharField(default=b'nt', max_length=2, choices=[(b'gd', b'Good'), (b'bd', b'Bad'), (b'nt', b'Neutral'), (b'ic', b'Incomplete')]),
            preserve_default=True,
        ),
    ]
