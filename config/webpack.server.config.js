const nodeExternals = require('webpack-node-externals');
const { config, paths } = require('./app');

const serverBundle = config.bundles.server;

module.exports = {
  name: 'server',
  target: 'node',
  context: paths.get('base'),
  entry: serverBundle.srcEntryFile,
  externals: nodeExternals(),
  output: {
    filename: 'server.js',
    path: serverBundle.outputPath,
    publicPath: `http://${config.hostname}:${config.port}`,
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: serverBundle.srcIncludePaths,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: { node: true },
                  modules: false
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          // Using css-loader/locals to get correct class names in ssr markup
          // @see: https://github.com/webpack/css-loader/issues/59#issuecomment-109793167
          {
            loader: 'css-loader/locals',
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
        exclude: /node_modules/
      },
      {
        test: /\.(eot|gif|jpe?g|png|svg|woff2?|ttf)$/,
        use: 'ignore-loader'
      }
    ]
  }
};
