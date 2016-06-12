const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const appRoot = path.resolve(__dirname, '../app')

module.exports = (options = {}) => {
  function generateLoaders(loaders) {
    let sourceLoader = loaders.map((loader) => {
      let loaderStr = `${loader}-loader`
      let extraParamChar = '?'
      if (/\?/.test(loader)) {
        loaderStr = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      }
      return loaderStr + (options.sourceMap ? `${extraParamChar}sourceMap` : '')
    }).join('!')

    const p = /\?/.test(sourceLoader) ? '&' : '?'
    sourceLoader = `${sourceLoader}${p}includePaths[]=${path.resolve(appRoot, './node_modules')}`
    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    }
    return ['vue-style-loader', sourceLoader].join('!')
  }

  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus']),
  }
}
