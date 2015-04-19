from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from easyCall.apps.call_records import views

urlpatterns = [
    url(r'^call_records/$',
        views.CallRecordList.as_view()),
    url(r'^call_records/exported/$',
        views.ExportedFilesList.as_view()),
    url(r'^call_records/(?P<pk>[0-9]+)$',
        views.CallRecordDetail.as_view()),
    url(r'^call_records/(?P<list_type>[0-9a-zA-Z]+)/next/$',
        views.NextCallRecord.as_view()),
    url(r'^call_records/(?P<call_pk>[0-9]+)/notes/$',
        views.UserNoteList.as_view()),
    url(r'^call_records/(?P<call_pk>[0-9]+)/sysnotes/$',
        views.SystemNoteDetail.as_view()),
    url(r'^call_records/(?P<call_pk>[0-9]+)/extra/$',
        views.CallRecordExtraDetail.as_view()),
    url(r'^user_notes/(?P<pk>[0-9]+)/$',
        views.UserNoteDetail.as_view()),
    url(r'^call/(?P<pk>[0-9]+)/$',
        views.CallDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
