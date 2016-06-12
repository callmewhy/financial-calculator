const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackConfig = require('./webpack.dev-server.conf.js')
webpackConfig.entry.app.unshift('webpack/hot/dev-server')
const compiler = webpack(webpackConfig)

const server = new WebpackDevServer(compiler, {
  hot: true,
  quiet: false,
})
server.listen(8080)
