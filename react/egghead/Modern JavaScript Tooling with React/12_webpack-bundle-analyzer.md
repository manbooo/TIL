# 12_webpack-bundle-analyzer



#### 설치

```bash
npm i -D webpack-bundle-analyzer
yarn add webpack-bundle-analyzer --dev
```



##### webpack.config.prod.js

```js
const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle_sizes.html'
    })
  ]
})
```

- `yarn run build`

- `open dist/bundle-sizes.html`