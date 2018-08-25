## React 앱의 데이터 흐름

- http://webframeworks.kr/tutorials/react/react-dataflow/#tocAnchor-1-3

### One-way Data Flow

>  **one-way reactive data flow**

- React의 데이터 흐름은 단방향이고, Reactive 하다.
- 데이터는 Parent로 부터 Child로 흐른다.
- 데이터의 갱신에 반응하여 뷰 또한 갱신



### Components Relationship

#### 1) Parent/Children

- DOM의 parent-children 관계와 거의 비슷
- React 컴포넌트들은 상위 컴포넌트, 하위 컴포넌트가 존재
- DOM의 `node.parentNode`와 같은 API는 없다.
  - 하위 컴포넌트는 상위 컴포넌트에 대해 거의 알 수 없다.



#### 2) Owner/Ownee

- `ReactOwner`는 ownee 들의 `ref`를 획득할 수 있는 상위 컴포넌트



### Props

- parent로 부터 받는 데이터
- 불변성 데이터(값을 바꿀 수 없는 데이터)
  - `this.setProps()`와 같은 메서드가 존재하지만, deprecated method이며 사용이 권장되지 않는다.
- mutable state(변경 가능한 값)들은 Prop로 대체 표현되거나 한 곳으로 몰아 넣을 수 있다.
- `props`는 거의 대부분의 데이터를 표현하는 중요한 방법
  - `state`보다는 `props`의 사용에 더 익숙해져야 할 것 
- `props`로 표현된 데이터는 마운트와 업데이트 시 `React.Proptypes` API로 런타임 타입 체크가 가능해 잘못된 상황을 빨리 감지할 수 있는 이점 



#### 1) Controlled Components / Uncontrolled Components

- 폼을 구성하는 HTML 엘리먼트들(i.e. `<input>`, `<textarea>` `<option>`)은 React의 reactive data flow의 관점에서, 사용자의 입력을 통한 뷰 변경과 데이터의 변경이 동시에 일어나는 특수한 엘리먼트 
- React에서는 Control이라는 개념으로 이를 제어 
- `value prop`이 주어진 엘리먼트들은 React에서 값의 변경을 제어하며, Controlled Component라고 불림
- [Controlled Components 공식 문서](https://reactjs.org/docs/forms.html#controlled-components)
- [Uncontrolled Components 공식 문서](https://reactjs.org/docs/uncontrolled-components.html#___gatsby)



#### 2) Special property : `props.children`

- 자식 ReactElement를 다루거나 자식 property의 DOM 엘리먼트 위치를 기술할 수 있다.
- Wrapper 컴포넌트 등에서 많이 사용



#### 3) Special non-DOM attributes

- [DOM Elements](https://reactjs.org/docs/dom-elements.html)
  - `key`, `ref`, `dangerouslySetInnerHTML`는 다른 Props와 같이 HTML 어트리뷰트처럼 기술하지만 prop은 아니다.
- 자식 컴포넌트에서 `this.props.key``this.props.ref` 등으로 접근할 수 없는, 휘발되어 버리는 특수 값 



### State

- 컴포넌트 안에서 변경이 가능한 데이터
- 컴포넌트 안의 state는 최소한으로 유지
- 가능한 한 상위 컴포넌트로 이동해야 한다.
  - 변경 가능한 데이터의 관리가 어렵기 때문에
  - [데이터를 불변 값으로 표한하는 것의 이점](https://kwangyulseo.com/2015/06/25/%EC%99%9C-%EB%B3%80%EC%88%98%EA%B0%80-%EB%82%98%EC%81%9C%EA%B0%80/)
- `this.state` 자체가 mutable한 값은 아니다.
- 데이터의 갱신은 반드시 `setState(nextState)` 비동기 함수를 통해서



#### 1) State 사용의 예

- render를 통한 지속적인 동기화가 필요한 경우 데이터를 표현하기 좋다.

  - 1초마다 뷰가 업데이트가 되는 아날로그 시계를 만들어야 한다면, `setInterval()`과 같은 Timer API로 1초마다 변경된 각도를 `setState()`에 반영함으로서 구현이 가능
  - 시침과 분침, 초침을 만들어야 한다면, `setState()` 함수는 상위 시계 컴포넌트 `<Clock />`으로 자연히 이동하게 되고, 시침, 분침, 초침은 props로 `<Minute now={this.state.now} />` 와 같이 상위 컴포넌트의 시간 `state`를 받게 설계



### 생각해 볼 것

- 데이터 값의 변화로 Parent 컴포넌트에 데이터의 갱신 여부를 전달하는 방법은 무엇이 있을까요?
- 수많은 단계를 거쳐야 하는 컴포넌트들도 계속 props를 주입해 내려야 할까요?



### 패턴 : Smart and Dumb Components

- [Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 



#### 1) Dumb Components

- Parent 컴포넌트에 의해 주어진 `props`만 보여주고, 자신의 `state`를 거의 가지고 있지 않다.
  - `State`를 줄이기 위해 충분히 노력했다면, 대부분의 컴포넌트가 이런 형태
- 사용자 정보를 수정하는 Form 
  - 사용자들은 경우에 따라 일정 `<input />` 엘리먼트들을 보여주지 않거나, `disabled` 어트리뷰트를 줘야 할 수도 있다.
  - Form 안의 input들은 모두 Dumb Component들로 구성
  - 사용자의 정보에 대해 모든 input 컴포넌트가 알고 있어야 하는 것은 비효율적
  - 상위 Form 컴포넌트가 하위 컴포넌트들으로 `props`를 주입해 컨트롤하는 형태로 구성



#### 2) Smart Component

- 하위 컴포넌트들을 컨트롤 한다.

- 사용자 정보를 수정하는 Form

  - 사용자 정보를 최상위 DOM 엘리먼트로부터 전달해 받을 수도 있다.
    - 비효율적
    - 수많은 상관없는 `props`들의 전달 행위로 인해 코드의 가독성 저하
  - 보통 `Flux` 아키텍쳐 구현 라이브러리를 이용 
    - http://facebook.github.io/flux/docs/overview.html#content



##### 예시
```react
var TextField = React.createClass({
    render() {
        return (
            <div className="text-field">
                <label>
                    <span>{this.props.label}</span>
                    <input {...this.props} />
                </label>
            </div>
        );
    }
});

var UserForm = React.createClass({
    mixins: [
        FluxStoreMixin(...) // Flux Store에서 `this.state.user`에 데이 연결
    ],
    // 값이 변할 때마다 state에 저장해 놓았다가 나중에 사용
    // i.e. localStorage에 임시 값을 저장, GA에 값을 전송, ...
    handleChange (e) {
        var nextState = {};
        var key = e.target.dataset['sync-id'];

        nextState[key] = e.target.value;
        this.setState(nextState);
    },
    render() {

        return (
            <form action="/some/where">
                <TextField label="이름" onChange={this.handleChange}
                           defaultValue={this.state.user.name}
                           data-sync-id="name" />
                <TextField label="Github ID" onChange={this.handleChange}
                           defaultValue={this.state.user.connections.github.id}
                           data-sync-id="gh-id" />
            </form>
        );
    }
});
...
```

-  UserForm은 Flux Store로부터 유저의 데이터를 받는다.
-  `<TextField />` 컴포넌트들에 prop으로 값들을 내리는 Smart Component 
-  TextField 컴포넌트는 그것이 무엇인지 모르는 상태에서 단순히 값을 받아 연결, 표시하는 Dumb Component



### 패턴 : 상위 컴포넌트와 대화하기

- Flux 라이브러리를 사용
- 대부분의 경우 함수를 prop으로 내린다



##### 예제 : 키패드

```react
var Keypad = React.createClass({
    getInitialState() {
        return {
            input: ''
        };
    },
    handleInput(e) {
        this.setState({ input: this.state.input + e.target.dataset.value });
    },
    render() {
        return (
            <input value={this.state.input} disabled />
            <KeyInput onInput={this.handleInput} />
        )
    }
});

var KeyInput = React.createClass({
    render() {
        <div>
            <button data-value="1" onClick={this.props.handleInput}>1</button>
            <button data-value="2" onClick={this.props.handleInput}>2</button>
            ...
        </div>
    }
});
```

- `KeyInput` 하위 컴포넌트에 클릭 핸들러를 전달 
- 상위 컴포넌트에서 `setState()`를 하면 상위 컴포넌트에서 값을 업데이트



### Tips

#### 1) class 어트리뷰트의 컨트롤

- [`classnames`](https://www.npmjs.com/package/classnames) 
  - css 클래스를 계층적으로 적용시키고 싶을 때 사용하는 모듈
  - 공식 문서에서 추천하는 패키지

```react
classnames('a', 'b', 'c'); // => 'a b c'
classnames({ a: true, b: false, c: null }); // => 'a'
classnames('some-css-class', this.props.className); // => 'some-css-class' 와 추후 `className` prop 값을 합친다`
```



#### 2) props로 주어주는 객체의 컨트롤

-  오브젝트를 조작하거나 합칠 때 많이 사용하는 방법
  - `React.addons.update` 함수
  - Underscore/Lodash의 `_.extend` 함수
  - `...` [JSX Spread Attribute](https://facebook.github.io/react/docs/jsx-spread.html)를 이용
  -  [Object Spread Property](https://github.com/sebmarkbage/ecmascript-rest-spread) 

```react
...
render () {
    // this.props => { first: 1, second: 'second' }
    return <SomeChild {...this.props} second={2} /> // => props: { first: 1, second: 2 }
}
...
```



