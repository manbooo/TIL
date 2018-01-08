# Django Documentation Tutorials

- https://docs.djangoproject.com/ko/2.0/intro/

---

### 0. Setup

##### 1) python 설치 및 버전 확인

- <https://python.org/downloads/>

```bash
$ python --version
```



##### 2) 프로젝트 디렉토리 생성

```bash
$ mkdir docTutorial
$ cd docTutorial
```



##### 3) 가상환경 설정

- 가상환경 생성

```
~\docTutorial$ python -m venv myproject
```

- 가상환경 실행

```bash
~\docTutorial$ myproject\Scripts\activate
(myproject) ~\docTutorial$
```



##### 4) pip 최신 버전 업데이트 및 확인

```bash
(myproject) ~\docTutorial$ pip install --upgrade pip
```



##### 5) django 설치

```bash
(myproject) ~\docTutorial$ pip install django
(myproject) ~\docTutorial$ django --version
```

---

### 1. [첫 번째 장고 앱 작성하기, part 1](https://docs.djangoproject.com/ko/2.0/intro/tutorial01/#writing-your-first-django-app-part-1) 

##### 1) 프로젝트 만들기

```bash
(myproject) ~\docTutorial$ django-admin startproject mysite
```

- startproject

  ```bash
  mysite/			    # root directory, 프로젝트 컨테이너
    manage.py		    # 장고 프로젝트와 상호 작용할 수 있는 커맨드라인의 유틸리티
    mysite/		    # project 를 위한 실제 Python 패키지들이 저장
      __init__.py		# Python 으로 하여금 이 디렉토리를 패키지 처럼 다루라고 알려주는 용도의 단순한 빈 파일
      settings.py		# 현재 Django project 의 환경/구성
      urls.py		    # 현재 Django project 의 URL 선언, Django 로 작성된 사이트의 "목차"
      wsgi.py		    # 현재 project 를 서비스 하기 위한 WSGI 호환 웹 서버의 진입점
  ```




##### 2) 개발 서버

```bash
(myproject) ~\docTutorial$ cd mysite
(myproject) ~\docTutorial\mysite$ python manage.py runserver

# 포트번호 변경
(myproject) ~\docTutorial\mysite$ python manage.py runserver [포트번호]

# Vagrant를 실행 중이거나 네트워크의 다른 컴퓨터에서 작업하고 싶을 때 유용
(myproject) ~\docTutorial\mysite$ python manage.py runserver 0:8000
```

- 개발 서버는 순수 Python 으로 작성된 경량 웹 서버
- **개발 서버는 오직 개발 목적으로만** 사용



##### 3)설문조사 앱 만들기

-  Django 는 앱(app) 의 기본 디렉토리 구조를 자동으로 생성할 수 있는 도구를 제공

> ##### Project vs App
>
> - App : 특정한 기능을 수행하는 웹 어플리케이션(블로그, 데이터베이스, 설문조사 등)
> - Project :  특정 웹 사이트를 위한 app 들과 각 설정들을 한데 묶어놓은 것



######  App 생성

```bash
(myproject) ~\docTutorial\mysite$ python manage.py startapp polls
```

```bash
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```



###### 첫 번째 뷰 작성

- polls/views.py

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```



- polls/urls.py 생성 
  - view 를 호출하려면 이와 연결된 URL이 필요함
  - 이를 위해 URLconf 가 사용

```
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    urls.py
    views.py
```

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```



- mysite/urls.py
  - 최상위 URLconf 에서 `polls.urls` 모듈을 바라보게 설정

```python
from django.urls import include, path
from django.contrib import admin

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

 - `include()` : https://docs.djangoproject.com/ko/2.0/ref/urls/#django.urls.include
    - 다른 URLconf 들을 참조할 수 있도록 도와줌
    - Django 가 함수 `include()` 를 만나게 되면, URL 의 그 시점까지 일치하는 부분을 잘라내고, 남은 문자열 부분을 후속 처리를 위해 include 된 URLconf 로 전달
   - **`admin.site.urls` 를 제외**한, 다른 URL 패턴을 include 할 때마다 항상 `include()` 를 사용



- 확인 : http://127.0.0.1:8000/polls/

```bash
(myproject) ~\docTutorial\mysite$ python manage.py runserver
```



> ##### `path([route], [view], [kwargs], [name])`
>
> https://docs.djangoproject.com/ko/2.0/ref/urls/#django.urls.path
>
> - route(필수)
>   - URL패턴을 가진 문자열
>   - 요청이 처리될 때, Django 는 `urlpatterns` 의 첫 번째부터 시작하여, 일치하는 패턴을 찾을 때 까지 요청된 URL 을 각 패턴을 리스트의 순서대로 비교
> - view(필수)
>   - 일치하는 패턴을 찾으면, [`HttpRequest`](https://docs.djangoproject.com/ko/2.0/ref/request-response/#django.http.HttpRequest) 객체를 첫번째 인수로 하고, 경로로 부터 '캡처된' 값을 키워드 인수로하여 특정한 view 함수를 호출
> - kwargs(선택)
>   - 임의의 키워드 인수들은 목표한 view 에 사전형으로 전달
> - name(선택)
>   - URL 에 이름을 지으면, 템플릿을 포함한 Django 어디에서나 명확하게 참조
>   - 단 하나의 파일만 수정해도 project 내의 모든 URL 패턴을 바꿀 수 있도록 도와줌

---

###  2. [첫 번째 장고 앱 작성하기, part 2](https://docs.djangoproject.com/ko/2.0/intro/tutorial02/#writing-your-first-django-app-part-2)

##### 1) 데이터베이스 설치

###### mysite/settings.py

- Django 설정을 모듈 변수로 표현한 보통의 Python 모듈
- 기본적으로는 SQLite 을 사용하도록 구성

> ##### SQLite가 아닌 데이터베이스라면
>
> 적절한 [데이터베이스 연결](https://docs.djangoproject.com/ko/2.0/topics/install/#database-installation) 을 설치하고, 데이터베이스 연결 설정과 맞게끔 [`DATABASES`](https://docs.djangoproject.com/ko/2.0/ref/settings/#std:setting-DATABASES) `'default'` 항목의 값을 다음의 키 값으로 변경
>
> - [`ENGINE`](https://docs.djangoproject.com/ko/2.0/ref/settings/#std:setting-DATABASE-ENGINE) :
>   -  `'django.db.backends.sqlite3'`, `'django.db.backends.postgresql'`, `'django.db.backends.mysql'`, or `'django.db.backends.oracle'`
>   -  그 외에 [서드파티 백엔드](https://docs.djangoproject.com/ko/2.0/ref/databases/#third-party-notes) 를 참조
> - [`NAME`](https://docs.djangoproject.com/ko/2.0/ref/settings/#std:setting-NAME) :
>   -  만약 SQLite 를 사용 중이라면, 데이터베이스는 컴퓨터의 파일로서 저장
>   -  이 경우, [`NAME`](https://docs.djangoproject.com/ko/2.0/ref/settings/#std:setting-NAME) 는 파일명을 포함한 절대 경로 로서 지정해야 함
>   -  기본 값은 `os.path.join(BASE_DIR,'db.sqlite3')` 로 정의되어 있으며, project 디렉토리 내에 `db.sqlite3` 파일로 저장
>
>
>
> 만약 SQLite 이외의 데이터베이스를 사용하는 경우, 이 시점에서 데이터베이스를 생성
>
> - 데이터베이스의 대화형 프롬프트 내에서 `CREATE DATABASE database_name;`명령 실행
> - `mysite/settings.py` 에 설정된 데이터베이스 사용자가 "create database" 권한이 있는지도 확인
> - 튜토리얼을 진행하며 필요한 경우 [테스트 데이터베이스](https://docs.djangoproject.com/ko/2.0/topics/testing/overview/#the-test-database) 를 자동으로 생성



>##### [`INSTALLED_APPS`](https://docs.djangoproject.com/ko/2.0/ref/settings/#std:setting-INSTALLED_APPS) 
>
>- Django 와 함께 딸려오는 다음의 app 들을 포함
>  - [`django.contrib.admin`](https://docs.djangoproject.com/ko/2.0/ref/contrib/admin/#module-django.contrib.admin) : 관리용 사이트, 곧 사용하게 될겁니다.
>  - [`django.contrib.auth`](https://docs.djangoproject.com/ko/2.0/topics/auth/#module-django.contrib.auth) : 인증 시스템.
>  - [`django.contrib.contenttypes`](https://docs.djangoproject.com/ko/2.0/ref/contrib/contenttypes/#module-django.contrib.contenttypes) : 컨텐츠 타입을 위한 프레임워크.
>  - [`django.contrib.sessions`](https://docs.djangoproject.com/ko/2.0/topics/http/sessions/#module-django.contrib.sessions) : 세션 프레임워크.
>  - [`django.contrib.messages`](https://docs.djangoproject.com/ko/2.0/ref/contrib/messages/#module-django.contrib.messages) : 메세징 프레임워크.
>  - [`django.contrib.staticfiles`](https://docs.djangoproject.com/ko/2.0/ref/contrib/staticfiles/#module-django.contrib.staticfiles) : 정적 파일을 관리하는 프레임워크.



- 데이터베이스에서 테이블 생성
  - `migrate` : `INSTALLED_APPS` 의 설정을 탐색하여, `mysite/settings.py` 의 데이터베이스 설정과 app 과 함께 제공되는 데이터베이스 migration에 따라, 필요한 데이터베이스 테이블을 생성

```bash
(myproject) ~\docTutorial\mysite$ python manage.py migrate
```



##### 2) 모델 만들기

- 모델 : 부가적인 메타데이터를 가진 데이터베이스의 구조
  -  Django 는 [DRY 원칙](https://docs.djangoproject.com/ko/2.0/misc/design-philosophies/#dry) 을 따름
  -  데이터 모델을 한곳에서 정의




###### polls/models.py

```python
from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```



##### 3) 모델 활성화

- app 에 대하여 데이터베이스 스키마 생성 (`CREATE TABLE` statements)
- `Question` 과 `Choice` 객체에 접근하기 위한 Python 데이터베이스 접근 API 를 생성




###### mysite/settings.py

- app 을 현재의 project 에 포함

```python
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```



- migration 은 Django가 모델(즉, 데이터베이스 스키마를 포함한)의 변경사항을 저장하는 방법

```bash
(myproject) ~\docTutorial\mysite$ python manage.py makemigrations polls
Migrations for 'polls':
  polls\migrations\0001_initial.py
    - Create model Choice
    - Create model Question
    - Add field question to choice
```



- 데이터베이스에 모델과 관련된 테이블을 생성

```bash
(myproject) ~\docTutorial\mysite$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, polls, sessions
Running migrations:
  Applying polls.0001_initial... OK
```



> 1. (`models.py` 에서) 모델을 변경
> 2. [`python manage.py makemigrations`](https://docs.djangoproject.com/ko/2.0/ref/django-admin/#django-admin-makemigrations) 을 통해 이 변경사항에 대한 migration 을 생성
> 3. [`python manage.py migrate`](https://docs.djangoproject.com/ko/2.0/ref/django-admin/#django-admin-migrate) 명령을 통해 변경사항을 데이터베이스에 적용



##### 4) API 가지고 놀기

###### Python 쉘을 실행

```bash
(myproject) ~\docTutorial\mysite$ python manage.py shell
```

```python
>>> from polls.models import Question, Choice   

>>> Question.objects.all()
<QuerySet []>

>>> from django.utils import timezone
>>> q = Question(question_text="What's new?", pub_date=timezone.now())

>>> q.save()

>>> q.id
1

>>> q.question_text
"What's new?"
>>> q.pub_date
datetime.datetime(2012, 2, 26, 13, 0, 0, 775217, tzinfo=<UTC>)

>>> q.question_text = "What's up?"
>>> q.save()

>>> Question.objects.all()
<QuerySet [<Question: Question object (1)>]>
```



- [`__str__()`](https://docs.djangoproject.com/ko/2.0/ref/models/instances/#django.db.models.Model.__str__) 메소드를 `Question` 과 `Choice` 에 추가
  - Django 가 자동으로 생성하는 관리 사이트 에서도 객체의 표현이 사용되기 때문

```python
from django.db import models

class Question(models.Model):
    # ...
    def __str__(self):
        return self.question_text

class Choice(models.Model):
    # ...
    def __str__(self):
        return self.choice_text
```



###### polls/models.py

```python
import datetime # python의 표준 모듈

from django.db import models
from django.utils import timezone # Django 의 시간대 관련 유틸리티


class Question(models.Model):
    # ...
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
```



###### python shell 실행

```python
>>> from polls.models import Question, Choice

>>> Question.objects.all()
<QuerySet [<Question: What's up?>]>

>>> Question.objects.filter(id=1)
<QuerySet [<Question: What's up?>]>
>>> Question.objects.filter(question_text__startswith='What')
<QuerySet [<Question: What's up?>]>

>>> from django.utils import timezone
>>> current_year = timezone.now().year
>>> Question.objects.get(pub_date__year=current_year)
<Question: What's up?>

>>> Question.objects.get(id=2)
Traceback (most recent call last):
    ...
DoesNotExist: Question matching query does not exist.

>>> Question.objects.get(pk=1)
<Question: What's up?>

>>> q = Question.objects.get(pk=1)
>>> q.was_published_recently()
True

>>> q = Question.objects.get(pk=1)

>>> q.choice_set.all()
<QuerySet []>

>>> q.choice_set.create(choice_text='Not much', votes=0)
<Choice: Not much>
>>> q.choice_set.create(choice_text='The sky', votes=0)
<Choice: The sky>
>>> c = q.choice_set.create(choice_text='Just hacking again', votes=0)

>>> c.question
<Question: What's up?>

>>> q.choice_set.all()
<QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>
>>> q.choice_set.count()
3

>>> Choice.objects.filter(question__pub_date__year=current_year)
<QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>

>>> c = q.choice_set.filter(choice_text__startswith='Just hacking')
>>> c.delete()
```



> ##### 참고
>
> - 모델의 관계에 대한 더 많은 정보 :  [Accessing related objects](https://docs.djangoproject.com/ko/2.0/ref/models/relations/)  
> - API 에서 이중 밑줄(`__`) 을 이용해서 어떻게 필드를 조회 : [Field lookups](https://docs.djangoproject.com/ko/2.0/topics/db/queries/#field-lookups-intro) 
> - 데이터베이스 API : [Database API reference](https://docs.djangoproject.com/ko/2.0/topics/db/queries/) 



##### 5) Django Admin 모듈 소개

###### 관리자 생성

```bash
(myproject) ~\docTutorial\mysite$ python manage.py createsuperuser
Username: admin
Email address: admin@example.com
Password: **********(django123)
Password (again): *********
Superuser created successfully.
```



###### 개발 서버 실행

```bash
(myproject) ~\docTutorial\mysite$ python manage.py runserver
```

- 관리자 사이트 접속 : http://127.0.0.1:8000/admin
  - Django 에서 제공되는 인증 프레임워크
  - [`django.contrib.auth`](https://docs.djangoproject.com/ko/2.0/topics/auth/#module-django.contrib.auth) 모듈에서 제공

  ​


###### polls/admin.py

- 관리 사이트에서 poll app 변경 가능하도록 `Question` 을 등록

```python
from django.contrib import admin
from .models import Question

admin.site.register(Question)
```



- 관리 기능 탐색
  -  `Question` 을 등록시켰으니 Django 는 이를 알아채고 관리 인덱스 페이지에 이를 표시

---

### 3. [첫 번째 장고 앱 작성하기, part 3](https://docs.djangoproject.com/ko/2.0/intro/tutorial03/#writing-your-first-django-app-part-3)

##### 1) 개요

- view 는 Django 어플리케이션이 일반적으로 특정 기능과 템플릿을 제공하는 웹페이지의 한 종류



- poll 어플리케이션
  - 질문 "색인" 페이지 : 최근의 질문들을 표시
  - 질문 "세부" 페이지 : 질문 내용과, 투표할 수 있는 서식을 표시
  - 질문 "결과" 페이지 : 특정 질문에 대한 결과를 표시
  - 투표 기능 : 특정
  - 질문에 대해 특정 선택을 할 수 있는 투표 기능



##### 2) 조금 더 view 작성하기

###### polls/views.py

- view 를 추가
- view 들은 인수를 받기 때문에 조금 모양이 다름

```python
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
```



###### polls/urls.py

- `path()` 호출을 추가하여 이러한 새로운 view 를 `polls.urls` 모듈로 연결

```python
from django.urls import path
from . import views

urlpatterns = [
    # ex: /polls/
    path('', views.index, name='index'),
    # ex: /polls/5/
    path('<int:question_id>/', views.detail, name='detail'),
    # ex: /polls/5/results/
    path('<int:question_id>/results/', views.results, name='results'),
    # ex: /polls/5/vote/
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```

-  "/polls/34/" 를 요청했다
  -  Django 는 `mysite.urls` 파이썬 모듈 호출
  -  `mysite.urls` 에서 `urlpatterns` 라는 변수를 찾고
  -  순서대로 패턴을 탐색 : `'polls/'` 를 찾는다.
  -  만약 `'polls/'` 찾으면 일치하는 텍스트(`"polls/"`) 를 버리고, 남은 텍스트인 `"34/"` 를 'polls.urls' URLconf 로 전달하여 남은 처리를 진행
  -  거기에 `'<int:question_id>/'`와 일치
  -  `detail()` view 함수가 호출



```python
detail(request=<HttpRequest object>, question_id=34)
```

- `question_id=34` 부분은 `<int:question_id>` 에서
  - 괄호를 사용하여 URL 의 일부를 "캡처"하고, 해당 내용을 keyword 인수로서 view 함수로 전달
  - 문자열의 `:question_id>` 부분은 일치되는 패턴을 구별하기 위해 정의한 이름
  - `<int:` 부분은 어느 패턴이 해당 URL 경로에 일치되어야 하는 지를 결정하는 컨버터



##### 3) view 가 실제로 뭔가 하도록 만들기

-  요청된 페이지의 내용이 담긴 [`HttpResponse`](https://docs.djangoproject.com/ko/2.0/ref/request-response/#django.http.HttpResponse) 객체를 반환
-  [`Http404`](https://docs.djangoproject.com/ko/2.0/topics/http/views/#django.http.Http404) 같은 예외를 발생



###### polls/views.py

```python
from django.http import HttpResponse
from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    output = ', '.join([q.question_text for q in latest_question_list])
    return HttpResponse(output)

# Leave the rest of the views (detail, results, vote) unchanged
```



##### 4) templates

- project 의 [`TEMPLATES`](https://docs.djangoproject.com/ko/2.0/ref/settings/#std:setting-TEMPLATES) 설정에는 Django 가 어떻게 template 을 불러오고 랜더링 할 것인지 를 서술
  - 기본 설정 파일은 [`APP_DIRS`](https://docs.djangoproject.com/ko/2.0/ref/settings/#std:setting-TEMPLATES-APP_DIRS) 옵션이 `True` 로 설정된 `DjangoTemplates` 백엔드를 구성



###### polls/templates/polls/index.html

-  `DjangoTemplates` 은 각 [`INSTALLED_APPS`](https://docs.djangoproject.com/ko/2.0/ref/settings/#std:setting-INSTALLED_APPS) 디렉토리의 "templates" 하위 디렉토리를 탐색
-  `app_directories` template 로더가 그렇게 동작하기 때문에, Django 에서 이 template 을 단순히 `polls/index.html` 로 참조

```html
{% if latest_question_list %}
    <ul>
    {% for question in latest_question_list %}
        <li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
    {% endfor %}
    </ul>
{% else %}
    <p>No polls are available.</p>
{% endif %}
```



###### polls/views.py : index view 를 업데이트 

```python
from django.http import HttpResponse
from django.template import loader

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))
```

- `polls/index.html` template 을 불러온 후, context 를 전달
- context 는 template 에서 쓰이는 변수명과, Python 의 객체를 연결하는 사전형 값



##### 5) 지름길: [`render()`](https://docs.djangoproject.com/ko/2.0/topics/http/shortcuts/#django.shortcuts.render)

- template 에 context 를 채워넣어 표현한 결과를 [`HttpResponse`](https://docs.djangoproject.com/ko/2.0/ref/request-response/#django.http.HttpResponse) 객체와 함께 돌려주는 구문은 자주 쓰는 용법
- Django 는 이런 표현을 쉽게 표현할 수 있도록 단축 기능(shortcuts)을 제공



###### polls/views.py

```python
from django.shortcuts import render

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)
```

- 모든 view 에 적용한다면, 더 이상 [`loader`](https://docs.djangoproject.com/ko/2.0/topics/templates/#module-django.template.loader) 와 [`HttpResponse`](https://docs.djangoproject.com/ko/2.0/ref/request-response/#django.http.HttpResponse) 를 import 하지 않아도 된다



###### [`render()`](https://docs.djangoproject.com/ko/2.0/topics/http/shortcuts/#django.shortcuts.render) 함수

-  request 객체를 첫번째 인수
-  template 이름을 두번째 인수
-  context 사전형 객체를 세전째 선택적(optional) 인수
-  인수로 지정된 context 로 표현된 template 의 [`HttpResponse`](https://docs.djangoproject.com/ko/2.0/ref/request-response/#django.http.HttpResponse) 객체가 반환



##### 6) 404 에러 일으키기

###### polls/views.py

```python
polls/views.py
from django.http import Http404
from django.shortcuts import render

from .models import Question

# ...

def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, 'polls/detail.html', {'question': question})
```



###### polls/templates/polls/detail.html

```html
{{ question }}
```



##### 7) 지름길: [`get_object_or_404()`](https://docs.djangoproject.com/ko/2.0/topics/http/shortcuts/#django.shortcuts.get_object_or_404)[¶](https://docs.djangoproject.com/ko/2.0/intro/tutorial03/#a-shortcut-get-object-or-404)

- 만약 객체가 존재하지 않을 때 [`get()`](https://docs.djangoproject.com/ko/2.0/ref/models/querysets/#django.db.models.query.QuerySet.get) 을 사용하여 [`Http404`](https://docs.djangoproject.com/ko/2.0/topics/http/views/#django.http.Http404) 예외를 발생시키는것은 자주 쓰이는 용법
- Django 에서 이 기능에 대한 단축 기능을 제공



###### polls/views.py

```python
from django.shortcuts import get_object_or_404, render

from .models import Question
# ...
def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})
```



###### [`get_object_or_404()`](https://docs.djangoproject.com/ko/2.0/topics/http/shortcuts/#django.shortcuts.get_object_or_404) 함수

- Django 모델을 첫번째 인자
- 몇개의 키워드 인수를 모델 관리자의 [`get()`](https://docs.djangoproject.com/ko/2.0/ref/models/querysets/#django.db.models.query.QuerySet.get) 함수에 넘김
  -  만약 객체가 존재하지 않을 경우, [`Http404`](https://docs.djangoproject.com/ko/2.0/topics/http/views/#django.http.Http404) 예외가 발생

> - [`get_object_or_404()`](https://docs.djangoproject.com/ko/2.0/topics/http/shortcuts/#django.shortcuts.get_object_or_404) 함수 처럼 동작하는 [`get_list_or_404()`](https://docs.djangoproject.com/ko/2.0/topics/http/shortcuts/#django.shortcuts.get_list_or_404) 함수가 존재
> - [`get()`](https://docs.djangoproject.com/ko/2.0/ref/models/querysets/#django.db.models.query.QuerySet.get) 대신 [`filter()`](https://docs.djangoproject.com/ko/2.0/ref/models/querysets/#django.db.models.query.QuerySet.filter) 를 쓴다는 것이 차이점
> - 리스트가 비어있을 경우, [`Http404`](https://docs.djangoproject.com/ko/2.0/topics/http/views/#django.http.Http404) 예외를 발생



##### 8) Template 시스템 사용하기

- [template 지침서](https://docs.djangoproject.com/ko/2.0/topics/templates/) 를 참고



###### polls/templates/polls/detail.html

```html
<h1>{{question.question_text}}</h1>

<ul>
{% for choice in question.choice_set.all %}
    <li>{{choice.choice_text}}</li>
{% endfor %}
</ul>
```

- `{{question.question_text }}` 
  - Django 는 먼저 `question` 객체에 대해 사전형으로 탐색
  - 탐색에 실패하게 되면 속성값으로 탐색
  - 만약 속성 탐색에도 실패한다면 리스트의 인덱스 탐색 시도
- `question.choice_set.all`
  - Python 에서 `question.choice_set.all()` 코드로 해석



##### 9) Template 에서 하드코딩된 URL 을 제거하기

###### polls/templates/polls/index.html

```html
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

- `polls.urls` 모듈에 서술된 URL 의 정의를 탐색하는 식으로 동작



###### polls/urls.py

```python
...
# added the word 'specifics'
path('specifics/<int:question_id>/', views.detail, name='detail'),
...
```

-  detail view 의 URL 을 `polls/specifics/12/` 로 바꾸고 싶다면, template 에서 바꾸는 것이 아니라 `polls/urls.py`에서 변경



##### 10) URL 의 이름공간(namespace) 나누기

###### Django 는 이 app 들의 URL 을 어떻게 구별해 낼까?

- 예를 들어, `polls` app 은 `detail` 이라는 view 를 가지고 있고, 동일한 project 에 블로그를 위한 app 이 있을수도 있다
- Django 가 `{% url %}` template 태그를 사용할 때, 어떤 app 의 view 에서 URL 을 생성할지 알 수 있을까?


- URLconf 에 이름공간(namespace)을 추가



###### polls/urls.py

````python
from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
````



###### polls/templates/polls/index.html

```html
<li><a href="{% url 'polls:detail' question.id %}">{{ question.question_text }}</a></li>
```

---

### 4. [첫 번째 장고 앱 작성하기, part 4](https://docs.djangoproject.com/ko/2.0/intro/tutorial04/#writing-your-first-django-app-part-4)



##### 1) 간단한 폼 만들기

###### polls/templates/polls/detail.html

```html
<h1>{{ question.question_text }}</h1>

{% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}

<form action="{% url 'polls:vote' question.id %}" method="post">
{% csrf_token %}
{% for choice in question.choice_set.all %}
    <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}" />
    <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br />
{% endfor %}
<input type="submit" value="Vote" />
</form>
```

- 위의 템플릿은 각 질문 선택 항목에 대한 라디오 버튼을 표시
- 각 라디오 버튼의 `name` 은 `"choice"`입니다. 즉, 누군가가 라디오 버튼 중 하나를 선택하여 폼을 제출하면, POST 데이터 인 `choice=#`을 전송\
- 서버 측 자료를 변경하는 폼을 작성할 때마다, `method="post"` 를 사용
- `forloop.counter` 는 [`for`](https://docs.djangoproject.com/ko/2.0/ref/templates/builtins/#std:templatetag-for) 태그가 반복을 한 횟수
- [`{%csrf_token %}`](https://docs.djangoproject.com/ko/2.0/ref/templates/builtins/#std:templatetag-csrf_token) : Cross Site Request Forgeries



###### polls/urls.py

```python
path('<int:question_id>/vote/', views.vote, name='vote'),
```



###### polls/views.py

```python
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse

from .models import Choice, Question
# ...
def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
```

- [`request.POST`](https://docs.djangoproject.com/ko/2.0/ref/request-response/#django.http.HttpRequest.POST) 는 키로 전송된 자료에 접근할 수 있도록 해주는 사전과 같은 객체
  -  [`request.POST`](https://docs.djangoproject.com/ko/2.0/ref/request-response/#django.http.HttpRequest.POST) 의 값은 항상 문자열
  -  `request.POST['choice']` 는 선택된 설문의 ID를 문자열로 반환
- 만약 POST 자료에 `choice` 가 없으면, `request.POST['choice']` 는 [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError) 가 발생
  - [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError) 를 체크하고, choice가 주어지지 않은 경우에는 에러 메시지와 함께 설문조사 폼으로
- [`HttpResponseRedirect`](https://docs.djangoproject.com/ko/2.0/ref/request-response/#django.http.HttpResponseRedirect)
  - 인수는 사용자가 재전송될 URL 
  - POST 데이터를 성공적으로 처리 한 후에는 항상 [`HttpResponseRedirect`](https://docs.djangoproject.com/ko/2.0/ref/request-response/#django.http.HttpResponseRedirect) 를 반환
- [`reverse()`](https://docs.djangoproject.com/ko/2.0/ref/urlresolvers/#django.urls.reverse) 
  - 뷰 함수에서 URL을 하드코딩하지 않도록 도와줌
  - 제어를 전달하기 원하는 뷰의 이름을, URL패턴의 변수부분을 조합해서 해당 뷰를 가르킴
  - `'/polls/[question.id]/results/'` 반환



> ##### `vote()` 뷰의 문제
>
> 먼저 데이터베이스에서 `selected_choice` 객체를 가져온 다음, `votes` 의 새 값을 계산하고 나서, 데이터베이스에 다시 저장한다. 만약 두 명의 사용자가 *정확하게 같은 시간* 에 투표를 할려고 시도할 경우, 잘못될 수 있다. `votes` 의 조회값이 42라고 할 경우, 두 명의 사용자에게 새로운 값인 43이 계산 되고, 저장. 그러나 44가 되야한다.
>
> - **경쟁 상태** 를 해결할 수 있는 방법 : [Avoiding race conditions using F()](https://docs.djangoproject.com/ko/2.0/ref/models/expressions/#avoiding-race-conditions-using-f)



##### 2) 결과 페이지 

###### polls/views.py

```python
from django.shortcuts import get_object_or_404, render


def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question': question})
```



###### polls/templates/polls/results.html

```html
<h1>{{ question.question_text }}</h1>

<ul>
{% for choice in question.choice_set.all %}
    <li>{{ choice.choice_text }} -- {{ choice.votes }} vote{{ choice.votes|pluralize }}</li>
{% endfor %}
</ul>

<a href="{% url 'polls:detail' question.id %}">Vote again?</a>
```



##### 3) 제너릭 뷰 사용하기: 적은 코드가 더 좋습니다

- 제너릭 뷰는 일반적인 패턴을 추상화하여 앱을 작성

  - URLconf를 변환.
  - 불필요한 오래된보기 중 일부를 삭제
  - Django의 제너릭 뷰를 기반으로 새로운 뷰를 도입

  ​

###### URLconf 수정 : polls/urls.py

```python
from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```



###### 조회수 수정 : polls/views.py

```python
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import generic

from .models import Choice, Question


class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'


def vote(request, question_id):
    ... # same as above, no changes needed.
```

- [`ListView`](https://docs.djangoproject.com/ko/2.0/ref/class-based-views/generic-display/#django.views.generic.list.ListView)와 [`DetailView`](https://docs.djangoproject.com/ko/2.0/ref/class-based-views/generic-display/#django.views.generic.detail.DetailView)의 두 가지 제너릭 뷰를 사용
  - "개체 목록 표시" 및 "특정 개체 유형에 대한 세부 정보 페이지 표시" 개념을 추상화
  - 각 제너릭 뷰는 어떤 모델이 적용될 것인지를 알아야한다.  `model` 속성을 사용하여 제공
  - [`DetailView`](https://docs.djangoproject.com/ko/2.0/ref/class-based-views/generic-display/#django.views.generic.detail.DetailView) 제너릭 뷰는 URL에서 캡쳐 된 기본 키 값이`"pk"`라고 생각,  `question_id`를 제너릭 뷰를 위해 `pk`로 변경
- [`DetailView`](https://docs.djangoproject.com/ko/2.0/ref/class-based-views/generic-display/#django.views.generic.detail.DetailView) 제너릭 뷰
  - `<app name>/<model name>_detail.html` 템플릿을 기본으로 사용
  - `template_name` 속성은 Django에게 자동 생성 된 기본 템플릿 이름 대신에 특정 템플릿 이름을 사용하도록 알려주기 위해 사용
- [`ListView`](https://docs.djangoproject.com/ko/2.0/ref/class-based-views/generic-display/#django.views.generic.list.ListView) 제네릭 뷰
  - `<app name>/<model name>_list.html` 템플릿을 기본으로 사용
- `DetailView`의 경우, `question` 변수가 자동으로 제공
- ` ListView`의 경우 자동 생성 된 컨텍스트 변수는 `question_list`
  -  `context_object_name` 속성을 제공하고, 대신에 `latest_question_list`를 사용하도록 지정

---

### 5. [첫 번째 장고 앱 작성하기, part 5](https://docs.djangoproject.com/ko/2.0/intro/tutorial05/)

##### 1) 자동화 된 테스트 소개

###### 자동화 된 테스트 란?

- 테스트 : 코드의 동작을 체크하는 작업
  -  소프트웨어의 전반적인 작동을 검사
  - 특정 모델 메서드는 예상대로 값을 반환하는가?
  - 사이트에서 사용자 입력 시퀀스가 원하는 결과를 생성하는가?
- 테스트 작업이 시스템에서 수행



###### 테스트를 만들어야하는 이유

- 테스트를 통해 시간을 절약 할 수 있다.
  -  제대로 작동하는지 확인
  - 어플리케이션을 수동으로 테스트하거나 새로 발견된 문제의 원인을 확인하는 데 많은 시간을 투자하는 것보다 훨씬 더 효과적
- 테스트는 문제를 그저 식별하는 것이 아니라 예방
  - 테스트가 없으면 어플리케이션의 목적 또는 의도 된 동작이 다소 불투명
- 코드를 더 매력적으로 만든다
- 팀이 함께 일하는 것을 돕는다



##### 2) 기초 테스팅 전략

###### [테스트 주도 개발](https://en.wikipedia.org/wiki/Test-driven_development)

- 코드를 작성하기도 전에 테스트를 먼저 작성
- 테스트 주도 개발은 파이썬 테스트 케이스로 문제를 간추려 공식화



##### 3) 우리의 첫 테스트 작성

###### 버그 확인

- `Question.was_published_recently()` 메소드
  - `Question`이 어제 안에 게시 된 경우 `True`를 반환(올바른 동작)
  -  `Question`의 `pub_date` 필드가 미래로 설정되어 있을때도 그렇습니다(틀린 동작)

```python
>>> import datetime
>>> from django.utils import timezone
>>> from polls.models import Question
>>> # create a Question instance with pub_date 30 days in the future
>>> future_question = Question(pub_date=timezone.now() + datetime.timedelta(days=30))
>>> # was it published recently?
>>> future_question.was_published_recently()
True
```



###### 버그를 노출하는 테스트 만들기 : polls/tests.py

```python
import datetime
from django.utils import timezone
from django.test import TestCase

from .models import Question

class QuestionModelTests(TestCase):

    def test_was_published_recently_with_future_question(self):
        """
        was_published_recently() returns False for questions whose pub_date
        is in the future.
        """
        time = timezone.now() + datetime.timedelta(days=30)
        future_question = Question(pub_date=time)
        self.assertIs(future_question.was_published_recently(), False)
```



###### 테스트 실행

```bash
(myproject) ~\docTutorial\mysite$ python manage.py test polls
```

- `python manage.py test polls`는 `polls` 어플리케이션에서 테스트를 탐색
- [`django.test.TestCase`](https://docs.djangoproject.com/ko/2.0/topics/testing/tools/#django.test.TestCase) 클래스의 서브 클래스를 찾음
- 테스트 목적으로 특별한 데이터베이스를 만듬
- 테스트 메소드 : 이름이 `test`로 시작하는 것들을 찾습니다.
- `test_was_published_recently_with_future_question`에서 `pub_date`필드가 30일 미래인 `Question` 인스턴스를 생성
- `assertIs()` 메소드를 사용하여, 우리가 `False`가 반환되기를 원함에도 불구하고 `was_published_recently()` 가 `True`를 반환한다는 것을 발견



###### 버그 수정 : polls/models.py

```python
def was_published_recently(self):
    now = timezone.now()
    return now - datetime.timedelta(days=1) <= self.pub_date <= now
```

- `Question.was_published_recently()`는 `pub_date` 가 미래에 있다면 `False` 를 반환



- 테스트 실행

```bash
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
.
----------------------------------------------------------------------
Ran 1 test in 0.001s

OK
Destroying test database for alias 'default'...
```



###### 보다 포괄적인 테스트 : polls/tests.py

```python
def test_was_published_recently_with_old_question(self):
    """
    was_published_recently() returns False for questions whose pub_date
    is older than 1 day.
    """
    time = timezone.now() - datetime.timedelta(days=1, seconds=1)
    old_question = Question(pub_date=time)
    self.assertIs(old_question.was_published_recently(), False)

def test_was_published_recently_with_recent_question(self):
    """
    was_published_recently() returns True for questions whose pub_date
    is within the last day.
    """
    time = timezone.now() - datetime.timedelta(hours=23, minutes=59, seconds=59)
    recent_question = Question(pub_date=time)
    self.assertIs(recent_question.was_published_recently(), True)
```



##### 4) 뷰 테스트

###### 뷰에 대한 테스트

-  웹 브라우저를 통해 사용자가 경험하는대로 동작을 확인



###### 장고 테스트 클라이언트

-  뷰 레벨에서 코드와 상호 작용하는 사용자를 시뮬레이트하기위해 테스트 클라이언트 클래스 [`Client`](https://docs.djangoproject.com/ko/2.0/topics/testing/tools/#django.test.Client)를 제공
- `tests.py`또는 [`shell`](https://docs.djangoproject.com/ko/2.0/ref/django-admin/#django-admin-shell)에서 사용



```python
# shell 테스트 환경 설정
>>> from django.test.utils import setup_test_environment
>>> setup_test_environment()
```

-  [`setup_test_environment()`](https://docs.djangoproject.com/ko/2.0/topics/testing/advanced/#django.test.utils.setup_test_environment)를 사용하여 템플릿 렌더러를 설치
  - 테스트 데이터베이스를 셋업하지 않는다
  - 테스트는 현재 사용중인 데이터베이스위에서 실행
- `settings.py`의 `TIME_ZONE`이 올바르지 않으면 예기치 않은 결과가 발생



```python
# 테스트 클라이언트 클래스를 import 
>>> from django.test import Client
>>> # create an instance of the client for our use
>>> client = Client()
```



```python
>>> # get a response from '/'
>>> response = client.get('/')
Not Found: /
>>> # we should expect a 404 from that address; if you instead see an
>>> # "Invalid HTTP_HOST header" error and a 400 response, you probably
>>> # omitted the setup_test_environment() call described earlier.
>>> response.status_code
404
>>> # on the other hand we should expect to find something at '/polls/'
>>> # we'll use 'reverse()' rather than a hardcoded URL
>>> from django.urls import reverse
>>> response = client.get(reverse('polls:index'))
>>> response.status_code
200
>>> response.content
b'\n    <ul>\n    \n        <li><a href="/polls/1/">What&#39;s up?</a></li>\n    \n    </ul>\n\n'
>>> response.context['latest_question_list']
<QuerySet [<Question: What's up?>]>
```



###### 뷰를 개선시키기 : polls/views.py

- `get_queryset()` 메소드를 수정하여 `timezone.now()` 와 비교하여 날짜를 검사하도록 변경
  - `Question.objects.filter (pub_date__lte = timezone.now ())` 는 `timezone.now` 보다 `pub_date` 가 작거나 같은 `Question`s 를 포함하는 queryset을 리턴

```python
from django.utils import timezone

class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
      """
      Return the last five published questions (not including those set to be
      published in the future).
      """
      return Question.objects.filter(
          pub_date__lte=timezone.now()
      ).order_by('-pub_date')[:5]

```



###### 새로운 뷰 테스트 : polls/tests.py

- 새로운 테스트 클래스와 함께 질문들을 생성하는 함수

```python
from django.urls import reverse

def create_question(question_text, days):
    """
    Create a question with the given `question_text` and published the
    given number of `days` offset to now (negative for questions published
    in the past, positive for questions that have yet to be published).
    """
    time = timezone.now() + datetime.timedelta(days=days)
    return Question.objects.create(question_text=question_text, pub_date=time)


class QuestionIndexViewTests(TestCase):
    def test_no_questions(self):
        """
        If no questions exist, an appropriate message is displayed.
        """
        response = self.client.get(reverse('polls:index'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No polls are available.")
        self.assertQuerysetEqual(response.context['latest_question_list'], [])

    def test_past_question(self):
        """
        Questions with a pub_date in the past are displayed on the
        index page.
        """
        create_question(question_text="Past question.", days=-30)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_question_list'],
            ['<Question: Past question.>']
        )

    def test_future_question(self):
        """
        Questions with a pub_date in the future aren't displayed on
        the index page.
        """
        create_question(question_text="Future question.", days=30)
        response = self.client.get(reverse('polls:index'))
        self.assertContains(response, "No polls are available.")
        self.assertQuerysetEqual(response.context['latest_question_list'], [])

    def test_future_question_and_past_question(self):
        """
        Even if both past and future questions exist, only past questions
        are displayed.
        """
        create_question(question_text="Past question.", days=-30)
        create_question(question_text="Future question.", days=30)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_question_list'],
            ['<Question: Past question.>']
        )

    def test_two_past_questions(self):
        """
        The questions index page may display multiple questions.
        """
        create_question(question_text="Past question 1.", days=-30)
        create_question(question_text="Past question 2.", days=-5)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_question_list'],
            ['<Question: Past question 2.>', '<Question: Past question 1.>']
        )
```



###### `DetailView` 테스트하기

- polls/views.py

```python
class DetailView(generic.DetailView):
    ...
    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        """
        return Question.objects.filter(pub_date__lte=timezone.now())
```



- polls/tests.py

```python
class QuestionDetailViewTests(TestCase):
    def test_future_question(self):
        """
        The detail view of a question with a pub_date in the future
        returns a 404 not found.
        """
        future_question = create_question(question_text='Future question.', days=5)
        url = reverse('polls:detail', args=(future_question.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_past_question(self):
        """
        The detail view of a question with a pub_date in the past
        displays the question's text.
        """
        past_question = create_question(question_text='Past Question.', days=-5)
        url = reverse('polls:detail', args=(past_question.id,))
        response = self.client.get(url)
        self.assertContains(response, past_question.question_text)
```



###### 더 많은 테스트를위한 아이디어

- `get_queryset` 메소드를 `ResultsView`에 추가하고 그 뷰에 대한 새로운 테스트 클래스를 생성
- 테스트는 `선택사항`이 없는 `설문`을 생성 한 다음, 실제로 게시되지 않는지 테스트하고, `선택사항`이 있는 `설문`을 작성하고 게시 여부를 테스트



##### 5) 테스트 할 때는, 많이 할 수록 좋다

- 테스팅에서 반복하는 것은 좋은 일


- 각 모델이나 뷰에 대한 별도의 `TestClass`
- 테스트하려는 각 조건 집합에 대해 분리된 테스트 방법
- 기능를 설명하는 테스트 메소드 이름



###### 6) 추가 테스팅

-  [`LiveServerTestCase`](https://docs.djangoproject.com/ko/2.0/topics/testing/tools/#django.test.LiveServerTestCase)가 포함되어있어 Selenium과 같은 도구와 쉽게 통합
- 복잡한 어플리케이션을 사용하는 경우 [연속적으로 통합](https://en.wikipedia.org/wiki/Continuous_integration) 하기 위해 모든 커밋마다 자동으로 테스트를 실행하여 품질 제어가 적어도 부분적으로 자동화되도록
- 코드 커버리지를 확인 : 커버리지는 죽은 코드를 확인하는 데 도움
  -  [Integration with coverage.py](https://docs.djangoproject.com/ko/2.0/topics/testing/advanced/#topics-testing-code-coverage)

