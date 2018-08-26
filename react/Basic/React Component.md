## React Component

- https://medium.com/little-big-programming/react%EC%9D%98-%EA%B8%B0%EB%B3%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-92c923011818



### React란?

- UI를 위한 JS 라이브러리

```
UI = View(State)
```

- UI는 View 함수에 어떤 State 값을 대입했을 때 나온 결과
- React는 View 함수에 해당
- **View를 State가 같다면 항상 같은 UI를 결과로 갖는 함수**
- 즉 리액트는 **View 함수 개발에 도움을 주는 라이브러리**



#### React의 특징 및 장점

1. 함수의 정의가 그러하듯 **단방향 사고**
2. 함수가 그러하듯 **특정 `state`, `props`에 따른 render 결과가 바뀌지 않는다.**
3. 함수 내용을 정의하듯 **JSX**를 통해 어떻게 화면을 그릴지 정의
4. 함수 간 합성(Composition)이 가능하듯이 **컴포넌트 간 합성** 가능



### React 컴포넌트

- `props`를 input으로 하고 UI가 어떻게 보여야 하는지 정의하는 [React Element](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html)를 output으로 하는 **함수**
- **합성을 이용**하여 “UI를 재사용할 수 있고 독립적인 단위로 쪼개어 생각” 
- 컴포넌트는 `React.Component`를 상속받아 정의
- 컴포넌트 간에는 **상속보다는 합성**을 사용하길 권장



- UI 구성
  - 화면에 컴포넌트를 그리고(Mounting), 갱신하고(Updating), 지워야(Unmounting) 한다.
- 컴포넌트는 각 프로세스가 진행될 때에 따라 Lifecycle 함수가 실행
  - 이를 재정의하여 컴포넌트 제어

![React Lifecycle in ES6. Inspired by [Simon Sturmer](https://twitter.com/sstur_/status/567937326669651969) ](https://cdn-images-1.medium.com/max/800/1*YD6sBv5Ly548pGl042z3DA.jpeg)

- Mounting
  -  Creating 중인 `componentWillMount()`에서 Ajax 요청을 날리면 응답 시간만큼 컴포넌트를 그리는 것이 늦어짐
  - `componentDidMount()`에서 Ajax 요청을 하는 게 낫다.
- Updating
  - Receiving State 중에 `setState()` API를 호출하면 프로세스가 끝난 후 또다시 Receiving State 한다.
  - `setState()`API를 해당 Lifecycle 함수에서 호출하면 개념적으로 무한 루프에 빠진다.



### Props와 State

- 컴포넌트의 인스턴스 속성
- props
  - 컴포넌트의 mounting, updating 프로세스 시점에 값이 할당
  - 컴포넌트 내부에서 값을 변경할 수 없다
- state
  - 상황에 따라 변경되어야 하는 값들



#### 왜 props와 state로 나누어 설계했는가?

- 개발자들에게 **명확한 관념 모델**(static mental model)을 제공

  - 관념 모델은 무엇이 어떻게 동작하는지 이해할 때 진행되는 일련의 사고 프로세스를 의미
  - **논리적으로 이치에 맞는 사고 모델을 제공**

- **컴포넌트 간에는 무조건 `props`를 통해서만 데이터를 주고받고 `props`는 컴포넌트 내부에서 변경되지 않는다**. 

  - 위/아래 양쪽에 대해 동시에 고민할 필요가 없다.
  - 아래 한쪽 방향(uni-directional) 그리고 자기 자신에 대해서만 고민 

  > 만약 input으로 들어오는 `props`를 컴포넌트 내부에서 변경할 수 있다면??
  > `props`를 내려주는 부모 컴포넌트에도 영향이 가야 할까?
  > `state`가 없다면 유저 이벤트에 맞춰 변경돼야 하는 값은 어떻게 관리할까?
  >
  > 위의 내용을 고민할 필요가 없다.
  >
  > 지금 컴포넌트에서 필요한 값이 `props`인지 `state`인지 판단하고 어느 Lifecycle과 관련이 있는지 이 값을 어떤 컴포넌트에 어떻게 넘겨줄지만 생각하여 코드를 작성 

![계층 기준으로 부모 자식 관게를 표현한 React 컴포넌트 관계도](https://cdn-images-1.medium.com/max/800/1*1JzmOFt70B-EF3rQzrI9PQ.png)

- `props`와 `state`가 하나의 객체로 관리된다면
  - Updating을 할지 결정하는 `shouldComponentUpdate()` 함수에서 **O(keys(props+state))**만큼 값이 변경되었는지를 비교 
- `props`와 `state`로 분리되어 있으므로 **O(keys(state))**만큼만 비교



### React 컴포넌트의 setState() API

- 컴포넌트의 `state`를 변경할 때 사용하는 API 



#### 왜 굳이 API를 사용하여 변경하는가?

- 자바스크립트의 비교 연산자는 피연산자의 값이 아닌 reference 값을 기준으로 참/거짓을 리턴하기 때문에

![비교 연산자는 오브젝트의 값이 아닌 reference 값을 비교](https://cdn-images-1.medium.com/max/800/1*GaPNj3s7e72YNZjMS7Z2zA.png)

- 만약 `state`의 값을 직접 변경할 경우에는 해당 오브젝트의 reference 값이 변하지 않아 컴포넌트는 `state`가 변경되지 않았다고 볼 수밖에 없다.
  - 화면이 갱신되지 않는다.
  - https://reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly
- React는 `setState`를 이용해 기존 `state`와 머지하여 **`state`의 변경 가능성**을 명시적으로 알려줌
  - 머지를 통해 새로 생성된 `state`의 **reference 값은 기존과 다르므로** shallow compare를 통해 변경되었음을 알 수 있다. 
  - reference 변경일 뿐 실제 값은 변경되지 않을 수도 있다.



#### `setState()`는 비동기로 동작

- `setState` 호출 즉시 `state`가 변경되는 것이 아니라 **비동기로 동작한다**.

- 상태가 변경된 직후에 필요한 작업이 있다면 `setState(nextState, callback)`의 `callback`을 사용

- setState로 보장되지 않는 것

  - `setState` 호출 직후에 `state`가 즉시 갱신된다.
  - 한 컨텍스트 내에서의 `setState` 호출 수와 컴포넌트 업데이트 수는 같다.

- setState로 보장되는 것

  - `setState` 실행 순서
  - `setState` callback의 실행 순서
  - `state` 변화가 클릭 등의 event 실행 전에 컴포넌트에 반영

- 원할한 UI/UX를 제공하기 위해 일정 수의 render를 꼭 수행시키기 위해서 비동기로  동작

  > `setState`가 동기로 동작한다고 가정한다면, `state` 변경이 많으면 많을수록 `render`는 모든 변경이 적용될 때까지 늦어지기 때문에 실제 화면에서는 **엄청나게 부자연스럽게 동작**하게 될 것.
  > 비동기로 동작하게 되면 `render` 시점과 별개로 동작하기 때문에 자연스러운 갱신이 가능해집니다. 



### React 컴포넌트 디자인 패턴

- 디자인 패턴의 목적
  - DRY (Don’t Repeat Yourself)를 유지한다.
  - 재사용 가능한 컴포넌트를 만든다.
  - 컴포넌트가 무엇을 하는지 명확하게 이해할 수 있다.



#### 기본 컴포넌트(Basic Component)

```react
// class Button extends React.Component {
//   render() {
//     const { className } = this.props;
//     return <button type="button" className={className} >;
//   }
// }
<Button className="myBtn" />
```

- 기본 컴포넌트는 개발자가 컴포넌트에 일일이 `<button type=”button”>`를 작성해야 하는 것을 위와 같이 일반화
  - DRY를 유지하게 도와준다



#### 고차 컴포넌트(Higher Order Component)

- 고차 컴포넌트는 [Sebastian Markbåge](https://medium.com/@sebmarkbage)의 [gist](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775)를 시작으로 대중화된 패턴 

- [react-redux](https://github.com/reactjs/react-redux) 의 `connect()`나 [Relay](https://facebook.github.io/relay/)의 `createContainer()` 등

-  **컴포넌트를 input으로 하고 컴포넌트를 output**으로 하는 함수

  ```
  // @flow
  hoc = (input: React.Component): React.Component => output
  ```

- **여러 컴포넌트에서 공통으로 사용하는 로직을 한 컴포넌트의 역할로 분리** 

- 컴포넌트의 내부 로직을 간결하고 명확하게 유지

- 컴포넌트들의 **재사용성** 향상

- **고차 컴포넌트는 공통 로직을 어떻게 분리하느냐가 핵심**

  >```
  >Logic: { a, b, c, d }
  >```
  >
  >`Logic`은 컴포넌트가 내부 로직으로 사용할 수 있는 모든 로직을 원소로 가집니다. 그렇다면 컴포넌트가 사용하는 내부 로직은 총 2⁴ 만큼의 경우의 수가 존재합니다. 이 때, **가장 적은 수의 고차 컴포넌트로 가장 많은 수의 존재 가능한 내부 로직**을 감당하려면 어떻게 해야 할까요? 
  >
  >학적으로 당연히 원소 각각에 대한 고차 컴포넌트 4개를 작성하면 됩니다. 하지만 실제 애플리케이션에서 사용되는 로직의 조합의 수는 4보다 작을 수도 있습니다. 즉 **실제로 사용하는 로직의 조합 수에 따라** 고차 컴포넌트를 보다 **atomic** 하게 만들지 혹은 좀 더 **specialize** 하게 만들지 결정하면 됩니다 

- `render` 함수 안에서 HOC를 사용하면 매번 새로운 컴포넌트가 만들어져서 성능이 떨어짐



##### 실제 구현

```react
import { Component } from "React";

export var Enhance = ComposedComponent => class extends Component {
  constructor() {
    this.state = { data: null };
  }
  componentDidMount() {
    this.setState({ data: 'Hello' });
  }
  render() {
    return <ComposedComponent {...this.props} data={this.state.data} />;
  }
};

import { Enhance } from "./Enhance";

class MyComponent {
  render() {
    if (!this.data) return <div>Waiting...</div>;
    return <div>{this.data}</div>;
  }
}

export default Enhance(MyComponent); // Enhanced component
```



### 무 상태 컴포넌트(Stateless Component)

- **재사용성이 굉장히 높은 컴포넌트**를 작성할 수 있게 도와줌
- 컴포넌트를 완전한 함수로 정의
- 더욱 명확한 의미를 전달할 수 있다.
  - `state`가 없을 경우 무상태 컴포넌트로 작성

```react
const Button = (props) => (
  <button type="button" className={props.className} />
)
```

- ES6의 [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)를 이용 : 명확하게 표현

```react
const Button = ({ className }) => (
  <button type="button" className={className} />
)
```

- ES6의 [Spread Syntax](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator)와 [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)를 이용 : 안전하고 확장성이 높음

```react
const Button = ({ className, ...remainProps }) => (
  <button type="button" className={className} {...remainProps} />
)
```



### 특수화(Specialization)

- **컴포넌트의 역할을 specialize 해서 보다 명확한 컴포넌트**로 만들어 줌
- 상태에 따라 특정 컴포넌트가 구분이 될 때 특수화를 이용하면 보다 시맨틱적인 코드 작성

```react
const RedButton = () => <Button className="red">
const BlueButton = () => <Button className="blue">
// {this.props.theme === RED ? <RedButton> : <BlueButton>}
```



#### Presentational & Container 컴포넌트

- Smart & Dumb 컴포넌트란 이름으로 제시
  - 후에 더욱 정확한 의미 전달을 위해 명칭이 변경
  - https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
- 컴포넌트들은 MVC 구조에서 말하는 C(컨트롤러)의 역할을 해야 할 경우가 있다.
  - 단순히 `props`, `state`로 화면을 그리는 데 필요한 값을 넘겨받는 것이 아니라 Ajax 요청이나 localStorage 등을 통해 데이터를 fetching 해야 할 경우 
- **데이터 fetching까지 담당하게 되면 specialize 하게 되어 재사용성이 저하**
-  **로직과 Lifecycle이 복잡해져 무엇을 하는 컴포넌트인지 이해하기 어렵다.**
- 한 컴포넌트 내에 존재하는 **render**와 관련된 로직과 **데이터**와 관련된 로직을 각각 Presentational 컴포넌트, Container 컴포넌트로 분리



##### Presentational 컴포넌트

- 어떻게 보이는지를 고려

- JSX를 이용한 **마크업이 존재**
- `render`에 필요한 **데이터는 이미 존재**한다고 가정
- UI를 위한 `state`가 존재할 수 있다.
- 데이터 로드 또는 변경 방법을 지정하지 않는다.
- `props`를 통해 독점적으로 데이터 및 콜백을 수시
- 상태, 라이프 사이클 후크 또는 성능 최적회가 필요한 경우가 아니면 기능 구성 요소
- Flux actiond이나 stores같은 앱에 의존하지 않는다.



##### Container 컴포넌트

- 어떻게 작동하는지를 고려

- JSX를 이용한 **마크업이 거의 없다**.

- Ajax 요청, HOC 등을 이용해 **render에 필요한 데이터를 Fetching**

- 데이터 Fetching 등을 위한 state가 존재할 수 있다.

  - 데이터 소스 역할을 하기 때문에

- 다른 컨테이너 구성 요소에 데이터와 동작을 제공

- [고차원 구성 요소를](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) 사용하여 생성

- Flux action을 호출하여 Presentation에 콜백으로 제공

  