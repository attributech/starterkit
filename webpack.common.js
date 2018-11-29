const path = require('path');

module.exports = {
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:  /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  resolve: {
    alias: {
      'components': path.resolve(__dirname, './components')
    }
  }
};
