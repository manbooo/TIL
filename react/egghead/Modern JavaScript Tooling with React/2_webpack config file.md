# 2_Explicitly Define an Entry Point with a webpack Configuration File



### webpack Configuration File

#### basic

##### webpack.config.js

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  }
}
```



#### Control the Output of webpack with the mode Setting

##### webpack.config.js

```js
const path = require('path')

module.exports = {
  mode: ['development' or 'production'],
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  }
}
```

- `yarn run build --mode development`으로 실행하면 `mode: 'production'`로 설정되어있어도 `mode: 'development'` 실행
- 