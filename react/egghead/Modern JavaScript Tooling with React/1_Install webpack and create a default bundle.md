# 1_Install webpack and create a default bundle



### webpack

#### 설치

```bash
npm install --save-dev webpack webpack-cli
yarn add webpack webpack-cli --dev
```

- `node_modules/.bin`에 위치



#### minified file 생성

```bash
node_modules/.bin/webpack
```

- 결과물 : `dist/main.js`



#### 실행

```bash
node dist/main.js 
```



#### script 추가

- package.json

```json
...

"scripts": {
	"build": "webpack"
},

...
```



### 예제

#### 소스코드

##### greet.js

```js
const greeting = 'Hello world'

export default greeting
```



##### index.js

```js
import greeting from './greet'

console.log(greeting)
```



#### 실행

```bash
npm run build -- --mode development
yarn run build --mode development
```



