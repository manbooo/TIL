# JSX

- https://velopert.com/867

##### 0) react project 생성

```bash
$ create-react-app hello-jsx
```

---

### 0. JSX 란

-  React.js 에서 사용되는 문법
-  일반 JavaScript 문법이 아닌 **JSX** 문법을 사용하여 UI를 템플릿화
-  JSX를 사용하는것이 **필수**는 아니지만 이를 사용하면 다음과 같은 장점이 존재
   -  JSX는 컴파일링 되면서 최적화 되므로, **빠르다**
   -  **Type-safe** (어떠한 연산도 정의되지 않은 결과를 내놓지 않는것, 즉 예측 불가능한 결과를 나타내지 않는 것 [출처: [jerrypop 블로그](http://blog.naver.com/jerrypop/40117130140)]) 하며 컴파일링 과정에서 **에러를 감지** 할 수 있다.
   -  HTML에 익숙하다면, JSX를 사용하여 **더 쉽고 빠르게** 템플릿을 작성 할 수 있다.

---

### 1.  JSX 사용

- JSX는 HTML이랑 거의 비슷하게 생김



##### 1) App.js

  ```jsx
import React from 'react';

class App extends React.Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      );
    }
  }

  export default App;
  ```

- **import React from 'react';** 
  - **import** 는 ES6 에 도입된 새로운 문법, var React = require(‘react’) 와 같다. 
  - **React** 모듈은 Component를 만들때 사용
- **class App extends React.Component** 
  - **class** 개념 역시 ES6 에 새로 도입된 요소
  - 모든 Component는 **React.Component** 를 상속
  - ES5 환경에서는 React.createClass() 라는 메소드를 사용, ES5 에서 클래스를 만들때는 메소드들을 nest 할 수 없고 prototype을 사용
  - ES6 Class 에 대해서는 [Mozilla 참고자료](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes) 에서 확인
- **render() **
  - **render()** 메소드에서는 컴포넌트에 렌더링 될 데이터를 정의
- **return( ... ); ** line 7~17
  - 이 부분이 JSX의 가장 중요한 부분
  - 자바스크립트에서 html 태그를 반환
  - 따옴표가 없다. 
  - React JSX 는 **XML-like** Syntax 를 **native Javascript**로 변환
  - ” ” 로 감싸지 않는 점 주의 ( ) 를 사용하지 않아도 오류는 발생하지 않지만 가독성을 위하여 사용하는 것을 추천



##### 2) 확장자

- 요즘은 **.js** 를 사용하는 추세로 전환



##### 3) JSX vs JS

- JSX : <https://jsfiddle.net/reactjs/69z2wepo/>
- JS :  <https://jsfiddle.net/reactjs/5vjqabv3/>

---

### 2. Nested Elements

- 컴포넌트에서 여러 Element 를 렌더링 해야 할 때, 그 element들을 필수적으로 **container element** 안에 포함시켜줘야한다.

```jsx
return  (
            <h1> Hello Velopert</h1>
            <h2> Welcome </h2>
        );
```

```bash
ERROR in ./src/App.js
Module build failed: SyntaxError: /home/vlpt/node_tutorial/react/react-tutorials/03-jsx/src/App.js: Adjacent JSX elements must be wrapped in an enclosing tag (10:12)
   8 |         return  (
   9 |             <h1> Hello Velopert</h1>
> 10 |             <h2> Welcome </h2>
     |             ^
  11 |         );
  12 |     }
  13 | }
```

```jsx
return  (
            <div>
                <h1> Hello Velopert </h1>
                <h2> Welcome </h2>
            </div>
        );
```

---

### 3.  JavaScript Expression

##### 0) JSX 안에서 JavaScript 표현

- **{ }** 로 wrapping 

  ```jsx
  render(){
    let text = "Dev-Server"
    return  (
      <div>
        <h1> Hello Velopert </h1>
        <h2> Welcome to {text}</h2>
      </div>
    );
  }
  ```

  - **let text = "Dev-Server"**
    - ES6 에 도입된 키워드
    - var 과 비슷하지만, var 변수의 scope는 기본적으로 함수 단위인데 let 은 블럭 범위 내에서 변수를 선언
    -  javascript 의 Scope관련 문제를 해결
    -  ES6 에선 평상시 let 을 쓰고 var은 필요한 상황에서만 사용하는게 좋다
    - let : [Mozilla 참고자료](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let)
  - **<h2> Welcome to {text}</h2>**
    - `{ text }` 를 사용하여 text Javascript 변수를 렌더링



##### 1) 임의 method 생성 및 사용하기

```jsx
sayHey(){
  alert("hey");
}

render(){
  let text = "Dev-Server"
  return  (
    <div>
      <h1> Hello Velopert </h1>
      <h2> Welcome to {text}</h2>
      <button onClick={this.sayHey}>Click Me</button>
    </div>
  );
}
```

- **<button onClick={this.sayHey}>Click Me</button>**
  - `{this.sayHey}` 를 통해 버튼이 클릭되면 해당 메소드가 실행
  -  () 가 뒤에 안붙어있다는점을 주의
    - 만약에 () 가 붙으면 페이지가 로드 될때도 실행되고, 클릭할때도 실행



##### 2) if-else 문 사용 불가

- JSX 안에서 사용되는 JavaScript 표현에는 If-Else 문이 사용 불가
- **ternary **(`condition ? true : false`) 표현을 사용
  - `<p>{1 == 1 ? 'True' : 'False'}</p>`

---

### 4. Iline Style

- Inline Style 에서는, string 형식이 사용되지 않고 key 가 [camelCase](https://en.wikipedia.org/wiki/CamelCase) 인 Object 가 사용

  ```jsx
  render(){
    let text = "Dev-Server";

    let pStyle = {
      color: 'aqua',
      backgroundColor: 'black'
    };

    return  (
      <div>
        <h1> Hello Velopert </h1>
        <h2> Welcome to {text}</h2>
        <button onClick= {this.sayHey}>Click Me</button>
        <p style = {pStyle}>{1 == 1 ? 'True' : 'False'}</p>
      </div>
    );
  }
  ```

---

### 5. 주석

- `{ /* comments */ }`
- **2. Nested Element **에서 나왔던 것 처럼 **container element **안에 주석이 작성

---

### 6. Naming Convention

- React Component 은 첫 문자가 대문자인 CamelCase 로 작성

