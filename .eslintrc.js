module.exports = {
  root: true,
  extends: 'airbnb-base',
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  globals: {
    'jQuery': true,
    '$': true,
    'componentHandler': true,
  },
  plugins: [
    'html'
  ],
  'rules': {
    // 不要分号
    'semi': [2, 'never'],
    // 全部单引号
    'quotes': [2, 'single'],
    // 对象在 key value 相同的情况下也不要缩写
    'object-shorthand': [2, 'never'],
    // 允许 alert
    'no-alert': 0,
    // 允许 console
    'no-console': 0,
    // 箭头函数不检查内容
    'arrow-body-style': 0,
    // 允许多行
    'no-multi-str': 0,
    // 允许函数匿名
    'func-names': 0,
    // 取消单行长度限制
    'max-len': 0,
  }
}
