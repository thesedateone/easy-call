from django.contrib import admin
from easyCall.apps.lists.models import ListType
from easyCall.apps.lists.models import CallResult
from easyCall.apps.lists.models import ExtraMapping
from easyCall.apps.lists.models import NoteMapping
from easyCall.apps.lists.models import CallMapping


class ResultInline(admin.TabularInline):
    model = CallResult
    extra = 1
    can_delete = False


class ExtraInline(admin.StackedInline):
    model = ExtraMapping


class SystemNoteInline(admin.StackedInline):
    model = NoteMapping


class CallInline(admin.StackedInline):
    model = CallMapping


class ListTypeAdmin(admin.ModelAdmin):
    inlines = [ResultInline, ExtraInline, SystemNoteInline, CallInline]
    list_display = ('slug', 'display_name')


admin.site.register(ListType, ListTypeAdmin)
