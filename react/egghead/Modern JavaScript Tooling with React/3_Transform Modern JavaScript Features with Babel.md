# 3_Transform Modern JavaScript Features with Babel



### 예제

#### 소스코드

##### greet.js

```js
const getGreeting = name => `Hello ${name}`

export default getGreeting
```



##### index.js

```js
import getGreeting from './greet'

console.log(getGreeting('someone'))
```



### babel

#### 설치

```bash
npm i -D @babel/core @babel/cli @babel/preset-env
yarn add @babel/core @babel/cli @babel/preset-env --dev
```



#### 실행

```bash
node_modules/.bin/babel ./src/greet.js
node_modules/.bin/babel ./src/greet.js --presets=@babel/preset-env
```

