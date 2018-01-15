# 파이썬을 이용한 웹 크롤링(Web Crawling) 어플리케이션 만들기

### 1. 웹 환경의 이해



##### 1) Server & Client

클라이언트와 서버로 나뉘는 **네트워크 아키텍처**

- 서버 : 특별한 서비스를 제공하는 컴퓨터
- 클라이언트 : 서비스를 사용하는 사용자 혹은 사용자의 단말기(인터넷을 통해 연결되어 있다.)
- 물리적인 서버로 접속해서 특정 프로그램으로 접근한다.
- 서버의 주소
  - URL(IP + Port)
  - ex) 192.168.0.1:80
- 서버의 종류(port)
  - 웹 서버(80) : 외부에서 접속해서 서비스에 접근
  - 데이터베이스 서버(mysql:3306)
  - DNS 서버(1023, 53)
  - FTP 서버(21)
  - ssh 서버(22)
  - 메일 서버(110,25,143)
  - etc.

**![500px-Client-server-model.svg.png](https://lh5.googleusercontent.com/sF2UDENDIqHMmFf-f8Cn6-J59uA2NTaZ-hDjiq2az-ya538VQbG03tHRPOV-7sL0RGJm3VqBM5txauXhPyvgHOZ7vhmXRu6O-6OjH612NHX9F0-tp8Ljb60ALvP0JjB9hrX4Llj1TQ)**



##### 2) HTTP(HyperText Transfer Protocol)

WWW 상에서 정보를 주고받을 수 있는 **프로토콜**(약속)

- TCP와 UDP 통신을 통해 80번 포트로 접속
- 언어들을 통일하자
- 인터넷은 규정된 약속에 의해서 사용 => 표준
- 웹 서버들이 대화하기 위한 약속





##### 3) Request, Response

- Request : 서버로의 요청
  - GET : 정보를 가져오는 역할
  - POST : 정보를 수정, 입력하는 역할
- Response : 서버로 부터의 응답
  - html, javascript, css, image, etc

**![XPQlr0QXX291A7SyScZMb1ZKU.jpg](https://lh3.googleusercontent.com/gu0ufLR0fm55De9tqwyuZJHMfalACQgjmlQjcNzM2IRJhHzzRn-QLhm9gQ-anXN1Drzm-u2YurHR6YXOQys_zpMYVR4GjPCU1um76gPsWFZVHKAw5Knk0vPKSEaRV1prRfMfvgGMLQ)**



##### 4) Frontend (HTML, css, javascript)

사용자가 브라우저에서 정보를 보고, 웹 서버에 특정 정보를 요청(request)하기 위한 사전 작업을 수행

- HTML(Hyper Text Markup Language)
  - 웹 페이지를 구조적으로 나타내는 문서
  - **데이터**
- CSS
  - HTML 파일을 이쁘게 꾸며주는 역활
  - **디자인**
- JavaScript
  - 객체 기반의 스크립트 프로그래밍 언어
  - 사용자의 편의성을 보장
  - **동작**





##### 5) Backend(웹 서버, DB 서버, 웹 프레임 워크) 

사용자가 요청을 받아서, 저장되어 있는 정보를 바탕으로 사용자에게 적절한 페이지를 전송

- 웹 서버(Apache, IIS, nginx, GWS, etc.)
  - 사용자의 요청에 맞게 **데이터(HTML, image, etc.)를 전송**해주는 프로그램
- 데이터 베이스(MySql, Oracle, MsSql, PostgreSQL, LightSql, MongoDB, etc.)
  - 사용자의 정보를 저장하는 **저장소**
- 스크립트 엔진(php, jsp, asp)
  - 웹서버에서 **사용자의 요청을 분석**해주는 프로그램
- 웹 프레임 워크(Django, Ruby on Rails, ASP.NET, ect)
  - 웹 개발을 보다 편리하게 만들어 주는 도구
  - 생산성 향상
  - 정신 건강에 좋음
  - 하지만 유행이 있다.

**![DjangoArchitecture-JeffCroft.png](https://lh4.googleusercontent.com/HwAxHB3tdQsr4Uyh9Snv9xD3kigS3VSNBMSoR56w8aUMyoqnkVrwcUs88PMeOUuoBfFCZ3JAqKSmOUd4R_3PFyzBNAhZMLVu2SqlAnYbn1bnzujlqbjbM7MXckC_azvbEvs8k5uxFQ)**

##### 6) 프로젝트

커뮤니티의 베스트 글을 정리하여 보여주는 사이트

![project](project.png)



---

### 2. 웹 크롤러

##### 0) 개발환경

- 운영체제 : Ubuntu
- 언어 : Python 2.X
- 사용 라이브러리 : [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/), [Scrapy](http://scrapy.org/)





###### 웹페이지 구조 확인하기

크롬 & 파이어폭스에서 마우스 우클릭, **Inspect element**



##### 1) Beautiful Soup VS Scrapy

- BeautifulSoup
  - html문서에서 원하는 정보를 손쉽게 가져올 수 있는 방법을 제공
  - 자동으로 인코딩을 유니코드로 변환해서 UTF-8로 출력
  - lxml, html5lib **파서**를 이용함
    - **파서의 역할**이 강하다.
  - http://www.crummy.com/software/BeautifulSoup/bs4/doc/
- Scrapy
  - web scraper framework
  - 다양한 selector지원
  - 파이프 라인 : 필터링
  - 로깅
  - 이메일
  - http://doc.scrapy.org/en/0.24/intro/tutorial.html



##### 2) Crontab

리눅스의 기본 서비스, 정해진 시간에 정해진 스크립트를 시작할 수 있다.

- `/etc/crontab` 편집을 통해 사용 가능

- 설정 가능 항목

  - 분(0-59)
  - 시간(0-23)
  - 일(1-31)
  - 월(1-12)
  - 요일(0-6)(0=일요일)
  - 사용자명령어

- 실행 확인

  ```bash
  $ grep CRON /var/log/syslog
  ```

**![img](https://lh3.googleusercontent.com/w4nj1Il1KGgJitBOgSJ0jg973P_CLE7ylzIjhjhnxQOQrPvbIfiAuyrNrk65iLMTw2t6PNM9Gsx2vb1s7b0BlfYi4ufBTKa7ULLaAffS-fWmAwinEhdbFa_BCn720uOqPmYSoaxVYg)**

---

### 3. Scrapy 웹 크롤링

##### 1) 웹 크롤링 이슈

###### 저작권

- 저작권법 허용
  - 단순 링크 : 사이트 대표 주소를 링크
  - 직접 링크 : 특정 게시물을 링크
- 저작권법 위반
  - 프레임 링크 : 저작물의 일부를 홈페이지에 표시
  - 임베드 링크 : 저작물 전체를 홈페이지에 표시
- 출처
  - http://www.mediatoday.co.kr/news/articleView.html?idxno=36469
  - http://lawnews.tistory.com/24
- 엔하 위키 vs 저작권 문제
  - http://blog.novatatis.com/161
  - 무단 미러링 부당경쟁행위는 인정, 저작권법 위반은 불인정
  - http://m.ddaily.co.kr/m/m_article.html?no=130822





###### 로봇 배제 표준(robots.txt)

- 웹 사이트에 로봇이 접근하는 것을 방지하기 위한 규약
- 실제 사이트의 robots.txt : [뽐뿌](http://www.ppomppu.co.kr/robots.txt), [클리앙](https://www.clien.net/robots.txt), [SLR클럽](http://www.slrclub.com/robots.txt)





##### 2) Scrapy

###### 구조

```bash
scrapy startproject [프로젝트 명]
```

![scrapy](scrapyproject.png)

- `spiders` : 크롤링 로직이 들어 있는 디렉토리
- `items.py` : 대상에 대한 정보 등을 정의
- `pipelines.py` : 저장된 정보를 가지고 크롤링한 이후의 처리 작업
- `scrapy.cfg` : 전체 프로젝트 배포 시의 설정, 로그 변경 가능
- `settings.py` : scrapy 프로젝트에 대한 설정




###### scrapy의 동작

- items 정의
- 스타트 url 지정(start_requests, start_urls, callback 함수 지정(parse())
  - `start_url` : list file, string list
  - `start_requests` : 특정한 url에 대해서  callback 함수 지정 가능
- callback함수 정의
  - selector(xpath, css)를 이용하여 데이터를 선택
- items.py에 데이터 넣는다.


- Pipeline을 이용하여 데이터를 필터링 하거나 데이터베이스에 저장





###### Spiders

- 크롤러의 이름 지정
  - `name`
- 스타트 URL 지정
  - `start_urls`
    - 시작 주소를 리스트 형태로 추가 가능
  - `start_request`
    - 콜백함수를 지정 할 수 있음
    - 사이트에 로그인을 할 때 사용
- 파서 정의
  - `def parse(self, response):`
- 여러개 지정해서 순차적으로 돌려도 되고, 필요한 것만 돌려도 된다.





###### Selector

- HTML 문서에 특정 노드를 선택
  - css vs xpath selector





###### Pipeline

- 데이터를 크롤링 한 이후에 특정 행동을 수행

  - 데이터의 유효성 검사
  - 중복 체크
  - 데이터베이스에 아이템 저장
  - 필터링

- settings.py

  - 파이프 클래스 및 순서를 지정

    ```python
    ITEM_PIPELINES = {
       'oneq.pipelines.CommunityPipeline': 300,
    }
    ```




###### Logging

- Settings.py

  - `LOG_FILE = ‘logfile.log’`
  - `LOG_LEVEL = logging.DEBUG`

- Log Level

  ```
  logging.CRITICAL - for critical errors (highest severity)
  logging.ERROR - for regular errors
  logging.WARNING - for warning messages
  logging.INFO - for informational messages
  logging.DEBUG - for debugging messages (lowest severity)
  ```




##### 3) 웹사이트 크롤링 실전

- clien.net


- bobaedream.co.kr