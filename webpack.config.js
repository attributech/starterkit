// Webpack config

var webpack = require('webpack');

module.exports = {
  develop: {
    output: { filename: 'main.js' },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /.js?$/,
          exclude: ['bower_components', 'node_modules'],
          loader: 'babel',
          query: {
            presets: ['es2015'],
            cacheDirectory: true
          },
        },
      ],
    },
  },
  production: {
    output: { filename: 'main.js' },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify('production') }
      })
    ],
    module: {
      loaders: [
        {
          test: /.js?$/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            cacheDirectory: true
          },
        }
      ],
    },
  },
};
