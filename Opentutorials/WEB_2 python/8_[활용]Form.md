## Form

### Form

- 사용자들로 부터 정보를 입력받는 양식



#### 1. 글쓰기 링크 추가

```python
# index.py
<a href="create.py">create</a>
```



#### 2. Create.py 생성

- `index.py`를 복제해서 수정
  - 리눅스나 맥의 경우 파일 생성후 실행 권한을 줄 것 `sudo chmod a+x create.py`

```python
#!python

print("Content-Type: text/html") # HTML header
print()

import cgi, os

files = os.listdir('data')
#print(files)

listStr = ''

for item in files:
    listStr = listStr + '<li><a href="index.py?id={name}">{name}</a></li>'.format(name = item)

form = cgi.FieldStorage()

if 'id' in form:
    pageId = form["id"].value
    description = open('data/' + pageId, 'r').read()
else:
    pageId = 'Welcome'
    description = 'Hello, web'

print('''
<!doctype html>
<html>
    <head>
      <title>WEB1 - Welcome</title>
      <meta charset="utf-8">
    </head>
    <body>

      <h1><a href="index.py">WEB</a></h1>
      <ol>
        {listStr}
      </ol>
      <a href="create.py">create</a>
      <form action="process_create.py" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea rows="4" name="description" placeholder="description"></textarea></p>
        <p><input type="submit"></p>
      </form>
    </body>
</html>
'''.format(title = pageId, desc = description, listStr = listStr))
```

- `get` 방식의 경우 URL query string을 사용하여 접근
  - 이는 보안상의 문제가 생길 수 있다.
  - URL query string을 통한 데이터 수정과 삭제가 가능하기 때문에



### 전송한 정보의 처리

- 입력한 정보를 서버로 전송
- 개발자 도구를 통해 확인 가능 : `Network`에서 전송 데이터 확인 가능



#### 1. process_create.py 생성

- 리눅스나 맥의 경우 파일 생성후 실행 권한을 줄 것 `sudo chmod a+x process_create.py`
- [python3 file write](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)

```python
#!python

import cgi

form = cgi.FieldStorage()
title = form["title"].value
description = form["description"].value
# print(title, description)

opened_file = open('data/' + title, 'w')
opened_file.write(description)
opened_file.close()

#Redirection
print("Location: index.py?id="+title)
print()
```