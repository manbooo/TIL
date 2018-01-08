# Section3. 개발환경 설정, 프로젝트 진행

### 1. 작업환경 설정하기

##### 1) 작업환경 설치 안내 : https://velopert.com/1980

- **Git** 

  - 버전관리 시스템
  - 다운로드: <https://git-scm.com/downloads>

- **NPM / NODE**

  - Node.js 는 자바스크립트를 서버환경에서 실행하는 자바스크립트 런타임 
  - NPM 은 Node.js 로 만들어진 모듈들을 설치 및 버전관리 할 수 있는 프로그램
  - Node.js 를 설치하면 NPM 도 함께 설치
  - LTS 버전으로 설
  - 다운로드: <https://nodejs.org/en/download/>
    - `npm install -g npm` 최신버전으로 업데이트

- **MONGODB**

  - NoSQL 데이터베이스
  - 다운로드: <https://www.mongodb.com/download-center#community>
  - 서버를 실행하는부분은 <https://velopert.com/436> 를 참조

- **EDITOR (Atom, Bracket, Sublime, Editplus, Vim …)**

  - atom 다운로드: <https://atom.io/>

    - **jshint**: JS 문법 검사

      > jshint 를 사용한다면 ES6 를 쓸 때, 프로젝트의 루트폴더에 .jshintrc 라는 파일을 만들고  
      >
      > ```
      > {
      >     "esversion": 6
      > }
      > ```
      >
      > 위 내용으로 저장해야 ES6 문법 검사 가능

    - **react**: JSX Syntax highlight 호환


---

### 2. React Project 만들기 | NPM, WEBPACK

##### 1) Global Dependency 설치

```bash
$ npm install -g webpack webpack-dev-server
```

- **webpack** : 브라우저 위에서 import(require) 를 할 수 있게 해주고 자바스크립트 파일들을 하나로 합쳐줌
- **webpack-dev-server** : 별도의 서버를 구축하지 않고도 static 파일을 다루는 웹서버를 열 수 있으며 hot-loader 를 통하여 코드가 수정 될 때마다 자동으로 리로드 되게 할 수 있다



##### 2) 프로젝트 생성

```bash
$ mkdir react-fundamentals
$ cd react-fundamentals
$ npm init
```



##### 3) Dependency 및 Plugin 설치

- React 설치

  ```bash
  npm install --save react react-dom
  ```

- 개발 의존  모듈 설치

  ```bash
  npm install --save-dev react-hot-loader webpack webpack-dev-server
  npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
  ```



##### 4) webpack 설정하기

- /webpack.config.js

  ```javascript
  var webpack = require('webpack');

  module.exports = {
      entry: './src/index.js',

      output: {
          path: __dirname + '/public/',
          filename: 'bundle.js'
      },

      devServer: {
          hot: true,
          inline: true,
          host: '0.0.0.0',
          port: 4000,
          contentBase: __dirname + '/public/',
      },
    
    	module: {
          loaders: [
              {
                  test: /\.js$/,
                  loader: 'babel-loader',
                  exclude: /node_modules/,
                  query: {
                      cacheDirectory: true,
                      presets: ['es2015', 'react']
                  }
              }
          ]
      },

      plugins: [
          new webpack.HotModuleReplacementPlugin()
      ]
  }
  ```

  ​

##### 5) HTML 및 JS 작성

- /public/index.html

  ```html
  <!DOCTYPE html>
  <html>
   
     <head>
        <meta charset="UTF-8">
        <title>React App</title>
     </head>
   
     <body>
        <div id="root"></div>
        <script src="bundle.js"></script>
     </body>
   
  </html>
  ```

  ​

- /src/components/App.js

  ```jsx
  import React from 'react';
   
  class App extends React.Component {
      render(){
   
          return (
                  <h1>Hello React Skeleton</h1>
          );
      }
  }
   
  export default App;
  ```



- /src/index.js

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './components/App';
   
  const rootElement = document.getElementById('root');
  ReactDOM.render(<App />, rootElement);
  ```

  ​

##### 6) 개발서버 실행 스크립트

- /package.json

  ```
  /* .. 생략 .. */

    "scripts": {
      "dev-server": "webpack-dev-server"
    },

  /* .. 생략 .. */
  ```

- 실행

  ```bash
  npm run dev-server
  ```

---

### 3. Hot Module Replacement | React Hot Loader

- 코드가 변경되면 모든 페이지가 새로고침

##### 0) Hot Module Replacement

- 수정된 파일만 새로고침


- /src/index.js

```jsx
/* .. 생략 .. */

if (module.hot) {
	module.hot.accept();
}
```

- local state를 유지 못한다. ?????




##### 1) React Hot Loader

- https://github.com/gaearon/react-hot-loader

- https://gist.github.com/velopert/c5b1f5f748d9aa8b78f729a321682230

- /src/index.js 

  ```jsx
  import React from 'react'
  import ReactDOM from 'react-dom'
  import { AppContainer } from 'react-hot-loader'
  import App from './components/App'

  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('root')
  );

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./components/App', () => {
      const NextApp = require('./components/App').default;
      ReactDOM.render(
        <AppContainer>
          <NextApp/>
        </AppContainer>
        ,
        document.getElementById('root')
      );
    });
  }
  ```

- /webpack.config.js

  ```jsx
  var webpack = require('webpack');

  module.exports = {
      entry: ['react-hot-loader/patch', './src/index.js'] ,

      output: {
          path: __dirname + '/public/',
          filename: 'bundle.js'
      },

      devServer: {
          hot: true,
          inline: true,
          host: '0.0.0.0',
          port: 4000,
          contentBase: __dirname + '/public/',
      },

      module:{
          loaders: [
              {
                  test: /.js$/,
                  loader: 'babel',
                  exclude: /node_modules/,
                  query: {
                      cacheDirectory: true,
                      presets: ['es2015', 'react'],
                      plugins: ["react-hot-loader/babel"]
                  }
              }
          ]
      },

      plugins: [
          new webpack.HotModuleReplacementPlugin()
      ]
  };
  ```



##### 2) react clone

- <https://github.com/velopert/react-codelab-fundamentals>

  ```bash
  git clone https://github.com/velopert/react-codelab-fundamentals.git
  cd react-codelab-fundamentals
  npm install # 혹은 이전 디렉토리에서 node_modules 디렉토리 이동
  ```