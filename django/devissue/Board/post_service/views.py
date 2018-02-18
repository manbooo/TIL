from django.http.response import HttpResponse
from django.template.loader import get_template
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from django.middleware import csrf

from django.contrib import auth

from post_service.models import Post
from post_service.forms import *

# Create your views here.
def post_list(request):
    template = get_template('post_list.html')

    page_data = Paginator(Post.objects.all(), 5)
    page = request.GET.get('page')

    if page is None:
        page = 1

    try:
        posts = page_data.page(page)
    except PageNotAnInteger:
        posts = page_data.page(1)
    except EmptyPage:
        posts = page_data.page(page_data.num_pages)

    context = {
        'post_list' : posts,
        'current_page' : int(page),
        'total_page' : range(1, page_data.num_pages + 1)
    }

    return HttpResponse(template.render(context))

def login(request):
    template = get_template('login_form.html')

    context = {'login_form' : LoginForm()}

    return HttpResponse(template.render(context))

def login_validate(request):
    if request.method == "POST":
        login_form_data = LoginForm(request.POST)

        if login_validate.is_valid():
            user = auth.authenticate(
                username = login_form_data.id,
                password = login_form_data.password
            )

            if user is not None:
                if user.is_active:
                    auth.login(request, user)

                    return redirect('/board/')
            else:
                return HttpResponse('사용자가 없거나 비밀번호를 잘못 입력하셨습니다.')
        else:
            return HttpResponse('로그인 폼이 비정상적 입니다.')
    else:
        return redirect('login')

    return HttpResponse('알 수 없는 오류입니다.')
