# Section2. React.js 시작하기

### 0. codepen setup

##### 1) codepen : https://codepen.io

##### 2) setting

- Settings
  - JavaScript
    - JavaScript Preprocessor : Babel(ES6를 사용하기 위해서, ES6를 ES5로 변환)
    - Quick-add : React(Component), ReactDOM(DOM rendering)

---

### 1. First component 

##### 1) JS

```jsx
class Codelab extends React.Component {
	render() {
		return(
			<div> Codelab </div>
		);
	}
}

class App extends React.Component {
	render() {
		return(
			<Codelab />
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
```
- **class Codelab extends React.Component**
  - component : javascript class, **react를 상속** 받는다.
    -  [javascript class](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes) : ES6에 도입, class 사용 전 선언
    -  모든 React component는 **render() 메소드**를 가진다.
  - **JSX** 
    - XML-like syntax를 native JavaScript로 변경
    - ""로 감싸지 않는다
    - ()를 사용하지 않아도 오류가 발생하지 않는다. 가독성을 위해서 사용
- **ReactDOM.render(<App />, document.getElementById('root'));**
  - component rendering
  - page에 JSX 의 코드를 rendering
  - ReactDOM.render([rendering 할 JSX 코드], [component를 rendering 할 Element]);



##### 2)HTML

  ```html
  <div id="root"></div>
  ```
---

### 2. JSX 특징

##### 1) Nested Element

- 모든 JSX 형태의 코드는 container element 안에 포함시켜 줘야한다.



##### 2) JavaScript Expressoion

- JSX 안에서 JavaScript는 **{}**로 wrapping
- [let](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let) : ES6의 새로운 문법, block 범위, 한 번 선언하면 다시 선언 안됨



##### 3) Inline Style

- JSX 안에서 style을 설정할 때는, String 형식을 사용하지 않는다
- key가 camelCase인 객체가 사용



##### 4) Comments

- JSX 안에서 주석을 작성할 때에는 `{/* ... */}`
  - container element 안에 주석이 작성되어야 한다.



##### 5) codepen

- js

  ```jsx
  class Codelab extends React.Component {
    render() {
      let text = 'Hi i am codelab';
      
      let style = {
        color: 'aqua',
        backgroundColor: 'black'
      };
      
      return(
        <div style={style}>
          {/* This is How to use comments */}
          {text} 
        </div>
      );
    }
  }

  class App extends React.Component {
    render() {
      return(
        <Codelab />
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('root'));
  ```

---

### 3. props

##### 1) props란?

- 컴포넌트 내부의 Immutable data
- JSX 내부에 **`{this.props.propsName}`**
- 컴포넌트를 사용 할 때, <> 괄호 안에 **`propsName="value"`**
- `this.props.children`은 기본적으로 갖고있는 props
  - **`<Cpnt> 여기에 있는 값이 들어간다. </Cpnt>`** 



##### 1-1) codepen

- props 사용

  ```jsx
  class Codelab extends React.Component {
    render() {
      
      return(
        <div>
          <h1>Hello {this.props.name}</h1>
          <div>{this.props.children}</div>
        </div>
      );
    }
  }

  class App extends React.Component {
    render() {
      return(
        <Codelab name="jju"> 이 사이에 있는거 </Codelab>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('root'));
  ```

- App 컴포넌트의 props를 하위 컴포넌트에 전달

  ```jsx
  class Codelab extends React.Component {
    render() {
      
      return(
        <div>
          <h1>Hello {this.props.name}</h1>
          <div>{this.props.children}</div>
        </div>
      );
    }
  }

  class App extends React.Component {
    render() {
      return(
        <Codelab name={this.props.name}>
          {this.props.children}
        </Codelab>
      );
    }
  }

  ReactDOM.render(<App name="jju"> i'm your children </App>, document.getElementById('root'));
  ```

  ​

##### 2) 기본 값 설정

- `Component.defaultProps ={ ... } `

  ```jsx
  class App extends React.Component {
      render() {
          return (
              <div>{this.props.value}</div>
          );
      }
  };

  App.defaultProps = {
      value: 0
  };
  ```



##### 3) Type 검증

- `Component.**propTypes** = { ... }` 

  - https://reactjs.org/docs/components-and-props.html

  ```jsx
  class App extends React.Component {
      render() {
          return (
              <div>
                   {this.props.value}
                   {this.props.secondValue}
                   {this.props.thirdValue}
              </div>
          );
      }
  };

  App.propTypes = {
      value: React.PropTypes.string,
      secondValue: React.PropType.number,
      thirdValue: React.PropTypes.any.isRequired
  };
  ```



##### 4) 적용하기 : codepen

- Settings 변경

  - Add External Scripts/Pens

    - https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js은 에러가 뜨지 않는다
    - https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.js 로 변경 

  ```jsx
  class Codelab extends React.Component {
    render() {
      
      return(
        <div>
          <h1>Hello {this.props.name}</h1>
          <h2>{this.props.number}</h2>
          <div>{this.props.children}</div>
        </div>
      );
    }
  }

  Codelab.propType = {
    name: React.PropTypes.string,
    number: React.PropTypes.number.isRequired
  };

  Codelab.defaultProps = {
    name: 'Unknown'
    
  };

  class App extends React.Component {
    render() {
      return(
        <Codelab name={this.props.name} number={this.props.number}>
          {this.props.children}
        </Codelab>
      );
    }
  }

  ReactDOM.render(<App number={5}> i'm your children </App>, document.getElementById('root'));
  ```

---

### 4. state

##### 1) state 란?

- 유동적인 데이터
- JSX 내부에 **`{ this.state.stateName }`**
- 초기값 설정이 필수
  - 생성자(constructor) 에서 **`this.state = { }`** 으로 설정
- 값을 수정 할 때에는 **`this.setState({ val: 'new_val' })`**
  - 렌더링 된 다음엔 **`this.state =`** 절대 사용하지 말것



##### 1-1) codepen : bit.ly/ReactCodePen

```jsx
class Counter extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      value: 0
    };
    
    this.handleClick= this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({
      value: this.state.value + 1
    });
  }
  
  render() {
    return (
      <div>
        <h4>Value: {this.state.value}</h4>
        <button onClick={this.handleClick}>Press Me</button>
      </div>
    );
  }
};

class App extends React.Component {
  render() {
    return (
      <Counter/>
    );
  }
};

ReactDOM.render(
  <App></App>,
  document.getElementById("root")
);
```

- **constructor(props)**
  - props 는 Counter가 만들어질 때 전달 받을 props
- **super(props);**
  - 상속 받은 React.Component, 즉 parent의 생성자 method를 먼저 실행
  - `super(props);`를 먼저 실행해야 그 메소드 안에서 this.state나 props를 접근 가능
- **handleClick()**
  - 버튼이 클릭 될 때 실행될 메소드
- **this.handleClick= this.handleClick.bind(this);**
  - `<button onClick={this.handleClick.bind(this)}>Press Me</button>`와 같은 의미
  - handleClick에서 사용할 this가 render에서 사용할 this와 같다
- **주의 : `<button onClick={this.handleClick()}>Press Me</button>`**
  - 렌더링을 할 때마다 함수를 실행
  - 함수를 실행하면 setState
  - setState를 하면 또 렌더링


---

### 5. 컴포넌트 매핑(Component Mapping)

##### 0) In Angular

- 문법을 따로 익혀야한다.
- 그 프레임워크에 갖혀있는 기분




##### 1) JavaScript Map(내장 함수)

- react에서 데이터 배열을 렌더링 할 때 사용

- **`map()`** :  파라미터로 전달 된 함수를 통하여 배열 내의 각 요소를 처리해서 그 결과로 새로운 배열을 생성

  ```jsx
  arr.map(callback, [thisArg])
  ```

  - **callback ** : 새로운 배열의 요소를 생성하는 **함수**로서, 다음 세가지 인수를 포함
    - **currentValue** : 현재 처리되고 있는 요소
    - **index**  : 현재 처리되고 있는 요소의 index 값
    - **array**  : 메소드가 불려진 배열
  - **thisArg** (선택항목) : callback 함수 내부에서 사용 할 this 값을 설정

  ```javascript
  var numbers = [1, 2, 3, 4, 5];
   
  var processed = numbers.map(function(num){
      return num*num;
  });

  /* 결과: [1, 4, 9, 16, 25] */
  ```

  ```jsx
  /* ES6 Syntax */

  let numbers = [1, 2, 3, 4, 5];
   
  let result = numbers.map((num) => {
      return num*num;
  });
  ```

  - [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) : **`( ... ) => { ... }`**, 보통 콜백함수를 작성할 때 많이 쓰임

  - https://es6console.com/

    ```jsx
    let one = a => console.log(a);

    let two = (a, b) => console.log(a, b);

    let three = (c, d) => {
      console.log(c);
      console.log(d);
    }

    let four = () => {
      console.log("no params");
    }
    ```



##### 2) 컴포넌트 매핑

```jsx
/* Contact 컴포넌트 */

class Contact extends React.Component {
  render() {
    return(
      <div>
        <div>Abet 010-000-0001</div>
        <div>Betty 010-0000-0002</div>
        <div>Charlie 010-0000-0003</div>
        <div>David 010-0000-0004</div>
      </div>
    );
  }
}
```

```jsx
/* ContactInfo 컴포넌트 */

class ContactInfo extends React.Component {
    render() {
        return (
            <div>
                {this.props.contact.name} {this.props.contact.phone}
            </div>
        )
    }
};
```

```jsx
/* Contact 컴포넌트 */
/* state 만들기 */

  /*...생략...*/

  constructor(props) {
    super(props);
    this.state = {
      contactData: [
        {name: 'Abet',phone: '010-0000-0001'},
        {name: 'Betty',phone: '010-0000-0002'},
        {name: 'Charlie',phone: '010-0000-0003'},
        {name: 'David',phone: '010-0000-0004'}
      ]
    };
  }

  /*...생략...*/
```

```jsx
/* Contact 컴포넌트 */
/* rendering 내부에 메소드 생성 */

	/*...생략...*/

    render() {
        const mapToComponents = (data) => {
            return data.map((contact, i) => {
                return (<ContactInfo contact={contact} key={i}/>);
            })
        }

	/*...생략...*/
```

- **const mapToComponent** : 변할일 없는 상수
- **return (<ContactInfo contact={contact} key={i}/>);**
  - contact : data 배열의 각 데이터
  - key : data 배열의 indx

```jsx
/* Contact 컴포넌트 */
/* rendering 내부에서 메소드 사용하기 */

		/*...생략...*/

        return (
            <div>
                <h1>Contacts</h1>
                <div>{mapToComponents(this.state.contactData)}</div>       
                </div>
            )
        }

		/*...생략...*/
```

