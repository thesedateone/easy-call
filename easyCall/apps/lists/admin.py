from django.contrib import admin
from easyCall.apps.lists.models import ListType
from easyCall.apps.lists.models import CallResult
from easyCall.apps.lists.models import ExtraMapping
from easyCall.apps.lists.models import NoteMapping
from easyCall.apps.lists.models import CallMapping
from easyCall.apps.lists.models import DemographicsMapping
from easyCall.apps.lists.models import CsvColumn


class ResultInline(admin.TabularInline):
    model = CallResult
    extra = 1
    can_delete = False


class ExtraInline(admin.StackedInline):
    model = ExtraMapping
    fields = (('field1_source', 'field1_display'),
        ('field2_source', 'field2_display'),
        ('field3_source', 'field3_display'),
        ('field4_source', 'field4_display'),
        ('field5_source', 'field5_display'),
        ('field6_source', 'field6_display'),
        ('field7_source', 'field7_display'),
        ('field8_source', 'field8_display'),
        ('field9_source', 'field9_display'),
        ('field10_source', 'field10_display'),
        ('field11_source', 'field11_display'),
        ('field12_source', 'field12_display'),
        ('field13_source', 'field13_display'),
        ('field14_source', 'field14_display'),
        ('field15_source', 'field15_display'),
        ('field16_source', 'field16_display'),
        ('field17_source', 'field17_display'),
        ('field18_source', 'field18_display'),
        ('field19_source', 'field19_display'),
        ('field20_source', 'field20_display'))

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name.endswith('_source'):
            list_type = request.META['PATH_INFO'].strip('/').split('/')[-1]
            kwargs["queryset"] = CsvColumn.objects.filter(list_type=list_type)
        return super(ExtraInline, self).formfield_for_foreignkey(db_field, request, **kwargs)


class SystemNoteInline(admin.StackedInline):
    model = NoteMapping
    fields = (('note1_source', 'note1_display'),
        ('note2_source', 'note2_display'),
        ('note3_source', 'note3_display'))

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name.endswith('_source'):
            list_type = request.META['PATH_INFO'].strip('/').split('/')[-1]
            kwargs["queryset"] = CsvColumn.objects.filter(list_type=list_type)
        return super(SystemNoteInline, self).formfield_for_foreignkey(db_field, request, **kwargs)


class CallInline(admin.StackedInline):
    model = CallMapping
    fields = (('data1_source', 'data1_display', 'data1_addon'),
        ('data2_source', 'data2_display', 'data2_addon'),
        ('data3_source', 'data3_display', 'data3_addon'),
        ('data4_source', 'data4_display', 'data4_addon'),
        ('data5_source', 'data5_display', 'data5_addon'),
        ('data6_source', 'data6_display', 'data6_addon'),
        ('data7_source', 'data7_display', 'data7_addon'),
        ('data8_source', 'data8_display', 'data8_addon'))

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name.endswith('_source'):
            list_type = request.META['PATH_INFO'].strip('/').split('/')[-1]
            kwargs["queryset"] = CsvColumn.objects.filter(list_type=list_type)
        return super(CallInline, self).formfield_for_foreignkey(db_field, request, **kwargs)


class DemographicsInline(admin.StackedInline):
    model = DemographicsMapping

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name.endswith('_source'):
            list_type = request.META['PATH_INFO'].strip('/').split('/')[-1]
            kwargs["queryset"] = CsvColumn.objects.filter(list_type=list_type)
        return super(DemographicsInline, self).formfield_for_foreignkey(db_field, request, **kwargs)


class ListTypeAdmin(admin.ModelAdmin):
    inlines = [ResultInline, DemographicsInline, 
               SystemNoteInline, CallInline, ExtraInline]
    list_display = ('slug', 'display_name')


class CsvColumnAdmin(admin.ModelAdmin):
    list_display = ('list_type', 'column_name')


admin.site.register(ListType, ListTypeAdmin)
admin.site.register(CsvColumn, CsvColumnAdmin)
