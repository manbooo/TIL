## 콘솔에서의 입력 값

https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program



##### syntax/conditional.js

```js
const args = process.argv

console.log(args)
console.log(args[2])

console.log('A')
console.log('B')

if(false){
    console.log('C1')
} else {
    console.log('C2')
}

console.log('D')
```

- `args`
  - 첫번째 : nodejs runtime의 위치
  - 두번째 : 실행시킨 파일의 경로
  - 세번째 ~ : 입력값

