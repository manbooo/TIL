## JSX

### 컴포넌트 파일 파헤치기

![react-project](https://i.imgur.com/v4xX4Tr.png)

- 재사용 가능한 컴포넌트로 분리하여 작성 
- 프로젝트의 유지보수성을 우수하게
- 컴포넌트에 해당하는 코드는 App.js 에서 확인 



#### 1) App.js

```react
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
```

- import : 무엇을 불러온다는것 
- line 1 : 리액트와 그 내부의 Component를 불러온다.
  - 파일에서 JSX를 사용하려면 꼭 React 를 import 
- line 2~3 : 같은 디렉토리에 있는 파일 logo.svg 과 App.css 파일을 불러옴
- import 를 하는 것은 webpack 을 사용하기에 가능한 작업 
  - 프로젝트를 빌드하게 됐을 때 웹팩에서 파일의 확장자에 따라 다른 작업 
- CSS 파일을 불러올 경우 : 프로젝트에서 사용한 프로젝트를 한 파일에 모두 결합
- JS 파일을 불러올 경우 : 코드들이 제대로 로딩되게끔 순서를 설정하고 하나의 파일로 결합
  - 규칙에 따라 여러 파일로 분리해서 저장하는것도 가능 
- svg 처럼 사전에 따로 설정을 되지 않은 확장자의 경우 : 파일로서 불러온다음에 나중에 특정 경로에 사본을 만들어주게되고, 해당 사본의 경로를 텍스트로 받아옴



```react
class App extends Component {
  ...
}
```

- 클래스를 통해 컴포넌트를 만드는 것
- 함수를 통해서도 만들 수 있다.



```react
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
```

- 클래스 형태로 만들어지는 컴포넌트에는 `render` 함수가 필수
- 그 내부에서는 JSX로 return
  - HTML 같은 코드가 바로 JSX 



```react
export default App;
```

- 작성한 컴포넌트를 다른 곳에서 불러와서 사용할 수 있도록 내보내기



#### 2) index.js

```react
import App from './App';
```

- 우리가 만든 컴포넌트 불러오기



```react
ReactDOM.render(<App />, document.getElementById('root'));
```

- 브라우저 상에 리액트 컴포넌트를 보여줌
  - 첫번째 파라미터는 렌더링할 결과물
  - 두번째 파라미터는 컴포넌트를 어떤 DOM에 그릴지
- id가 root인 DOM을 찾아서 그리도록 설정
- 해당 DOM은 public/index.html에 존재



### JSX

#### 1) JSX를 사용하는 이유

![example1](https://i.imgur.com/SZshYmi.png)

- <http://bit.ly/2FJsJmo> 
- 리액트 개발을 쉽게 하기 위해서 HTML 과 비슷한 문법으로 작성
- 이를 React.createElement 를 사용하는 자바스크립트 형태로 변환
- XML 형태의 코드를 자바스크립트로 변환해야 하기 때문에 JSX를 제대로 사용하기 위해서 규칙 존재



#### 2) 실습 

##### 실습 준비 : src/App.js

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default App;
```



##### 꼭 닫혀야 하는 태그

- `<div>` 태그를 열었으면, `</div>` 를 통하여 태그를 꼭 닫아야 함
- `<input>` 이나 `<br>` 태그를 작성 할 때 태그를 안닫아을 경우 에러

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <input type="text">
      </div>
    );
  }
}

export default App;
```

![error](https://i.imgur.com/81aCSSu.png)



##### 감싸져 있는 엘리먼트

- 두개 이상의 엘리먼트는 무조건 하나의 엘리먼트로 감싸야 한다.

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        Hello
      </div>
      <div>
        Bye
      </div>
    );
  }
}

export default App;
```

![error](https://i.imgur.com/MaH158t.png)

- 에러 수정

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          Hello
        </div>
        <div>
          Bye
        </div>
      </div>
    );
  }
}

export default App;
```

-  [Fragment ](https://reactjs.org/docs/fragments.html)사용 

```react
import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div>
          Hello
        </div>
        <div>
          Bye
        </div>
      </Fragment>
    );
  }
}

export default App;
```



##### JSX 안에 자바스크립트 값 사용

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    const name = 'react';
    return (
      <div>
        hello {name}!
      </div>
    );
  }
}

export default App;
```

- const는 ES6에 도입된 키워드
  - 한번 선언하고 바뀌지 않는 값을 설정
  - 바뀌게 될 수 있는 값은 let을 사용
- var는 함수 단위
- const와 let는 블록 단위
- ES6 에서는 값을 선언 후 바꿔야 할 땐 let, 바꾸지 않을 땐 const 를 사용



##### 조건부 렌더링

- JSX 내부에서 조건부 렌더링을 할 때는 보통 삼항 연산자 혹은 AND 연산자를 사용
-  if 문을 사용 할 수는 없다.
  - 사용하려면 [IIFE](https://developer.mozilla.org/ko/docs/Glossary/IIFE)(즉시 실행 함수 표현) 을 사용
- 삼항 연산자

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        {
          1 + 1 === 2 
            ? (<div>맞아요!</div>)
            : (<div>틀려요!</div>)
        }
      </div>
    );
  }
}

export default App;
```

- AND 연산자

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        {
          1 + 1 === 2 && (<div>맞아요!</div>)
        }
      </div>
    );
  }
}

export default App;
```

- IIFE

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    const value = 1;
    return (
      <div>
        {
          (function() {
            if (value === 1) return (<div>하나</div>);
            if (value === 2) return (<div>둘</div>);
            if (value === 3) return (<div>셋</div>);
          })()
        }
      </div>
    );
  }
}

export default App;
```

- [화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98) 
  - this, arguments, super 개념이 없는 익명 함수
  - ES6에서 자주 사용

```react
(() => {
  if (value === 1) return (<div>하나</div>);
  if (value === 2) return (<div>둘</div>);
  if (value === 3) return (<div>셋</div>);
})()
```



##### style 과 className

- style
  - 객체 형태로 작성

```react
import React, { Component } from 'react';

class App extends Component {
  render() {
    const style = {
      backgroundColor: 'black',
      padding: '16px',
      color: 'white',
      fontSize: '12px'
    };

    return (
      <div style={style}>
        hi there
      </div>
    );
  }
}

export default App;
```

- 클래스 설정
  - 리액트 컴포넌트에서는 class 대신에 className 을 사용 

```css
.App {
  background: black;
  color: aqua;
  font-size: 36px;
  padding: 1rem;
  font-weight: 600;
}
```

```react
import React, { Component } from 'react';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        리액트
      </div>
    );
  }
}

export default App;
```



##### 주석

```react
{/* 주석 */}
// 주석
```

