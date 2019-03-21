# Context

참고

- https://velopert.com/3606
- https://reactjs.org/docs/context.html





### Context 용도

- 전역적으로 데이터가 사용되어야 할 때
  - current authenticated user, theme, or preferred language
- 모든 레벨의 컴포넌트에 props를 전달하지 않고 **컴포넌트 트리를 통해 data를 전달**
  - 일반적으로 data를 props를 이용해 top-down(부모에서 자식으로) 전달
  - 여러 레벨의 많은 component들에서 같은 데이터에 접근해야하는 경우에만 사용



#### 전역적인 상태관리

![basic-state](https://i.imgur.com/tmOeRAT.png)

- Root의 state를 props로 하위 컴포넌트에 전달
  - 유지보수성이 낮아짐
- value : F, J
  - Root => A =>B =>  F
  - Root => H => J 
- handleSetValue() : G
  - Root => A => B => E => G



![use-context](https://i.imgur.com/iyNKCIz.png)

- Context를 통해서 원하는 값이나 함수를 바로 전달



### API

#### React.createContext

```react
const {Provider, Consumer} = React.createContext(defaultValue)
```

- `Cumsumer`를 렌더링할 경우 tree에서 가까이 매칭되는 `Provider`로 부터 현재의 context value를 읽어옴
- tree에서 매칭 되는 `Provider`가 없을 경우에는 defaultValue가 `Consumer`에 의해 사용
  - `Provider` value로 `undefined`를 전달하면 `Consumer`가 `defaultValue`를 사용하는 것을 막음



#### Provider

```react
<Provider value={/* some value */}>
```

- `Cumsumer`들이 **context 변화를 구독하도록 하는 컴포넌트**
- `Provider`에 연결되어 있는 `Comsumer`들에게 `value` prop을 전달
- `Provider`들은 tree에 있는 value들을 override 하기 위해 중첩 가능



#### Consumer

```react
<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```

- **context 변화를 구독하는 리액트 컴포넌트**
- children으로 function을 요구 ([*function as a child*](https://reactjs.org/docs/render-props.html))
  - 인자값 : 현재 context value(tree에서 가장 가까운 `Provider`의 value props, `Provider`가 없으면 defaultValue)
  - return 값 : 리액트 노드
- 하나의 `Provider`에 연결되어 있는 모든 `Comsumer`들은 `Provider`의 value가 바뀔 때마다 re-render
  - `Provider`로부터 연결 되어 있는 `Comsumer`들로의 전달은 `shouldComponentUpdate` 의 대상이 아님
  - 상위 컴포넌트가 update 되지 않아도 `Comsumer`는 업데이트 


