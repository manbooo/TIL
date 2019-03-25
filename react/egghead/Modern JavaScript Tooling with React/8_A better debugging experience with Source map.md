# 8_Generate Source Maps through webpack for a Better Debugging Experience with source-map



- 변환된 코드와 번들된 코드를 가지고 브라우저의 소스 코드와 비교하여 DevTools에서 디버그
- 소스맵이없는 기본 디버그 환경을 살펴본 다음 소스맵을 생성하고 향상된 환경을 살펴보기 위해 webpack을 구성



### Debugging

##### src/App.js

```js
import React from 'react'

class App extends React.Component {
  render() {
    debugger
    return <h1>Hello World!</h1>
  }
}

export default App
```

- 개발자도구 : Sources
  - 복잡한 렌더링의 경우 디버깅이 어렵디



### Source Map

- 브라우저에서 실제로 실행중인 코드에 작성한 코드를 매핑
- 코드를 디버그 할 필요가있을 때 원래의 소스 코드로 다시 매핑하는 것이 좋음
  - 브라우저를 사용하고있을 때, 생성 된 코드와 프로덕션 빌드를 위해 최적화 된 코드가 실행되어야 함



##### webpack.config.js

```js
module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000
  },
  devtool: 'source-map'
})
```

- 다음 함수 호출을 단계적으로 수행
- 작성한 코드에 대해 디버깅