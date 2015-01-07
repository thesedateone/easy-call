from django.conf.urls import patterns, include, url
from django.contrib import admin
from easyCall.views import IndexView

urlpatterns = patterns(
    '',
    (r'^$', IndexView.as_view()),

    url(r'^', include('easyCall.apps.lists.urls')),

    url(r'^accounts/login/$', 'django.contrib.auth.views.login',
        {'template_name': 'login.html'},
        name='login'),
    url(r'^accounts/logout/$', 'django.contrib.auth.views.logout_then_login',
        name='logout'),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),

    url(r'^admin/', include(admin.site.urls)),
)
