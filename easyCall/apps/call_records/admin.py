from django.contrib import admin
from easyCall.apps.call_records.models import CallRecord, UserNote


class UserInline(admin.TabularInline):
    model = UserNote
    extra = 1


class CallRecordAdmin(admin.ModelAdmin):
    inlines = [UserInline]
    list_display = ('serial_number', 'list_type', 'status')
    list_filter = ('list_type', 'status')


admin.site.register(CallRecord, CallRecordAdmin)