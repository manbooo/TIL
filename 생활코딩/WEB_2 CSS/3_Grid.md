## Grid

### 그리드의 기본 사용법

#### 1. `div`와 `span`

```html
<div>NAVIGATION</div>
<div>ARTICLE</div> 

<span>NAVIGATION</span>
<span>ARTICLE</span> 
```

- `div`는 Block level
- `span`은 Inline element



#### 2. Grid

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      #grid{
        border: 5px solid pink;
        display: grid;
        grid-template-columns: 150px 1fr;
      }

      div{
        border: 5px solid gray;
      }
    </style>
  </head>
  <body>
    <div id="grid">
      <div>NAVIGATION</div>
      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div>
  </body>
</html>
```



- https://caniuse.com/



### 그리드 써먹기

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
  </style>
</head>
<body>
  <h1><a href="index.html">WEB</a></h1>

  <div id="gird">
    <ol>
      <li><a href="1.html" class="saw">HTML</a></li>
      <li><a href="2.html" class="saw" id="active">CSS</a></li>
      <li><a href="3.html">JavaScript</a></li>
    </ol>

    <div>
      <h2>CSS</h2>
      <p>
        Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language.[1] Although most often used to set the visual style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications.
      </p>
    </div>
  </div>


  </body>
  </html>
```



### Grid 기능의 호환성

- [https://caniuse.com/#feat=css-grid ](https://caniuse.com/#feat=css-grid) 