const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')({
  options: {
    mdPlugins: [

    ],
    hastPlugins: [

    ]
  }
})
module.exports = withCSS(withMDX());