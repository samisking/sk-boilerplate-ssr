import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import webpack from 'webpack';
import loggingMiddleware from './middleware/logging';
import SSRReactMiddleware from './middleware/ssr-react';
import SSRDefaultMiddleware from './middleware/ssr-default';
import { config, paths } from '../../config/app';
import { log } from '../utils';

const app = new Koa();
const logTitle = 'SERVER:DEV';

const webpackConfig = require('../../config/webpack.client.config');

const compiler = webpack(webpackConfig);

const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');

log({ level: 'success', message: 'Enabled webpack dev middleware.' });

app.use(convert(webpackDevMiddleware(compiler, {
  historyApiFallback: true,
  hot: true,
  quiet: true
})));

app.use(convert(webpackHotMiddleware(compiler)));
app.use(convert(serve(paths.get('buildDir'))));
app.use(loggingMiddleware(logTitle));

if (config.disableSSR) {
  app.use(SSRDefaultMiddleware);
} else {
  app.use(SSRReactMiddleware);
}

if (!config.port || !config.hostname) {
  log({
    level: 'error',
    title: logTitle,
    message: 'No PORT or HOSTNAME env variables set.'
  });
} else {
  app.listen(config.port, () => {
    log({
      title: logTitle,
      message: `Running at http://${config.hostname}:${config.port}.`
    });
  });
}
