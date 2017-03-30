const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { config, paths } = require('./app');

const clientBundle = config.bundles.client;

module.exports = {
  name: 'client',
  target: 'web',
  context: paths.get('base'),
  entry: config.isDev ? [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    clientBundle.srcEntryFile
  ] : clientBundle.srcEntryFile,
  output: {
    filename: config.isDev ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    hashDigestLength: 8,
    path: clientBundle.outputPath,
    publicPath: clientBundle.webPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: config.isDev ? [
              'react-hot-loader/babel'
            ] : []
          }
        }
      },
      config.isDev ? {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]--[hash:base64:8]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: paths.get('postCSSConfig')
            }
          }
        ],
        exclude: /node_modules/
      } : {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[hash:base64:8]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: paths.get('postCSSConfig')
              }
            }
          ],
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=images/[name].[hash:8].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|woff2?|ttf)$/,
        use: 'file-loader?name=fonts/[name].[hash:8].[ext]',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new AssetsPlugin({
      filename: 'assets.json',
      path: paths.get('buildDir')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.env)
    }),
    ...config.isDev ? [
      new webpack.HotModuleReplacementPlugin()
    ] : [
      new webpack.NormalModuleReplacementPlugin(
        /^\.\/routes.sync$/,
        './routes.async'
      ),
      new ExtractTextPlugin({
        filename: 'css/[name].[contenthash:8].css',
        allChunks: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: false
      })
    ]
  ]
};
