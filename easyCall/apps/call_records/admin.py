from django.contrib import admin
from easyCall.apps.call_records.models import CallRecord, UserNote


class UserInline(admin.TabularInline):
    model = UserNote
    extra = 1


class CallRecordAdmin(admin.ModelAdmin):
    inlines = [UserInline]


admin.site.register(CallRecord, CallRecordAdmin)