## CSS 코드의 재사용

- html 파일 수정

```html
<head>
  <title>WEB1 - Welcome</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css">
</head>
```



- `style.css` 파일 생성

```css
body{
  margin:0;
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

#grid{
  display: grid;
  grid-template-columns: 150px 1fr;
}

#grid ol{
  padding-left:33px;
}

#grid #article{
  padding-left:25px;
}

@media(max-width:800px){
  #grid{
    display: block;
  }
  ol{
    border-right:none;
  }
  h1 {
    border-bottom:none;
  }
}
```



- 사용성이 높아진다
  - 내부 기능을 몰라도 사용 가능
- 효울성이 높아진다
- CSS 코드가 빠진 HTML을 받기 때문에 인터넷 비용 감소



- 네트워크 측면에서는 웹페이지 안에 CSS 내장이 더 효율적
- **Caching** 덕분에 한번 CSS 파일을 받으면 파일이 바뀌기 전까지 CSS  파일을 클라이언트 컴퓨터에 저장해 놓고 저장된 결과를 가져옴
  - 네트워크를 사용 안하기 때문에 속도 향상
  - 사업자들은 비용이 절감

