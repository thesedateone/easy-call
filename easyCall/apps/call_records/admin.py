from django.contrib import admin

from easyCall.apps.call_records.models import CallRecord, UserNote
from easyCall.apps.call_records.models import Call, QueueEntry


# def list_type(obj):
#     return obj.call_record.list_type.display_name


class UserInline(admin.TabularInline):
    model = UserNote
    extra = 1


class CallRecordAdmin(admin.ModelAdmin):
    inlines = [UserInline]
    list_display = ('serial_number', 'list_type', 'status', 'added', 'completed')
    list_filter = ('list_type', 'status', 'added')


class CallAdmin(admin.ModelAdmin):
    list_display = ('id', 'caller', 'list_type', 'result', 'start_time', 'end_time',)
    list_filter = ('caller', 'result', 'start_time',)
    fields = ("call_record", "caller", 'list_type', "result", "start_time",
              "end_time", "data1", "data2", "data3", "data4", "data5", "data6",
              "data7", "data8",)
    readonly_fields = ('start_time', 'list_type',)

    def list_type(self, obj):
        return obj.call_record.list_type.display_name
    list_type.short_description = 'Type'


class QueueEntryAdmin(admin.ModelAdmin):
    list_display = ('call_record', 'list_type', 'date_added')
    list_filter = ('date_added',)
    pass


admin.site.register(CallRecord, CallRecordAdmin)
admin.site.register(Call, CallAdmin)
admin.site.register(QueueEntry, QueueEntryAdmin)
