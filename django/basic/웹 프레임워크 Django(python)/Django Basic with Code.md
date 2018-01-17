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



---

### 리스트



---

### 글 보기

