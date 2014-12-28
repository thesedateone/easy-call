"""url routing config for the pledges app."""

from django.conf.urls import patterns, url

from pledges import views

urlpatterns = patterns(
    '',
    url(r'^$', views.index, name='index'),
)
