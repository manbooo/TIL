# 13_CDN with webpack



- webpack은 빌드할 때마다 번들의 일부로 라이브러리를 포함하는데, **production 빌드의 경우 라이브러리를 외부화하여 CDN에서 가져오려고 함**



##### webpack.config.prod.js

```js
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: 'bundle_sizes.html'
  })],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
})
```

- `yarn run build`

- `open dist/bundle_sizes.html`

- `open dist/index.html`

  - `Uncaught ReferenceError: React is not defined`



##### src/index.html

```html
<body>
  <div id="app"></div>
  <% if(process.env.NODE_ENV === 'production') { %>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
  <% } %>
</body>
```




