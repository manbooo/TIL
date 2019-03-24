# 5_Configure babel for React with preset-react



### 설치

```bash
npm i -S react react-dom prop-types
yarn add react react-dom prop-types --save
```



### 소스코드

##### App.js

```js
import React from 'react'

class App extends React.Component {
  render() {
    return <h1>Hello world</h1>
  }
}

export default App
```



##### index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App/>, document.getElementById('app'))
```



#### 실행

- `nmp run build`, `yarn run build`

- 에러 발생

  > ERROR in ./src/index.js
  > Module build failed (from ./node_modules/babel-loader/lib/index.js):
  > SyntaxError: …./react-boilerplate/src/index.js: Unexpected token (5:16)

  - JSX에서 build 실패 : JSX는 유효한 JS가 아니기 때문에 babel-loader에서 처리 불가능
  - babel에 JSX 처리 설정을 통해 유효한 JS로 변환



### 에러 해결

#### 설치

```js
npm i -D @babel/preset-react
yarn add @babel/preset-react --dev
```



##### webpack.config.js

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  }
}
```

