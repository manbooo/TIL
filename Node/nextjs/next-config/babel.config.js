module.exports = api => {
  api.cache(true)
  const presets = ['next/babel']
  const env = {
    production: {
      plugins: [
        [
          'dotenv-import',
          {
            moduleName: '@env',
            path: '.env.production'
          }
        ]
      ]
    }
  }

  const plugins = [
    ['inline-react-svg'],
    [
      'dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: false
      }
    ],

    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-proposal-optional-chaining'],
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
    [
      'import',
      {
        libraryName: 'antd',
        style: false
      }
    ]
  ]

  return {
    presets,
    plugins,
    env
  }
}
