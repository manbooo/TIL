# 4_Configure webpack to Load JavaScript Files through Babel with babel-loader



### 설치

```bash
npm i -D babel-loader
yarn add babel-loader --dev
```





### 설정

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
    ]
  }
}
```

