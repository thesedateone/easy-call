from django.contrib import admin
from easyCall.apps.lists.models import ListType
from easyCall.apps.lists.models import CallResult
from easyCall.apps.lists.models import ExtraMapping


class ResultInline(admin.TabularInline):
    model = CallResult
    extra = 1
    can_delete = False


class ExtraInline(admin.StackedInline):
    model = ExtraMapping
    can_delete = False


class ListTypeAdmin(admin.ModelAdmin):
    inlines = [ResultInline, ExtraInline]
    list_display = ('slug', 'display_name')


admin.site.register(ListType, ListTypeAdmin)
