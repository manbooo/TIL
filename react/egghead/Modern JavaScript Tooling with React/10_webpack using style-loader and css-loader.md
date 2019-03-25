# 10_Automatically Import CSS in JavaScript with webpack using style-loader and css-loader



##### src/styles.css

```css
html {
  box-sizing: border-box;
  font-size: 16px;
  font-family: sans-serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
```



##### index,js

```
import './styles.css'
```



- `yarn run dev`
  - error : `You may need an appropriate loader to handle this file type.`



### css-loader

#### 설치

```bash
npm i -D css-loader style-loader
yarn add css-loader style-loader --dev
```



##### webpack.config.base.js

```js
// module.roules
...
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      }
...
```

