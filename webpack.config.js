// Webpack config

const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
    mode: 'production',
    stats: {
      colors: false,
      hash: true,
      timings: true,
      assets: true,
      chunks: true,
      chunkModules: true,
      modules: true,
      children: true,
    },
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          sourceMap: true,
          uglifyOptions: {
            compress: {
              inline: false
            }
          }
        })
      ],
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor_app',
            chunks: 'all',
            minChunks: 2
          }
        }
      }
    },
    /*plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        },
      }),
    ],*/
    output: { filename: 'main.js' },
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
