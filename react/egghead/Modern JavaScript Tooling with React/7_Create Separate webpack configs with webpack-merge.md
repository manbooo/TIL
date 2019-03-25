# 8_



### Create Separate webpack configs with webpack-merge

- webpack 설정 분리
  - development : 빠른 빌드와 개발 경험
  - production : 번들 최적화, 더 나은 사용자 경험



#### 설치

```bash
npm -i D webpack-merge
yarn add webpack-merge --dev
```



#### 소스코드

##### webpack.config.dev.js

```js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports-merge(baseConfig, {
  mode: 'development'
})
```

- production은 mode만 변경



##### package.json

```json
"scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev": "webpack --watch --config webpack.config.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

