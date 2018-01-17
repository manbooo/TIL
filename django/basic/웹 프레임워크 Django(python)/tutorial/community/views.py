from django.shortcuts import render
from django.http import Http404

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
            return list(request)
    else:
        form = Form()
        return render(request, 'write.html', {'form': form})


def list(request):
    try:
        articleList = Article.objects.all()
    except Article.DoesNotExist:
        raise Http404("Articles do not exist")

    return render(request, 'list.html', {'articleList': articleList})

def view(request, article_id):
    try:
        article = Article.objects.get(pk=article_id)
    except Article.DoesNotExist:
        raise Http404("Article does not exist")

    return render(request, 'view.html', {'article': article})
