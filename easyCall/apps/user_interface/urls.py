from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url(r'^$', 'easyCall.apps.user_interface.views.index', name='index'),
    url(r'^call/$', 'easyCall.apps.user_interface.views.call', name='call'),
    url(r'^search/$', 'easyCall.apps.user_interface.views.search', name='search'),
    url(r'^ecadmin/upload$', 'easyCall.apps.user_interface.views.upload', name='upload'),
    url(r'^ecadmin/queue$', 'easyCall.apps.user_interface.views.queue', name='queue'),
    url(r'^ecadmin/export$', 'easyCall.apps.user_interface.views.export', name='export'),
)