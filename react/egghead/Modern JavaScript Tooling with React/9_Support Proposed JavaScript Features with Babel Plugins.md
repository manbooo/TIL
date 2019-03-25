# 9_Support Proposed JavaScript Features with Babel Plugins

- 브라우저 지원이 필요하지 않아도 최신 JS 기능을 사용할 수 있도록 JS 코드가 포함
  - 공식 언어의 일부가 아닌 제안된 기능이 포함
- babel 플러그인이 JS의 제안된 클래스 속성 구문을 지원하는지



##### src/App.js

```react
import React from 'react'

class App extends React.Component {
  state = {
    count: 0
  }

  onIncrease = () => {
    this.setState(state => {
      return { count: state.count + 1 }
    })
  }

  onDecrease = () => {
    this.setState(state => {
      return { count: state.count - 1 }
    })
  }

  render() {
    return (
      <div>
        <h1>Hello World!!</h1>
        <h2>count: {this.state.count}</h2>
        <button onClick={() => this.onIncrease}>+</button>
        <button onClick={() => this.onDecrease}>-</button>
      </div>
    )
  }
}

export default App
```

- 실행시키면 빈 웹페이지 창이 뜬다
  - babel이 이 구문을 어떻게 처리해야할지 모르기 때문에



#### 설치

```bash
npm -i D @babel/plugin-proposal-class-properties
yarn add @babel/plugin-proposal-class-properties --dev
```



##### webpack.config.base.js

```js
module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  },
```

