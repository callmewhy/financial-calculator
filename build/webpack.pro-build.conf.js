const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const cssLoaders = require('./css-loaders')

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './app/main.js',
    background: './app/background.js',
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
    }),
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './app/package.json', to: '.' },
      { from: './static', to: 'static' },
    ]),
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(path.join(config.build.assetsSubDirectory, '[name].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './app/main.html',
      excludeChunks: ['background'],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    }),
  ],
})

module.exports = webpackConfig
console.log(webpackConfig)
