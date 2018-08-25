## input 상태 관리

- 지금까지 배웠던 것 
  - 컴포넌트 만들기
  - props와 state
  - LifeCycle API



### 프로젝트 생성

```react
create-react-app phone-book
```



### PhoneForm 만들기

- 이름과 번화번호를 입력 받는다.



#### 1) input 다루기

##### src/components/PhoneForm.js

```react
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <div>{this.state.name}</div>
      </form>
    );
  }
}

export default PhoneForm;
```

- `onChange` 
  - input 의 텍스트 값이 바뀔때마다 발생하는 이벤트 
  - 이벤트가 발생하면 `e.target.value` 값을 통하여 이벤트 객체에 담겨져 있는 현재의 텍스트 값을 읽어온다.
- 해당 값을 state의 name 부분으로 설정
- 나중에 데이터를 등록하고나면 이 name 값을 공백으로 초기화 
  - 초기화 됐을 때 input 에서도 반영이 되도록 value 를 설정 



##### src/App.js

```
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';


class App extends Component {
  render() {
    return (
      <div>
        <PhoneForm />
      </div>
    );
  }
}

export default App;
```



#### 2) 전화번호 입력 추가

##### src/components/PhoneForm.js

```react
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <div>{this.state.name} {this.state.phone}</div>
      </form>
    );
  }
}

export default PhoneForm;
```

-  input 의 name 속성을 사용 
  - name 값은, `event.target.name` 을 통해서 조회 
- setState 내부에서 사용된 문법 : [Computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)



#### 3) 부모 컴포넌트에게 정보 전달하기

![process](https://i.imgur.com/xKe2v5s.png)

- App 에서 handleCreate 라는 메소드를 만들어 PhoneForm에 전달
- PhoneForm 쪽에서 버튼을 만들어서 submit이 발생하면 props로 받은 함수 호출
- App에서 파라미터로 받은 값을 사용



##### src/App.js

```react
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {

  handleCreate = (data) => {
    console.log(data);
  }

  render() {
    return (
      <div className="App">
        <PhoneForm
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default App;
```



##### srt/components/PhoneForm.js

```react
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
    this.setState({
      name: '',
      phone: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default PhoneForm;
```

- `e.preventDefault()` 
  - 원래 이벤트가 해야 하는 작업을 방지 
  - form 에서 submit 이 발생하면 페이지를 리로딩
  - 페이지가 리로딩되면 지니고 있던 state를 다 잃어 버림
- props 로 받은 onCreate 함수를 호출하고, 상태값을 초기화 

