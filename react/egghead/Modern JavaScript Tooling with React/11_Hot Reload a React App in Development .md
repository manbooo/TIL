# 11_Hot Reload a React App in Development with react-hot-loader

- 파일을 바꿀 때 새로운 번들을 생성하는 것 + webpack dev server가 제공하는 live-reload = 좋음 + 편리
- reload는 우리가 어플리케이션 상태를 잃어 버린다는 것을 의미
- 변경이 있을 경우 변경 사항을 응용 프로그램에서 해당 상태를 잃지 않고 반영 할 수 있다면 더 편리



##### src/App.js

```react
...
<div>
  <h1>Hello World!</h1>
  <h2 className={count > 10 ? 'warning' : null}>
    Count: {count}
  </h2>
  <button onClick={this.increment}>+</button>
  <button onClick={this.decrement}>-</button>
</div>
...
```



##### src/styles.css

```css
.warning {
  color: tomato;
}
```



### react-hot-loader

- 변경사항을 저장하면 refresh 없이 브라우저에 반영



#### 설치

```
npm i -S react-hot-loader
yarn add react-hot-loader --save
```



##### webpack.config.base.js

```js
...
plugins: [
            'react-hot-loader/babel',
            '@babel/plugin-proposal-class-properties'
          ]
...
```



##### src/App.js

```react
import { hot } from 'react-hot-loader'

...

export default hot(module)(App)
```



##### package.json

```json
"scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev": "webpack-dev-server --open --config webpack.config.dev.js",
    "dev:hot": "webpack-dev-server --open --hot --config webpack.config.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

