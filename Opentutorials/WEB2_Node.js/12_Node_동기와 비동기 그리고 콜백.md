## 동기와 비동기 그리고 콜백

### 동기와 비동기(synchronous & asynchronous)

#### 1) 개념

![concept](http://www.icodeguru.com/dotnet/Core.C.Sharp.and.dot.NET/0131472275/images/0131472275/graphics/13fig03.gif)

- Synchronous : 순차적
- Asynchronous
  - 일을 시켜놓고 다 끝나면 알려달라하고 다음 일을 처리
  - 일을 맡겨놓은 쪽과 지금 일이 진행되고 있는 쪽이 동시에 일을 처리
  - 병렬적으로 일을 처리
  - 효율적이지만 복잡하다



#### 2) 코드

- https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_readfilesync_path_options
  -  콜백의 있고 없고를 통해 동기와 비동기의 차이를 알아보자



##### syntax/sample.txt

```tx
B
```



##### syntax/sync.js

```js
const fs = require('fs')

// readFile Synchronous
console.log('A')

const data = fs.readFileSync('./syntax/sample.txt', 'utf8')
console.log(data)

console.log('C')

console.log('-----')

// readFile Asynchronous
console.log('A')

fs.readFile('./syntax/sample.txt', 'utf8', (err, data) => {
    console.log(data)
})

console.log('C')
```

- 비동기를 선호
- `readFileSync` : return 값이 존재
- `readFile` : callback 함수를 통해 처리
  - 파일 읽기가 완료되면 세번째 파라미터인 callback 함수를 실행



### 콜백(callback)

#### 1) 개념

```js
fs.readFile('./syntax/sample.txt', 'utf8', (err, data) => {
    console.log(data)
})
```

- `readFile`을 사용하여 파일을 읽어와
- 시간이 좀 걸리니까 작업이 끝나면 세번째 파라미터인 함수를 실행시켜
  - 작업이 끝난후 함수 호출



#### 2) 코드

##### Syntax/callback.js

```js
_a = () => {
  console.log('_a : A')
}

_a()

const a = () => {
    console.log('a : A')
}

a()

function slowfunc(callback){
    callback();
}

slowfunc(a);
```

- JS에서 함수는 값이다.
- 함수의 실행이 끝난 뒤 실행할 것을 `callback`으로 전달
  - 전달한 callback을 실행해준다.