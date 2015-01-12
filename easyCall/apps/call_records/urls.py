from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from easyCall.apps.call_records import views

urlpatterns = [
    url(r'^call_records/(?P<pk>[0-9]+)/$',
        views.CallRecordDetail.as_view()),
    url(r'^call_records/(?P<list_type>[0-9a-zA-Z]+)/next/$',
        views.NextCallRecord.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
