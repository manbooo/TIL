const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCss = require('@zeit/next-css')

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withBundleAnalyzer(
  withCss({
    webpack(config, options) {
      // Further custom configuration here
      return config
    },
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: './bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: './bundles/client.html'
      }
    }
  })
)
