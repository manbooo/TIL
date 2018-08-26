## React Component 종류

https://seolhun.github.io/blog/2018/06/20/React-ReactComponentComparison



### React Component 종류

1. (Class) Component
   - 상태와 라이프사이클을 가지고 있는 **기본적인** Component
2. PureComponent
   - 기본적인 Component와 비슷하나, **`shouldComponentUpdate()` 메소드가 shallow comparison 로직으로 구현**되어있는 Component
3. Functional Component(함수형 컴포넌트)
   - 상태와 라이프사이클 필요없이 **하나의 함수로 props를 이용한 DOM만 그려주는** Component



### React.Component

- 기본적으로 props와 state, Lifecycle API를 함께 사용해야할 때 사용

- `shouldComponentUpdate()` 가 구현되어 있지 않다.

  - React.Component를 확장해서 컴포넌트를 만들 때, `shouldComponentUpdate()` 메소드를 별도로 선언하지 않았다면 컴포넌트는 `shouldComponentUpdate()`를 항상 true를 리턴
  - props, state 값이 변경되면 항상 리렌더링

  >`shouldComponentUpdate()`를 직접 작성하고 싶다면 this.props와 nextProps를 비교하고 this.state와 nextState를 비교하여 true/false를 반환
  >
  >true를 반환하면 리랜더링이 되고, false를 반환하면 상태가 변경되어도 하위 구성 요소가 다시 렌더링되지 않는다. 
  >
  >shouldComponentUpdate()에서 shallow comparison 검사를 수행하거나 JSON.stringify()를 사용하지 않는 것이 좋다.



#### 예제

```react
import React from 'react';

class BasicContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            renderCounter: 0,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.renderCounter !== nextState.renderCounter) {
            return true;
        }
        if (this.state.counter !== nextState.counter) {
            return false;
        }
        return true;
    }

    increaseCounter = () => {
        this.setState({
            counter: this.state.counter + 1,
        })
    }

    decreaseCounter = () => {
        this.setState({
            counter: this.state.counter - 1,
        })
    }

    rerenderIncreaseCounter = () => {
        this.setState({
            renderCounter: this.state.renderCounter + 1,
        })
    }

    rerenderDecreaseCounter = () => {
        this.setState({
            renderCounter: this.state.renderCounter - 1,
        })
    }

    render() {
        return (
            <section>
                <h2>BasicComponent</h2>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='btn-group' role='group' aria-label='Basic example'>
                            <button type='button' className='btn btn-secondary btn-success' onClick={this.increaseCounter}>Increment</button>
                            <button type='button' className='btn btn-secondary btn-warning' onClick={this.decreaseCounter}>Decrement</button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='btn-group' role='group' aria-label='Basic example'>
                            <button type='button' className='btn btn-secondary btn-success' onClick={this.rerenderIncreaseCounter}>Re-Render Increment</button>
                            <button type='button' className='btn btn-secondary btn-warning' onClick={this.rerenderDecreaseCounter}>Re-Render Decrement</button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        {
                            `counter : ${this.state.counter}`
                        }
                    </div>
                    <div className='col-sm-12'>
                        {
                            `renderCounter : ${this.state.renderCounter}`
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default BasicContainer;
```



### PureComponent

- 얕은 비교를 통해 props와 state가 바뀌면 리렌더링 하는 로직(shallow comparisom)이 구현
- 구현된 shallow comparison의 한계
  - 중첩된 오브젝트같은 경우를 파악할 수 없다.
- 리랜더링이 많은 경우 계속된 비교 연산을 통해 랜더링이 느려질 수 있으므로 유의 
  - `forceUpdate()` 메소드를 선언하는 것이 더 편리



#### 예시

```react
import React from 'react';

class PureComponent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
        }
    }

    increaseCounter = () => {
        this.setState({
            counter: this.state.counter + 1,
        })
    }

    decreaseCounter = () => {
        this.setState({
            counter: this.state.counter - 1,
        })
    }

    render() {
        return (
            <section>
                <h2>PureComponent</h2>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='btn-group' role='group' aria-label='Basic example'>
                            <button type='button' className='btn btn-secondary btn-success' onClick={this.increaseCounter}>Increment</button>
                            <button type='button' className='btn btn-secondary btn-warning' onClick={this.decreaseCounter}>Decrement</button>
                        </div>
                    </div>
                    <div className='col-sm-12'>
                        {
                            `counter : ${this.state.counter}`
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default PureComponent;
```



### Functional Component

- state, 라이프 사이클 메소드(componetDidMount, shouldComponentUpdate 등등..)와 ref 콜백을 사용 할 수 없다.



#### 예시

```react
import React from 'react';
import PropTypes from 'prop-types';

const FunctionalComponent = (props) => {
    return (
        <section>
            <h2>FunctionalComponent</h2>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='btn-group' role='group' aria-label='Basic example'>
                        <button type='button' className='btn btn-secondary btn-success' onClick={props.increaseCounter}>Increment</button>
                        <button type='button' className='btn btn-secondary btn-warning' onClick={props.decreaseCounter}>Decrement</button>
                    </div>
                </div>
                <div className='col-sm-12'>
                        {
                            `counter : ${props.counter}`
                        }
                    </div>
                    <div className='col-sm-12'>
                        {
                            `renderCounter : ${props.renderCounter}`
                        }
                    </div>
            </div>
        </section>
    );
}

FunctionalComponent.propTypes = {
    increaseCounter: PropTypes.func.isRequired,
    decreaseCounter: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
    renderCounter: PropTypes.number.isRequired,
}

class WarpperFunctionalContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            renderCounter: 0,
        }
    }

    increaseCounter = () => {
        this.setState({
            counter: this.state.counter + 1,
        })
    }

    decreaseCounter = () => {
        this.setState({
            counter: this.state.counter - 1,
        })
    }

    render() {
        return (
            <section>
                <FunctionalComponent
                    increaseCounter={this.increaseCounter}
                    decreaseCounter={this.decreaseCounter}
                    counter={this.state.counter}
                    renderCounter={this.state.renderCounter}
                />
            </section>
        );
    }
}

export default WarpperFunctionalContainer;
```





### 더 알아 보기

https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-%EA%B8%B0%EC%B4%88-component-vs-purecomp



