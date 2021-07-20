const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development', // development | production(默认将会压缩，且混淆)
  entry: './src/index.js',
  output: {
    filename: 'index.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  /*
    解析 --> 配置模块如何解析
    - webpack默认只加载文件
    - extensions指定webpack解析那些哪些后缀的文件，默认仅解析js文件
    - alias指定 import | require 文件路径别名，减少查找过程，提升性能
  */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  plugins: [
    // 注入文件到index.html
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 原封不动直接copy，配置使用数组形式
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: './src/static',
            to: 'static'
          }
        ]
      })
  ]
}