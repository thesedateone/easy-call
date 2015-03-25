from django.contrib import admin
from easyCall.apps.call_records.models import CallRecord, UserNote
from easyCall.apps.call_records.models import Call, QueueEntry


class UserInline(admin.TabularInline):
    model = UserNote
    extra = 1


class CallRecordAdmin(admin.ModelAdmin):
    inlines = [UserInline]
    list_display = ('serial_number', 'list_type', 'status', 'added', 'completed')
    list_filter = ('list_type', 'status', 'added')


class CallAdmin(admin.ModelAdmin):
	list_display = ('id', 'caller', 'result', 'start_time', 'end_time')
	list_filter = ('caller', 'result', 'start_time', 'end_time')


class QueueEntryAdmin(admin.ModelAdmin):
	list_display = ('call_record', 'list_type', 'date_added')
	list_filter = ('date_added',)
	pass


admin.site.register(CallRecord, CallRecordAdmin)
admin.site.register(Call, CallAdmin)
admin.site.register(QueueEntry, QueueEntryAdmin)



