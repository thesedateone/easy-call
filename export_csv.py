import django
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "easyCall.settings")
django.setup()
from easyCall.apps.call_records import exporter

exporter.export_call_records(filename='/tmp/easy')