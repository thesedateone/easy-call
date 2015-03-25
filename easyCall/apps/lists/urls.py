from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from easyCall.apps.lists import views

urlpatterns = [
    url(r'^list_types/$', views.ListTypeList.as_view()),
    url(r'^list_types/(?P<slug>[0-9a-zA-Z]+)/$',
        views.CallResultList.as_view()),
    url(r'^list_types/(?P<slug>[0-9a-zA-Z]+)/report/$',
        views.ListTypeReport.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
