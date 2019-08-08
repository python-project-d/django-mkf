from django.conf.urls import url
# from django.contrib import admin
from App import views

urlpatterns = [
    url(r'^index/$', views.index, name='index'),
    url(r'^s/$', views.s, name='s')
]
