from django.contrib import admin
from easyCall.apps.call_records.models import CallRecord


class CallRecordAdmin(admin.ModelAdmin):
    pass


admin.site.register(CallRecord, CallRecordAdmin)