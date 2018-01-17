from django.shortcuts import render

from community.forms import *
from community.models import *

# Create your views here.

def index(request):
    try:
        articleList = Article.objects.all()
    except Article.DoesNotExist:
        raise Http404("Articles do not exist")

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
    try:
        articleList = Article.objects.all()
    except Article.DoesNotExist:
        raise Http404("Articles do not exist")

    return render(request, 'list.html', {'articleList': articleList})
