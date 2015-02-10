import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "easyCall.settings")
django.setup()
from easyCall.apps.call_records import importer
from easyCall.apps.lists.models import ListType


badcc = ListType.objects.get(slug='badcc')
nice = ListType.objects.get(slug='nice')
street = ListType.objects.get(slug='street')

badcc_file = 'scripts/import_badcc.csv'
nice_file = 'scripts/import_nice.csv'
street_file = 'scripts/import_street.csv'

if os.path.isfile(badcc_file):
    importer.import_csv(badcc_file, badcc)

if os.path.isfile(nice_file):
    importer.import_csv(nice_file, nice)

if os.path.isfile(street_file):
    importer.import_csv(street_file, street)
