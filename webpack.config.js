const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname,'public', 'dist')
  },
  module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }]
    },
    devtool:'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname,'public'),
      publicPath: '/dist/',
    }
  };
