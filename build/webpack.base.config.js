/*
  path
  - 模块提供一些实用工具，用于处理文件和目录的路径
  - path.resolve() 方法将路径或路径片段解析为绝对路径
    * 参数必须是绝对路径，'/'开头，非绝对路径将被忽略
    * 零长度的 path 片段会被忽略
    * 没有传入path，则path.resolve()会返回当前工作目录的绝对路径
    * 
    * path.resolve('/目录1/目录2', './目录3'); 返回: '/目录1/目录2/目录3'
    * 
    * path.resolve('/目录1/目录2', '/目录3/目录4/'); 返回: '/目录3/目录4'
    * 
    * path.resolve('目录1', '目录2/目录3/', '../目录4/文件.gif');
      如果当前工作目录是 /目录A/目录B，
      则返回 '/目录A/目录B/目录1/目录2/目录4/文件.gif'
  - __dirname / path.dirname
    * 当前模块的根目录
    * 从 /Users/mjr 运行 node example.js，则__dirname和path.dirname(__filename)均为/Users/mjr

*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development', // development | production(默认将会压缩，且混淆)
  entry: './src/index.js',
  output: {
    filename: 'index.[hash].js',
    path: path.resolve('dist')
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
      '@': path.resolve('src')
    },
  },
  module: {
    rules: [
      {
        // 匹配文件规则
        test: /\.js$/,
        // 排除node_modules
        exclude: /node_modules|build/,
        include: path.resolve('src'), // 只查找src下的文件
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { 'useBuiltIns': 'entry' }]
            ]
          }
        },
      }
    ],
  },
  plugins: [
    // 注入文件到index.html
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 原封不动直接copy，配置使用数组形式
    new CopyPlugin({
      patterns: [
        { from: './src/static', to: 'static' }
      ],
    })
  ]
}