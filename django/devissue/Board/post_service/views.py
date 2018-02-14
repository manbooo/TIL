from django.http.response import HttpResponse
from django.template.loader import get_template

# Create your views here.
def post_list(resquest):
    template = get_template('post_list.html')
    context = {'python_word' : 'Python'}

    return HttpResponse(template.render(context))
