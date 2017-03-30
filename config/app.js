const path = require('path');
const { log } = require('../src/utils');

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';
const isDev = !isProd;

const paths = {
  base: '/',
  config: 'config',
  postCSSConfig: 'config/postcss.config.js',
  buildDir: 'build',
  clientDir: 'src/client',
  serverDir: 'src/server',
  sharedDir: 'src/shared',
  clientEntry: 'src/client/index.js',
  serverEntry: 'src/server/server.prod.js'
};

paths.get = key => path.join(process.cwd(), paths[key]);

const config = {
  env,
  isProd,
  isDev,
  disableSSR: process.env.DISABLE_SSR || false,
  hostname: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || 3000,
  bundles: {
    client: {
      srcEntryFile: paths.get('clientEntry'),
      srcIncludePaths: [
        paths.get('clientDir'),
        paths.get('sharedDir')
      ],
      webPath: '/',
      outputPath: paths.get('buildDir')
    },
    server: {
      srcEntryFile: paths.get('serverEntry'),
      srcIncludePaths: [
        paths.get('serverDir'),
        paths.get('sharedDir')
      ],
      outputPath: paths.get('buildDir')
    }
  }
};

log({
  title: 'CONFIG',
  level: 'success',
  message: 'Config successfully loaded.'
});

log({
  title: 'CONFIG',
  message: `NODE_ENV=${config.env} HOSTNAME=${config.hostname} PORT=${config.port} SSR=${!config.disableSSR}`
});

module.exports = { paths, config };
