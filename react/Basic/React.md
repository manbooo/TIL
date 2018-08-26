## React

- http://webframeworks.kr/tutorials/react/getting-started/



### 페이스북은 왜 React를 만들었는가?

- [React 공식 문서](http://facebook.github.io/react/docs/why-react-ko-KR.html)
- (전) React 팀이었던 [Pete Hunt가 쓴 글](http://facebook.github.io/react/blog/2013/06/05/why-react.html)

- **지속해서 데이터가 변화**하는 대규모 애플리케이션을 구축하기 위해서
  - 유지보수를 위하여 모델 데이터를 변경하는 로직과 뷰 로직을 분리
  - '뷰 데이터 관리 도구'를 통해 Separation of Concern(관심사의 분리)를 달성
- React의 경우 public하게 사용할 수 있는 API는 몇 개 되지 않는다.
  - JSX를 통해 어떤 형태로 뷰 데이터가 보여져야 하는지 **선언적으로 기술**
  - React는 중간 과정이 아닌 결과물을 기술하는 것
- 관심사의 분리 + 선언적인 API



### React는 무엇인가

#### 뷰 레이어

- MVC, MV* 패던에서 뷰 레이어만을 담당

- 어떤 형태의 모델이 사용될 것인지에 대한 가정을 하기 않는다.

  - 아무 라이브러리를 사용해도 무방
  - 작은 앱이라면 굳이 라이브러리 사용할 필요가 없다.

  >데이터를 서버에서 가져온다거나 (ajax 요청), 데이터들을 조작한다거나 (underscore/lodash) location에 따라 다른 컴포넌트를 마운트해준다거나 (`Backbone.Router`, `angular-route`) 하는 기능은 직접 구현하거나, 상황에 맞는 라이브러리를 사용 

- 참고

  - [Flux 아키텍쳐](http://facebook.github.io/flux/)
  - [Redux](https://github.com/rackt/redux) 



#### 컴포넌트를 통한 뷰 작성

- Reactive한 단방향의 데이터 흐름
  - Reactive 하다 : 상태(일반적인 의미에서의 state)가 바뀌면 뷰도 함꼐 업데이트
  - 단방향 : 한 방향으로 데이터가 흐른다.
    - 상위 컴포넌트(Owner)에서 하위 컴포넌트(Ownee)로
    - 데이터는 React에서 **prop**이라고 지칭 
    - JSX에서는 HTML의 attribute처럼 작성
- 컴포넌트 라이프사이클 제공



##### 예제 : 쇼핑몰에 쇼핑카트

```react
// 참고: 동적으로 생성되는 모델의 경우 보통은 `Array.prototype.map` 을 이용하여
// 배열 형태 모델을 작성하고, key를 배정하지만 글의 목적에 맞게 간단하게 쓰기 위하여
// 정적으로 작성합니다.
var ShoppingCart = React.createClass({
    render () {
        return <div>
            <ShoppingItem name="kimchi" available={true} />
            <ShoppingItem name="rice" available={true} />
            <ShoppingItem name="curry" available={false} />
        </div>
    }
});

// 참고: 기존 html 엘리먼트가 아닌 한, 모든 커스텀 컴포넌트들의 이름은 대문자로
// 쓰여져야 하며 지켜지지 않으면 에러가 납니다.
var ShoppingItem = React.createClass({
    render () {
        return <div>
            <div>
                상품명: {this.props.name},
                구입가능: {this.props.available ? '가능' : '불가능'}
            </div>
        </div>
    }
});
```

- 컴포넌트는 `ShoppingCart -> ShoppingItem` 형태
- `<ShoppingItem name="kimchi" available={true} />`
  - **JSX**라는 치환 문법
  - HTML attribute처럼 써준 것이 하위 컴포넌트로 상태를 주입
- Owner에서 `React.CreateElement` 함수 호출로 새 컴포넌트 인스턴스 생성
- `React.render` : DOM 컨테이너 위에 Render되는 순간



#### Virtual DOM과 Reconciliation

- HTML Element들을 Virtual DOM을 이용해 표현 

  - Virtual DOM은 가상의 HTML Element들을 가지고 있다가, (재)렌더링을 하면 필요한 부분만 업데이트(DOM 조작)

- **Always re-render on update**

  - jQuery 등을 이용하여 애플리케이션을 작성하면 모델이 업데이트되었을 때 필요한 컴포넌트들만 셀렉터를 이용하여 업데이트를 해주는 코드를 작성 
  - React는 작성가자 원하는 결과물만을 선언적으로 작성

- Reconciliation (비교조정) 

  - 가지고 있는 Virtual DOM 트리를 비교하면서 필요한 부분만 업데이트

  - [React 공식 문서](http://facebook.github.io/react/docs/reconciliation-ko-KR.html)

  - [React의 diffing 알고리즘에 대한 글](http://calendar.perfplanet.com/2013/diff/)

    > 동기 DOM 배치 오퍼레이션을 매 업데이트마다 수행하는 것보다는 낫겠지만, 글을 보면 업데이트 전, 업데이트 후의 가상 엘리먼트 트리를 비교해야 하는 문제가 있습니다. 이 문제는 가장 최신의 알고리즘도 `O(n^3)`의 시간 복잡도를 가지고 있는 수준이므로, 여러가지 가정들을 통해 알고리즘의 복잡도를 `O(n)`까지 낮췄다고 설명 

- 뷰 업데이트 로직은 거의 신경쓰지 않고 모델 데이터 관리와 결과물만 기술 

- 가상화라는 것은 기본적으로 브라우저 구현에 코드가 의존하는 것을 넘어선다는 것을 의미

  - 브라우저의 구현 디테일 차이들을 덜 신경써도 된다는 장점



### React에 대한 오해

#### React는 빠르다

- 비교조정 알고리즘은 `O(n^3)`에서 `O(n)`까지 시간 복잡도를 끌어올리긴 했지만, 비교하는 것 외에도 많은 관리 작업을 수행
  - React는 기본적으로 빠르지 않다.
- 해주는 것에 비해서는 빠르다.
- 최적화를 잘 해주면 빨라진다.
  - 기본적으로 런타임에서 invariant 등의 개발을 도와주는 기능들이 존재
  - 이런 부분을 프로덕션 빌드를 통해 제거

#### JSX는 템플릿 언어다

- JSX는 EcmaScript로 치환되는 간단한 치환/확장 언어

  - [E4X에 영향](http://blog.vjeux.com/2013/javascript/jsx-e4x-the-good-parts.html)을 받아 만들어짐
  -  함수 호출 식으로 써도 됨

- React 컴포넌트와 React.DOM 가상 엘리먼트 생성자들은 트랜스파일러를 통해 `React.createElement`함수 콜으로 치환

  ```react
  <div foo={0} bar={'baz'} />
  
  // 치환 후
  React.createElement('div', { foo: 0, bar: 'baz' });
  ```

- [Handlebars](http://guides.emberjs.com/v1.10.0/templates/displaying-a-list-of-items/) 나 [Jinja2](http://jinja.pocoo.org/docs/dev/)와 같이 자체적인 if-else, 반복문, 조건적 표현 블럭 등의 제어구조를 가지고 있지 않다.

  - EcmaScript 표현식들을 `{}` 안에 써준다는 정도



https://www.slideshare.net/floydophone/react-preso-v2