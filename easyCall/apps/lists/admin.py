from django.contrib import admin
from easyCall.apps.lists.models import ListType, CallResult


class ResultInline(admin.TabularInline):
    model = CallResult
    extra = 1
    can_delete = False


class ListTypeAdmin(admin.ModelAdmin):
    inlines = [ResultInline]
    list_display = ('slug', 'display_name')


admin.site.register(ListType, ListTypeAdmin)
