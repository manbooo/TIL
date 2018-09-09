## HTML과 JavaScript의 만남

### script 태그

```html
<script>
      ...
</script>
```

- `script` 태그 안 쪽에는 JS가 위치



```html
1+1

<script>
    document.write(1 + 1)
</script>
```

- JavaScript는 동적
  - `1 + 1`의 결과값이 출력



### 이벤트

- JavaScript가 사용자와 상호작용 할 수 있도록 도와준다.
- 웹 브라우저에서 일어나는 사건
- [JavaScript Event](https://www.w3schools.com/js/js_events.asp)



#### 1. `onclick`

- 클릭 이벤트 발생 시 JavaScript 실행

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <input type="button" value="hi" onclick="alert('hi')">
  </body>
</html>
```

- `hi` 버튼을 클릭 했을 때 경고창이 뜨려면?
  - [JavaScript alert](https://www.w3schools.com/jsref/met_win_alert.asp) : `alert("Hello! I am an alert box!!");`
  - `onclick` : JavaScript 속성을 가진다. 이 속성값을 기억하고 있다가  JavaScript 실행



#### 2. `onchange`

- 내용 변화 이벤트 발생 시 JavaScript 실행

```html
<input type="text" onchange="alert('changed')">
```



#### 3. `onkeydown`

- keydown 이벤트 발생 시 JavaScript 실행
- https://www.w3schools.com/tags/ev_onkeydown.asp

```html
<input type="text" onkeydown="alert('key down!')">
```



### 콘솔

- 마우스 우클릭 후 검사 > Consol
- 개발자 도구 > Element에서 ESC
- 데이터를 처리 할 때 콘솔 창을 이용하여 JavaScript를 즉석으로 실행
-  그 웹 페이지를 대상으로 JavaScript 실행
- 예제 : https://gist.github.com/egoing/634d0bf5a79e56f6e66b965eaaa38aaf