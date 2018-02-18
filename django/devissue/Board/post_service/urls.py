from django.conf.urls import include, url

from post_service.views import *

urlpatterns = [
    url(r'^$', post_list),
    url(r'^login/$', login),
    url(r'^login/validate$', login_validate),
]
