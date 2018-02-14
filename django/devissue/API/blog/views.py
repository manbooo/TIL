from django.shortcuts import render
from django.http.response import HttpResponse

from rest_framework.generics import GenericAPIView
from rest_framework import serializers, mixins

from blog.models import Post

# Create your views here.
def blog_page(request):
    post_list = Post.objects.all()

    return HttpResponse('Hello!' + post_list[0].title)

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'content', 'reg_date')

class blog_api(GenericAPIView, mixins.ListModelMixin):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
