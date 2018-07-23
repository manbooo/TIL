## API

### API

- 시간, 돈, 인력 소요가 심하다.
- 맨땅에 헤딩하지 말자.
- 있는걸 잘 사용해보자



### [Firebase](https://firebase.google.com/?hl=ko)

#### 1. 장점

- 실시간 데이터베이스
  - 실시간 채팅
- 인증
  - 로그인 : 구글, 페이스북, 깃 등 인증, 이메일 로그인 기능도 구현이 간단함
  - 간단한 인증
  - 다양하고 간편한 로그인
- Cloud Storage
  - 각종 파일 저장소
  - 서버에서 저장소를 설계하지 않고 read/write 가능
- 성능 모니터링
  - 성능 진단 및 문제 분석
  - 개발 중(beta 버전)

- 원하는 것을 빠르게
  - 검색을 통해 만든 서비스는 문제점이 발생 (완벽하지 않은 예제)



#### 2. 실습

##### Setup_Firebase

- https://console.firebase.google.com/ 접속
- 프로젝트 추가 `FireKakao`
- '설정'의 '사용자 및 권한' 구성원 추가



- Authentication > 로그인 방법 > 이메일/비밀번호 사용 설정
  - 사용자 추가
    - 식별자 : Email
    - 사용자 UID : 사용자 정보 암호화
    - 비밀번호는 감춰짐, 실제로도 암호화되어서 저장



- DataBase(Realtime Database)
  - JSON으로 데이터를 주고 받는다.
  - Key와 Value로 이루어져있다.
  - 데이터 접근은 주소값으로 
    - `https://firekakao-c12b5.firebaseio.com/4조/박주연`
  - 데이터베이스 규칙
    - 데이터 접근 및 수정 권한에 대한 내용



- 웹 앱에 Firebase 추가
  - 이 정보는 노출되지 않는 것이 좋다.
  - API key는 노출되면 안된다.



##### Setup_Git

- 2주차 폴더 안에 조장이 조 디텍토리를 만들고 push
- 조장의 push가 끝나면 각 조원들은 pull 하여 본인의 디렉토리 생성
- 본인의 브랜치를 따서 push



##### 로그인 프레임

- index.html

```html
<div class="frame" id="login-frame">
    <h1 class="title">Login</h1>

    <input class="inputs" type="email" name="emali" placeholder="Email">
    <input class="inputs" type="password" name="password" placeholder="Password">

    <button class="buttons">Login</button>
    <button class="buttons">Sign In</button>
</div>
```

- style.css

```css
@import url(http://fonts.googleapis.com/earlyaccess/jejugothic.css);
body {
  font-family: 'Jeju Gothic', serif;
}

.frame {
  width: 250px;
  height: 250px;
  position: fixed;

  top: 50%;
  right: 0;
  left: 0;
  transform: translate(0, -50%);

  padding: 50px;
  margin: auto;

  border-radius: 10px;

  box-shadow: 3px 3px 7px 7px rgba(0, 0, 0, 0.2);

  text-align: center;
}

.title {
  color: #58ACFA;

  text-align: center;

  font-size: 35px;
  font-weight: bold;

  margin: 10px;
}

.inputs {
  background: rgb(239, 239, 239);

  width: 220px;
  height: 30px;

  padding: 0 15px;
  margin: 5px 0px;

  border: none;
  border-radius: 3px;

  font-family: 'Jeju Gothic';
  font-size: 15px;
}

.buttons {
  background: #58ACFA;
  color: #ffffff;

  width: 250px;
  height: 30px;

  margin: 5px 0px;

  border: none;
  border-radius: 5px;

  font-size: 15px;
  font-weight: bold;
}

#login-frame {
  display: none;
}
```



##### 데이터가 입력되면 데이터를 웹에 출력하는 프레임

- index.html

```html
<div class="frame" id="db-upload-frame">
    <h1 class="title">DB Upload</h1>

    <input class="inputs" type="text" name="emali" placeholder="Email">

    <pre id="real-time-val"></pre>

    <button class="buttons">Logout</button>
</div>
```

- style.css

```css
#real-time-val {
  display: block;

  background: #D8D8D8;

  width: 250px;
  height: 40px;

  padding: 5px 0;

  word-break: break-all;
  white-space: pre-wrap;
  overflow-y: scroll;

  font-family: 'Jeju Gothic';
  font-size: 15px;
}
```



##### 화면 전환

- index.html

```html
<script src="script.js"></script>
```

- script.js

```js
function signup() {
  console.log("회원가입");
}

function login() {
  console.log("로그인");
  $("#login-frame").hide();
  $("#db-upload-frame").show();
}

function logout() {
  console.log("로그아웃");
  $("#db-upload-frame").hide();
  $("#login-frame").show();
}


$("#login-btn").click(
  function() {
    login();
  }
);

$("#logout-btn").click(
  function() {
    logout();
  }
);
```



##### Firebase

- [Javascript Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [동기, 비동기, 프라미스](https://firebase.google.com/docs/functions/terminate-functions?hl=ko#how_promises_work_with_functions)



- index.html : Firebase 연동

```html
<script src="https://www.gstatic.com/firebasejs/5.3.0/firebase.js"></script>
<script src="Firebase.js"></script>
```

- script.js : [로그인, 회원가입](https://firebase.google.com/docs/auth/web/start?authuser=0)

```js
function signup() {
  firebase.auth().createUserWithEmailAndPassword(getEmail(), getPassword())
    .then(
      function(success) {
        console.log(success);
        alert("회원가입 성공");
      }, function(error) {
        console.log(error);
        alert("회원가입 실패");
      }
    );
  console.log("회원가입");
}

$("#signup-btn").click(
  function() {
    signup();
  }
);

function login() {
  firebase.auth().signInWithEmailAndPassword(getEmail(), getPassword())
  .then(
    function(success) {
      console.log(success);
      alert("로그인 성공");
      $("#login-frame").hide();
      $("#db-upload-frame").show();
    }, function(error) {
      console.log(error);
      alert("로그인 실패");
    }
  );
  
  console.log("로그인 함수 실행 끝");
}

function logout() {
  console.log("로그아웃");
  $("#db-upload-frame").hide();
  $("#login-frame").show();
}


$("#login-btn").click(
  function() {
    login();
  }
);

$("#logout-btn").click(
  function() {
    logout();
  }
);

function getEmail() {
  return $("#email").val();
}

function getPassword() {
  return $("#password").val();
}

function setDBdata(data) {
  $("#real-time-val").text(data);
}
```

- script.js : [데이터베이스 연동](https://firebase.google.com/docs/database/web/read-and-write?hl=ko)
  - [이벤트 수신](https://firebase.google.com/docs/database/web/retrieve-data?hl=ko)

```js
function uploadDB() {
    firebase.database().ref().set(
      {
        groupChat: $("#input-txt").val()
      }
    );
}

function uploadDBListenner() {
  firebase.database().ref().on('child_changed', function(data) {
    $("#real-time-val").text(data.val());
  });
}

$("#send-btn").click(
  function() {
    uploadDB();
  }
);
```

