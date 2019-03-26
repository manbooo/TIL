module.exports = api => {
  api.cache(true)
  const presets = ['next/babel', '@babel/preset-react']

  const plugins = [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
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
  }
}
