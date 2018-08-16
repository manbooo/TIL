## props 와 state

- props : 부모 컴포넌트가 자식 컴포넌트에게 주는 값
  - 자식 컴포넌트에서는 받아온 props 를 직접 수정 할 수 없다.
- state : 컴포넌트 내부에서 선언하며 내부에서 값을 변경 가능



### 새 컴포넌트 만들기

#### 1) 실습

##### src/MyName.js

```react
import React, { Component } from 'react';

class MyName extends Component {
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
      </div>
    );
  }
}

export default MyName;
```

- 자신이 받아온 props 값은 `this.` 키워드를 통하여 조회
- name이라는 props를 보여주도록 설정



##### 컴포넌트 사용 : src/App.js

```react
import React, { Component } from 'react';
import MyName from './MyName';

class App extends Component {
  render() {
    return (
      <MyName name="리액트" />
    );
  }
}

export default App;
```

- import 를 통하여 컴포넌트를 불러오고, 렌더링 
- props 값은 `name="리액트"` 이런식으로 태그의 속성을 설정



#### 2) defaultProps

- 실수로 props 를 빠트려먹을때
- 특정 상황에 props 를 일부러 비워야 할 때
-  props 의 기본값을 설정 가능



##### src/MyName.js

```react
import React, { Component } from 'react';

class MyName extends Component {
  static defaultProps = {
    name: '기본이름'
  }
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
      </div>
    );
  }
}

export default MyName;
```



```react
import React, { Component } from 'react';

class MyName extends Component {
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
      </div>
    );
  }
}

MyName.defaultProps = {
  name: '기본이름'
};

export default MyName;
```



#### 3) 함수형 컴포넌트

- 단순히 props 만 받아와서 보여주기만 하는 컴포넌트의 경우
- state 와 LifeCycle 이 빠져있다 
- 컴포넌트 초기 마운트가 아주 미세하게 빠르다
- 메모리 자원을 덜 사용 

```react
import React from 'react';

const MyName = ({ name }) => {
  return (
    <div>
      안녕하세요! 제 이름은 {name} 입니다.
    </div>
  );
};

export default MyName;
```



### state

- 동적인 데이터를 다룰 경우

##### src/Counter.js

```react
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0
  }

  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
```



#### 1) state 정의

- 컴포넌트의 state를 정의할 때는 [class fields](https://babeljs.io/docs/plugins/transform-class-properties/) 문법을 사용해서 정의
- class fields 를 사용하지 않을 경우

```react
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
  }

  ...
}
```

- constructor 에서 `super(props)` 를 호출한 이유 
  - 컴포넌트를 만들게 되면서, Component 를 상속했으며, 이렇게 constructor 를 작성하게 되면 기존의 클래스 생성자를 덮어씀
  - 리액트 컴포넌트가 지니고있던 생성자를 super 를 통하여 미리 실행 후 그 다음에 할 작업 (state 설정)  실행
- 동시에 사용한다면 class fields 가 먼저 실행되고, 그 다음에 constructor 에서 설정된 것 



#### 2) 메소드 작성

``` react
handleIncrease() {
    this.setState({
        number: this.state.number + 1
    });
}

handleDecrease() {
    this.setState({
        number: this.state.number - 1
    });
}
```

- 버튼에서 클릭이벤트가 발생 했을 때, this 가 undefined 로 나타나서 제대로 처리되지 않는다.

  - 함수가 버튼의 클릭이벤트로 전달이 되는 과정에서 “this” 와의 연결이 끊겨버리기 때문

- 이를 고치기 위해선 constructor에 추가

  ```react
  constructor(props) {
      super(props);
      this.handleIncrease = this.handleIncrease.bind(this);
      this.handleDecrease = this.handleDecrease.bind(this);
  }
  ```

- 혹은 화살표 함수 형태로 작성

  ```react
  handleIncrease = () => {
      this.setState({
          number: this.state.number + 1
      });
  }
  
  handleDecrease = () => {
      this.setState({
          number: this.state.number - 1
      });
  }
  ```



#### 3) setState

- state 에 있는 값을 바꾸기 위해서는, this.setState 를 무조건 거쳐야 한다.

- 리액트에서는 이 함수가 호출되면 컴포넌트가 리렌더링 되도록 설계 

- 객체로 전달되는 값만 업데이트

- 예제 1

  ```react
  state = {
      number: 0,
      foo: 'bar'
  }
  ```

  - this.setState({ number: 1 }); 을 하게 된다면, foo 는 그대로 남고, number 값만 업데이트

- 예제 2 : setState 는 객체의 깊숙한곳 까지 확인 불가능

  ```react
  state = {
      number: 0,
      foo: {
          bar: 0,
          foobar: 1
      }
  }
  
  this.setState({
      foo: {
          foobar: 2
      }
  })
  
  // 결과물
  {
      number: 0,
          foo: {
              foobar: 2
          }
  }
  ```

  - 위와 같은 상황의 해결책
    - `…` 은 자바스크립트의 [전개연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator) 
    - 기존의 객체안에 있는 내용을 해당 위치에다가 풀어준다는 의미
    - 간단하게 작업하기 위해  [immutable.js](https://velopert.com/3486) 혹은 [immer.js](https://github.com/mweststrate/immer) 를 사용

  ```react
  this.setState({
      number: 0,
      foo: {
          ...this.state.foo,
          foobar: 2
      }
  });
  ```



#### 4) setState에 객체 대신 함수를 전달하기

```react
this.setState({
    number: this.state.number + 1
});

this.setState(
    (state) => ({
        number: state.number
    })
);

this.setState(
    ({ number }) => ({
        number: number + 1
    })
);

const { number } = this.state;
this.setState({
  number: number + 1
})
```

- `({ number })` : [비구조화 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

  ```react
  const { number } = this.state;
  ```



#### 5) 이벤트 설정

```react
render() {
    return (
        <div>
            <h1>카운터</h1>
            <div>값: {this.state.number}</div>
            <button onClick={this.handleIncrease}>+</button>
            <button onClick={this.handleDecrease}>-</button>
        </div>
    );
}
```

- 리액트에서 이벤트 함수를 설정할때 html 과 다음과 같은 사항이 다릅니다.
  - 이벤트이름을 설정 할 때 camelCase 로 설정
    - onclick 은 onClick, onmousedown 은 onMouseDown, onchange 는 onChange
  - 이벤트에 전달해주는 값은 **함수**
    - 만약에 `onClick={this.handleIncrease()}` 이런식으로 하게 된다면, 렌더링을 할 때 마다 해당 함수가 호출
    - 렌더링 -> 함수 호출 -> setState -> 렌더링 -> 함수 호출 -> 무한반복
  - 렌더링 함수에서 이벤트를 설정 할 때 여러분이 만든 메소드를 호출하지 말 것



##### src/App.js

```react
import React, { Component } from 'react';
import Counter from './Counter';

class App extends Component {
  render() {
    return (
      <Counter />
    );
  }
}

export default App;
```

