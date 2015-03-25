from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url(r'^$', 'easyCall.apps.user_interface.views.index', name='index'),
    url(r'^call/$', 'easyCall.apps.user_interface.views.call', name='call'),
    url(r'^search/$', 'easyCall.apps.user_interface.views.search', name='search'),
    url(r'^ecadmin/$', 'easyCall.apps.user_interface.views.admin', name='admin'),
)