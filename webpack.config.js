var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, 
        loader: 'style!css'
      },
        {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015','react']
        }
      }, {
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015','react']
            }
        }
    ]
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" }
    },
  plugins: [
    new webpack.BannerPlugin('This file is created by xjx')
  ]
}