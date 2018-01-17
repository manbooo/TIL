# Django Basic with Code

### 부제 : 기초부터 탄탄히

저자 : OneQ

---

### 프로젝트 & app 생성

##### 0) 사전 준비(Windows)

###### python 설치 및 버전 확인

- <https://python.org/downloads/>

```bash
$ python --version
```



###### 가상환경 생성

```bash
$ python -m venv myenv
```



###### pip 최신 버전 업데이트 및 확인

```bash
(myenv) ~$ pip install --upgrade pip
```



###### Django 설치

```bash
(myenv) ~$ pip install django
(myenv) ~$ django --version
```



##### 1) 프로젝트 생성

```bash
(myenv) ~$ django-admin startproject tutorial
```



##### 2) app 생성

```bash
(myenv) ~$ python manage.py startapp community # windows
(myenv) ~$ ./manage.py startapp community # ubuntu
```



##### 3) database 생성

```bash
(myenv) ~$ python manage.py migrate # windows
(myenv) ~$ ./manage.py migrate # ubuntu
```

- `db.sqlite3` 파일 생성
- django가 필요한 기본적인 database table이 생성



##### 4) superuser 생성

```bash
(myenv) ~$ python manage.py createsuperuser # windows
(myenv) ~$ ./manage.py createsuperuser # ubuntu

Username (leave blank to use 'jju_park'): admin
Email address: admin@admin.kr
Password: admin123123
Password (again):

Superuser created successfully.
```



##### 5) 서버 실행

```bash
(myenv) ~$ python manage.py runserver # windows
(myenv) ~$ ./manage.py runserver # ubuntu
```



---

### 디렉토리 구조 확인

![djangoproject](djangoproject.png)



---

### 관리자 페이지 확인

##### 1)  admin page

- http://127.0.0.1:8000/admin


- database의 데이터를 수정, 삭제, 생성 가능



---

### app 설정

##### 1) app 등록 : tutorial\settings.py

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'community',
]
```



##### 2) model 생성

###### community\models.py

```python
class Article(models.Model):
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    contents = model.TextField()
    url = models.URLField()
    email = models.EmailField()
    cdate = models.DateTimeField(auto_now_add=True)
```

- `model`은 `class`로 생성



###### model을 database에 생성

```bash
(myenv) ~$ python manage.py makemigrations # windows
(myenv) ~$ ./manage.py makemigrations # ubuntu

Migrations for 'community':
  community\migrations\0001_initial.py
    - Create model Article
```



###### database에 적용

```bash
(myenv) ~$ python manage.py migrate # windows
(myenv) ~$ ./manage.py migrate # ubuntu

Operations to perform:
  Apply all migrations: admin, auth, community, contenttypes, sessions
Running migrations:
  Applying community.0001_initial... OK
```



---

### 글쓰기

##### 0) 준비 

###### url 설정 : tutorial\urls.py

```python
from community.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'write/', write, name = 'write'),
]
```

- `r'write/'` : 정규표현식



##### 1) 글쓰기 폼 만들기

###### community\views.py

```python
def write(request):
    return render(request, 'write.html')
```

- `return render(request, 'write.html')`
  - `request`가 오면 `write.html`(template)로 렌더하겠다.



###### form 생성 : community\forms.py 

```python
from django.forms import ModelForm
from community.models import *

class Form(ModelForm):
    class Meta:
        model = Article
        fields = ['name', 'title', 'contents', 'url', 'email']
```

- model을 이용하여 간편하게 생성



###### form 전달 : community\views.py 

```python
from django.shortcuts import render
from community.forms import *

# Create your views here.
def write(request):
    form = Form()
    return render(request, 'write.html', {'form': form})
```



###### community\templates\write.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>write</title>
  </head>
  <body>
    <form action="" method="post">
      {{ form.as_p }}
      {% csrf_token %}
      <button type="submit" class="btn btn-primary">저장</button>
    </form>
  </body>
</html>
```

- form 불러오기
  - `{{ form.as_p }}`
  - `{{ form.as_table }}`
  - `{{ form.as_ul }}`



###### 데이터 저장 : community\views.py

```python
from django.shortcuts import render
from community.forms import *

# Create your views here.
def write(request):
    if request.method == 'POST':
        form = Form(request.POST)
        if form.is_vaild():
            form.save()
    else:
        form = Form()
    
    return render(request, 'write.html', {'form': form})
```

- `request.method`가 `POST`인 경우
  - `form`에 그대로 넣고, `form`의 데이터가 유효하다면은 `form`을 저장
- **`form.save()`** : database의 field에 저장



---

### 리스트

##### 0) 준비

###### url 설정 : tutorial\urls.py

```python
from community.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'write/', write, name = 'write'),
    path(r'list/', list, name = 'list'),
]
```



##### 1) 리스트 만들기

###### community\views.py

```python
def list(request):
    return render(request, 'list.html')
```



###### community\templates\list.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>list</title>
  </head>
  <body>
    This is list!
  </body>
</html>
```



###### 데이터 받아와 전달 : community\views.py 

```python
from community.models import *

# ...

def list(request):
    articleList = Article.objects.all()
    return render(request, 'list.html', {'articleList': articleList})
```



######  community\templates\list.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>list</title>
  </head>
  <body>
    <ul>
      <li>제목 | 저자 | 날짜</li>
      {% for article in articleList %}
        {{ article.title }} | {{ article.name }} | {{ article.cdate|date:"D d M Y" }}</li>
      {% endfor %}
  </ul>
  </body>
</html>
```

- `date:"D d M Y"` : date filter



---

### 글 보기

##### 0) 준비

###### url 설정 : tutorial\urls.py

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name = 'index'),
    path('write/', write, name = 'write'),
    path('list/', list, name = 'list'),
    path('view/<int:article_id>', view),
]
```



##### 1) 글 보기 만들기

###### community\views.py

```python
def view(request, article_id):
    article = Article.objects.get(id=article_id)
    return render(request, 'view.html',{'article':article})
```



######community\templates\view.html 

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>view</title>
  </head>
  <body>
    제 목 : {{ article.title }}
    <br>
    저 자 : {{ article.name }}
    <br>
    내 용 :{{ article.contents }}
    <br>
    Email : {{ article.email }}
    <br>
  </body>
</html>
```



######  community\templates\list.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>list</title>
  </head>
  <body>
    <ul>
      <li>제목 | 저자 | 날짜</li>
      {% for article in articleList %}
        <li><a href="/view/{{article.id}}">{{ article.title }}</a> | {{ article.name }} | {{ article.cdate|date:"D d M Y" }}</li>
      {% endfor %}
  </ul>
  </body>
</html>
```

