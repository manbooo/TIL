## CSS box model

### HTML element

```css
/*
	block level element
*/
h1 {
    border-width: 5px;
    border-color: solid;
    border-color: red;
}

/*
	inline element
*/
a {
    border-width: 5px;
    border-color: solid;
    border-color: red;
}
```

- `block level element` : 화면 전체를 사용
  - 가로 길이가 기본적으로 100%
  - `width`, `height` 속성을 지정 가능
- `inline element` : 자신 컨텐츠 크키 만큼 사용
  - `width`와 `height`를 지정 불가



#### 1. `display` 속성

- `none` : 보이지 않음(영역 차지 X)
- `block` : 블록 박스
- `inline` : 인라인 박스
- `inline-block` : block과 inline의 중간 형태
  - 줄 바꿈이 되지 않지만 크기 지정 가능



#### 2. 중복제거

- 원래 코드

```css
h1 {
    border-width: 5px;
    border-color: solid;
    border-color: red;
}


a {
    border-width: 5px;
    border-color: solid;
    border-color: red;
}
```



- 1차 중복 제거

```css
h1, a {
    border-width: 5px;
    border-color: solid;
    border-color: red;
}
```



- 2차 중복 제거

```css
h1, a {
    border: 5px, solid, red;
}
```



### Box model

```css
h1{
	border:5px solid red;
	padding:20px; /* 여백 */
	margin:20px; /* 간격 */
	display:block; /* h1은 block level element이기 때문에 생략 가능 */
	width:100px;
}
```

![CSS Box model](https://mdn.mozillademos.org/files/13647/box-model-standard-small.png)



## Box model 사용

```html
<!doctype html>
<html>
<head>
  <title>WEB - CSS</title>
  <meta charset="utf-8">
  <style>
    body{
      margin:0;
    }
    #active {
      color:red;
    }
    .saw {
      color:gray;
    }
    a {
      color:black;
      text-decoration: none;
    }
    h1 {
      font-size:45px;
      text-align: center;
      border-bottom:1px solid gray;
      margin:0;
      padding:20px;
    }
    ol{
      border-right:1px solid gray;
      width:100px;
      margin:0;
      padding:20px;
    }
  </style>
</head>
<body>
  <h1><a href="index.html">WEB</a></h1>
  <ol>
    <li><a href="1.html" class="saw">HTML</a></li>
    <li><a href="2.html" class="saw" id="active">CSS</a></li>
    <li><a href="3.html">JavaScript</a></li>
  </ol>
  <h2>CSS</h2>
  <p>
    Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language.[1] Although most often used to set the visual style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications.
  </p>
  </body>
  </html>
```

