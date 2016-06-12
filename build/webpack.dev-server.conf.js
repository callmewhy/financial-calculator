const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.conf')
const config = require('../config')
const cssLoaders = require('./css-loaders')

const devServerUrl = `http://localhost:${config.dev.port}/`

const webpackConfig = merge(webpackBaseConfig, {
  entry: {
    app: [
      './app/main.js',
    ],
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  output: {
    // necessary for the html plugin to work properly
    // when serving the html from in-memory
    // need to explicitly set localhost to prevent
    // the hot updates from looking for local files
    publicPath: devServerUrl,
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: false,
      extract: false,
    }),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './app/main.html',
      excludeChunks: ['devtool'],
      inject: true,
    }),
  ],
})

module.exports = webpackConfig

console.log(webpackConfig)
