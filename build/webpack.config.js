const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const prodConfig = require('./webpack.prod.config')
const path = require('path')


/*
  可以是对象也可以是函数
  - env 环境变量
  - argv 配置数据(包含mode参数)
*/
module.exports = (env, argv) => {
  console.log(path.resolve('src'));
  const config = argv.mode === 'production' ? prodConfig : devConfig
  return merge(baseConfig, config)
}