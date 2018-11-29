// Webpack config

var webpack = require('webpack');
var path = require('path');

module.exports = {
  develop: {
    output: { filename: 'main.js' },
    target: 'web',
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /.js?$/,
          exclude: ['bower_components', 'node_modules'],
          loader: 'babel',
          query: {
            presets: ['@babel/env'],
            cacheDirectory: true
          },
        },
      ],
    },
    resolve: {
      alias: {
        'components': path.resolve(__dirname, './components')
      }
    }
  },
  production: {
    mode: "production",
    output: { filename: 'main.js' },
    target: 'web',
    /*plugins: [
      new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify('production') }
      })
    ],*/
    module: {
      loaders: [
        {
          test: /.js?$/,
          loader: 'babel',
          query: {
            presets: ['@babel/env'],
            cacheDirectory: true
          },
        }
      ],
    },
    resolve: {
      alias: {
        'components': path.resolve(__dirname, './components')
      }
    },
  },
};
