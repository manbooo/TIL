# Django 초보가이드

### 부제 : 개념부터 탑재하자!

저자 : OneQ

---

### MVC, MFC

- **M**odel
  - 안전하게 **데이터**를 저장
  - 데이터베이스
- **V**iew, **T**emplate(Django)
  - 데이터를 적절하게 유저에게 **보여줌**
  - 유저가 원하는 형태로
  - 프론트앤드
- **C**ontrol, **V**iew(Django)
  - 사용자의 입력과 이벤트에 반응하여 **Model과 View를 업데이트**
  - 처리로직



- http://www.essenceandartifact.com/2012/12/the-essence-of-mvc.html

![MVC](http://1.bp.blogspot.com/-GMvBz2taYH8/UL4v-8e51HI/AAAAAAAAAFk/RnpdpsNOhjY/s1600/mvc_role_diagram.png)

- `user`가 `controller`에서 다양한 이벤트나 인풋을 조작
- `controller`는 `model`에 있는 데이터를 가져와 가공 혹은 조작을 하여 `view`를 보여준다

---

### Django 개념

##### 1) Django flow

![DjangoArchitecture-JeffCroft.png](https://lh3.googleusercontent.com/SMsIfsBtXuSR0hqC9kbPEutff78Mk0SRGr8akANMD3Cvi57ndR80aZ8-6PlwUDX22XDqw8iYTx2YjVdKIJeK9iPu9QJx1iSLionXCDCH69jrq5FyGJ8rCsnhrnpke6KIuJDh22EnXw)

1. `web browser`에서 이벤트/액션 발생
2. Django Server 접속
3. `URL Dispatcher`에서 사용자가 요청한 URL 분석
4. 분석한 URL의 적합한 `View`로 전송
5. `View`는 사용자의 요청에 따라 `Database`에 접근 (`Model`을 통해 connection)
6. `Database`는 요청한 정보를 `Model`을 통해 `View`로 전송
7. `View`가 보여줄 정보를 `Template`에 전송
8. `Template`가 UI(html, css, js, etc.)를 만들어서 `web browser`에 전송



###### 구체적으로

![djangoflow](djangoflow.png)

- 녹색 : project를 만들면 실질적으로 다루게 될 파일들
- `URL RESOLUTION`
  - 정규표현식으로 url을 다룬다.
- `MANAGERS`
  - 데이터베이스와 Django의 `MODEL`를 연결, 따로 쿼리문을 작성할 필요가 없다.
- `VIEW`
  - 데이터 가공
- `TEMPLATE`
  - 사용자에게 보여줄 UI를 구성
  - html 안에 control과 관련된 다양한 로직이 들어있다. (복잡한 로직 X)
  - `view`에서 받은 데이터를 어떻게 하면 잘 보여줄지에 관한 script
- `FORM`
  - 다양한 form
  - `model`과 `template`에 있는 사용자들이 쓰는 UI가 손쉽게 관리

---

### Project 와 APP

##### 1) 프로젝트 생성

```bash
django-admin startproject [PROJECT_NAME]
```

- 하나의 웹 사이트



##### 2) APP 생성

```bash
./manage.py startapp [APP_NAME]
```

- 프로젝트 내부에 대사의 app 생성
- 프로젝트 내부의 의미있는 하나의 기능들
- 어떤 프로젝트에서 만들어진 내부 app은 다른 프로젝트에서도 하위 app으로 재사용 가능

---

### `settings.py`

- 프로젝트 환경 설정 파일



- `DEBUG`
  - 디버그 모드 설정
  - 개발단계에서는 `True`
- `INSTALLED_APPS`
  - pip로 설치한 앱 또는 본인이 만든 app 추가
- `MIDDELWARE_CLASSES`
  - `requset`와 `response` 사이의 주요 기능 레이어
- `TEMPLATES`
  - Django template 관련 설정, 실제 뷰(html, 변수)
  - `TEMPLATE`와 관련된 변수들을 조정하는 context, `TEMPLATE`를 검색하기 위한 다양한 기능들, folder 위치들을 관리
- `DATABASES`
  - 데이터베이스 엔진의 연결 설정
- `STATIC_URL`
  - 정적 파일의 URL(css, javascript, image, etc.)

---

### `manage.py`

- 프로젝트 관리 명령어 모음



- 주요 명령어
  - `startapp` : 앱 생성
  - `runserver` : 서버 실행
  - `createsuperuser` : 관리자 생성
  - `makemigrations app` : app의 모델 변경 사항 체크
  - `migrate` : 변경 사항을 DB에 반영
  - `shell` : 쉘을 통해 데이터를 확인
  - `collectstatic` : static파일을 한 곳에 모음
- `./manage.py runserver 0.0.0.0:8080`