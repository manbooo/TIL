# Hooks

참고

- https://reactjs.org/docs/hooks-intro.html
- https://ahnheejong.name/articles/hello-react-hooks/
- https://velog.io/@vies00/React-Hooks



### 소개

- React 컨셉을 직관적 API로 제공
  - props, state, context, refs and lifecycle ...



### 동기

> No more classes, Just Function
>
> 래퍼 엘리먼트 없는 로직 재활용

1. 컴포넌트 간 상태가 있는 로직의 재사용성이 떨어짐

   - state가 있는 로직을 재활용하기 위한 솔루션 : HoC, Render Props, Consumer, Provider ...
     - 컴포넌트 구조의 제약
     - Wrapper Hell
   - Hooks를 사용하여 **컴포넌트의 stateful 로직을 추출** 가능
     - 의존성과 재사용성 테스트 가능
     - 컴포넌트 계층에 변화 없이 stateful 로직을 항상 재사용 가능

2. 복잡한 컴포넌트는 이해하기 어려움

   - 각각의 lifecycle 메소드는 종종 연관없는 로직을 섞어 포함

     - `componentDidMount`와 `componentDidUpdate`로 data를 fetcing하는 것을 수행(최초 등록 및 싱크 맞추기)
     - `componentDidMount` 메소드는 이벤트 리스너를 설정하는 데 연관 없는 로직 들을 포함
     - `componentWillUnmount`는 cleanup을 수행

   - 하나의 로직에 관련된 코드가 여러 메소드에 나눠져 존재

     > Mutually related code that changes together gets split apart, but completely unrelated code ends up combined in a single method. This makes it too easy to introduce bugs and inconsistencies.
     >
     > 서로 연관된 코드는 떨어지는 반면, 전혀 상관없는 코드가 같은 메소드 내에 자리하곤 합니다. 이는 쉽게 버그와 비일관성을 초래합니다.

   - Hooks는 lifecycle 메소드를 기초로 한 분리에 초점이 아닌 **컴포넌트를 연관있는 조각을 기초로 한 더욱 작은 함수로 나눌 수 있게 함**

3. 클래스는 사람과 기계, 모두 헷갈리는 개념

   - JS의 `class`는 헷갈릴 여지가 많다.

     > how `this` works in JavaScript

   - 기계가 최적화하기 어려운 코드 생성

     - 의도되지 않은 최적화를 통해 더욱 느리게 만드는 패턴 존재

     >Poor Minificaation, Flaky and unreliable Hot Reload

   - Hooks는 **classes없이 React의 특징들을 사용 가능**



### Rule of Hooks

- 함수의 최상위에서만 호출
  - 반복문, 조건문, 감싸진 함수에서 호출해서는 안됨
- 리액트 함수 컴포넌트 내에서만 호출
  - 보통의 자바스크립트 함수 내에서 호출해서는 안됨
- linter : https://www.npmjs.com/package/eslint-plugin-react-hooks
- 리액트는 어떤 상태가 어떤 useState 호출에 대응하는지 어떻게 알 수 있을까?
  - 리액트가 **훅의 호출 순서에 의존**
  - https://overreacted.io/why-do-hooks-rely-on-call-order/

### 