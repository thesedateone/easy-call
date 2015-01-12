import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "easyCall.settings")
django.setup()
from easyCall.apps.call_records import importer

importer.import_csv('scripts/import.csv')
