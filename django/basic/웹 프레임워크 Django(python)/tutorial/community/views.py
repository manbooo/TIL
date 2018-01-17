from django.shortcuts import render

from community.forms import *
from community.models import *

# Create your views here.

def index(request):
    articleList = Article.objects.all()
    return render(request, 'list.html', {'articleList': articleList})

def write(request):
    if request.method == 'POST':
        form = Form(request.POST)

        articleList = Article.objects.all()

        if form.is_valid():
            form.save()
            return render(request, 'write.html', {'form': form})
    else:
        form = Form()
        return render(request, 'write.html', {'form': form})


def list(request):
    articleList = Article.objects.all()
    return render(request, 'list.html', {'articleList': articleList})
