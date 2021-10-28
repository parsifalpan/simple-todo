# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.IntegerField(serialize=False, primary_key=True)),
                ('title', models.CharField(default=b'', max_length=64)),
                ('content', models.CharField(default=b'', max_length=256)),
                ('status', models.IntegerField(default=0)),
                ('priority', models.IntegerField(default=0)),
            ],
        ),
    ]
