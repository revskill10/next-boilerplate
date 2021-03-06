const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')({
  options: {
    mdPlugins: [

    ],
    hastPlugins: [

    ]
  }
})
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

const nextConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html'
    }
  },
  webpack (config) {
    config.node = {
      fs: 'empty'
    }
    return config
  }
}
module.exports = withCSS(withMDX(withBundleAnalyzer(nextConfig)));