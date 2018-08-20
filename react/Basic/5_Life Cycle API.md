## Life Cycle API

- 컴포넌트가 여러분의 브라우저에서 나타날때, 사라질때, 그리고 업데이트 될 때, 호출되는 API 



### 컴포넌트 초기 생성

#### 1) constructor

```react
constructor(props) {
  super(props);
}
```

- 컴포넌트 생성자 함수
- 컴포넌트가 새로 만들어질 때마다 호출



#### 2) componentWillMount

```react
componentWillMount() {

}
```

- 컴포넌트가 화면에 나가기 직전에 호출
- 주로 브라우저가 아닌 환경에서(서버사이드) 호출하는 용도로 사용
- 더 이상 필요하지 않게 되어 리액트 v16.3 에서는 해당 API 가 deprecated
-  v16.3 이후부터는 `UNSAFE_componentWillMount()` 라는 이름으로 사용
- `constructor` 와 `componentDidMount` 에서 충분히 처리 



#### 3) componentDidMount

```react
componentDidMount() {
  // 외부 라이브러리 연동: D3, masonry, etc
  // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
  // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
}
```

- 컴포넌트가 화면에 나타나게 됐을 때 호출
- 외부 라이브러리 연동
- 필요한 데이터 요청
- DOM의 속성을 읽거나 직접 변경하는 작업



### 컴포넌트 업데이트

- props 의 변화, state 의 변화에 따라 결정 



#### 1) componentWillReceiveProps

```react
componentWillReceiveProps(nextProps) {
  // this.props 는 아직 바뀌지 않은 상태
}
```

- 새로운 props 를 받게됐을 때 호출
- state가 props에 따라 변해야 하는 로직 작성
- 새로 받게될 props 는 nextProps 로 조회
- this.props 를 조회하면 업데이트 되기 전의 props
- v16.3 부터는 `UNSAFE_componentWillReceiveProps()` 라는 이름으로 사용 
-  상황에 따라 [getDerivedStateFromProps](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) 로 대체



#### 2) static getDerivedStateFromProps()

```react
static getDerivedStateFromProps(nextProps, prevState) {
  // 여기서는 setState 를 하는 것이 아니라
  // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
  // 사용됩니다.
  /*
  if (nextProps.value !== prevState.value) {
    return { value: nextProps.value };
  }
  return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
  */
}
```

- props로 받아온 값을 state로 동기화 하는 작업



#### 3) shouldComponentUpdate

```react
shouldComponentUpdate(nextProps, nextState) {
  // return false 하면 업데이트를 안함
  // return this.props.checked !== nextProps.checked
  return true;
}
```

- 컴포넌트 최적화하는 작업에서 사용
- 리액트는 변화가 발생하는 부분만 업데이트
  - 변화가 발생한 부분만 감지해내기 위해 Virtual DOM에 한번 그려줘야 함
  - 현재 컴포넌트의 상태가 업데이트되지 않아도 부모 컴포넌트가 리렌더링되면 자식 컴포넌트들도 렌더링(render() 함수가 호출)  
  - 변화가 없으면 물론 DOM 조작은 하지 않는다.(Virutal DOM 에만 렌더링)
-  Virtual DOM 에 리렌더링 하는 것을 불필요할 경우엔 방지하기 위해서 shouldComponentUpdate 를 사용
- 기본적으로 true 를 반환 
- 조건에 따라 false 를 반환하면 해당 조건에는 render 함수를 호출하지 않는다.



#### 4) componentWillUpdate

```react
componentWillUpdate(nextProps, nextState) {

}
```

- shouldComponentUpdate 에서 true 를 반환했을때만 호출 
- 애니메이션 효과를 초기화 
- 이벤트 리스너를 없애는 작업 
- 함수가 호출되고난 다음에는, render() 가 호출 
- v16.3 이후 deprecate. 기존의 기능은 [getSnapshotBeforeUpdate](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate) 로 대체 



#### 5) getSnapshotBeforeUpdate()

```react
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // DOM 업데이트가 일어나기 직전의 시점입니다.
    // 새 데이터가 상단에 추가되어도 스크롤바를 유지해보겠습니다.
    // scrollHeight 는 전 후를 비교해서 스크롤 위치를 설정하기 위함이고,
    // scrollTop 은, 이 기능이 크롬에 이미 구현이 되어있는데, 
    // 이미 구현이 되어있다면 처리하지 않도록 하기 위함입니다.
    if (prevState.array !== this.state.array) {
      const {
        scrollTop, scrollHeight
      } = this.list;

      // 여기서 반환 하는 값은 componentDidMount 에서 snapshot 값으로 받아올 수 있습니다.
      return {
        scrollTop, scrollHeight
      };
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      const { scrollTop } = this.list;
      if (scrollTop !== snapshot.scrollTop) return; // 기능이 이미 구현되어있다면 처리하지 않습니다.
      const diff = this.list.scrollHeight - snapshot.scrollHeight;
      this.list.scrollTop += diff;
    }
  }
```

- 발생하는 시점
  - render()
  - **getSnapshotBeforeUpdate()**
  - 실제 DOM 에 변화 발생
  - componentDidUpdate
- DOM 변화가 일어나기 직전의 DOM 상태를 가져오고, 여기서 리턴하는 값은 componentDidUpdate 에서 3번째 파라미터로 전달



#### 6) componentDidUpdate

```react
componentDidUpdate(prevProps, prevState, snapshot) {

}
```

- render() 를 호출하고난 다음에 발생 
- 이 시점에선 this.props 와 this.state 가 바뀌어있다.
- 파라미터를 통해 이전의 값인 prevProps 와 prevState 를 조회 가능
- getSnapshotBeforeUpdate 에서 반환한 snapshot 값은 세번째 값



### 컴포넌트 제거

#### 1) componentWillUnmount

```react
componentWillUnmount() {
  // 이벤트, setTimeout, 외부 라이브러리 인스턴스 제거
}
```

- 등록했었던 이벤트를 제거
- setTimeout 을 걸은 것이 있다면 clearTimeout 을 통하여 제거
- 외부 라이브러리를 사용한게 있고 해당 라이브러리에 dispose 기능이 있다면 여기서 호출 



### 직접 사용해보기

##### src/Counter.js

```react
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0
  }

  constructor(props) {
    super(props);
    console.log('constructor');
  }
  
  componentWillMount() {
    console.log('componentWillMount (deprecated)');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 5 의 배수라면 리렌더링 하지 않음
    console.log('shouldComponentUpdate');
    if (nextState.number % 5 === 0) return false;
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }
  

  handleIncrease = () => {
    const { number } = this.state;
    this.setState({
      number: number + 1
    });
  }

  handleDecrease = () => {
    this.setState(
      ({ number }) => ({
        number: number - 1
      })
    );
  }
  
  render() {
    console.log('render');
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



### 컴포넌트에 에러 발생

- render 함수에서 에러가 발생하면 리액트 앱이 크래쉬



#### 1) componentDidCatch

```react
componentDidCatch(error, info) {
  this.setState({
    error: true
  });
}
```

- 에러가 발생하면 이런식으로 componentDidCatch 가 실행

- state.error 를 true 로 설정하게 하고, render 함수쪽에서 에러를 띄워준다

- 주의 할 점

  - 컴포넌트 자신의 render 함수에서 에러가 발생해버리는것은 잡아낼 수 없다.
  - 컴포넌트의 자식 컴포넌트 내부에서 발생하는 에러를 잡아낼 수 있다.

- 예시

  - Problematic 이라는 컴포넌트를 만들고 이 값이 4가 되면 렌더링을 하도록 설정 

  ```react
  import React, { Component } from 'react';
  
  const Problematic = () => {
    throw (new Error('버그가 나타났다!'));
    return (
      <div>
        
      </div>
    );
  };
  
  class Counter extends Component {
    // ... 생략
    
    render() {
      return (
        <div>
          <h1>카운터</h1>
          <div>값: {this.state.number}</div>
          { this.state.number === 4 && <Problematic /> }
          <button onClick={this.handleIncrease}>+</button>
          <button onClick={this.handleDecrease}>-</button>
        </div>
      );
    }
  }
  
  export default Counter;
  ```

  - componentDidCatch 를 통하여 자식 컴포넌트에서 발생한 에러를 잡는다.

  ```react
  import React, { Component } from 'react';
  
  const Promblematic = () => {
    throw (new Error('버그가 나타났다!'));
    return (
      <div>
        
      </div>
    );
  };
  
  class Counter extends Component {
    state = {
      number: 0,
      error: false
    }
  
    // (...)
    
    componentDidCatch(error, info) {
      this.setState({
        error: true
      });
    }
    
    render() {
      if (this.state.error) return (<h1>에러발생!</h1>);
  
      return (
        <div>
          <h1>카운터</h1>
          <div>값: {this.state.number}</div>
          { this.state.number === 4 && <Promblematic /> }
          <button onClick={this.handleIncrease}>+</button>
          <button onClick={this.handleDecrease}>-</button>
        </div>
      );
    }
  }
  
  export default Counter;
  ```

  > **렌더링 부분 오류 발생 원인** 
  >
  > 1. 존재하지 않는 함수를 호출(props로 받았을 줄 알았던 함수가 전달되지 않았을 때)
  >
  > ```react
  > this.props.onClick();
  > ```
  > 2. 배열이나 객체가 올 줄 알았는데, 해당 객체나 배열이 존재하지 않을 때
  >
  > ```react
  > this.props.object.value; // object is undefined
  > this.props.array.length; // array is undefined
  > ```
  > - 해결 방안 1 : render()에서 확인
  > ```react 
  > render() {
  >   if (!this.props.object || !this.props.array || this.props.array.length ===0) return null;
  >   // object 나 array 를 사용하는 코드
  > }
  > ```
  >
  > - 해결 방안 2 : defaultProps 사용
  >
  > ```react
  > class Sample extends Component {
  >   static defaultProps = {
  >     onIncrement: () => console.warn('onIncrement is not defined'),
  >     object: {},
  >     array: []
  >   }
  > }
  > ```
