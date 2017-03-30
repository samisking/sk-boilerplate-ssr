import Koa from 'koa';
import convert from 'koa-convert';
// import helmet from 'koa-helmet';
import compress from 'koa-compress';
import serve from 'koa-static';
import loggingMiddleware from './middleware/logging';
import SSRReactMiddleware from './middleware/ssr-react';
import SSRDefaultMiddleware from './middleware/ssr-default';
import { config, paths } from '../../config/app';
import { log } from '../utils';

const app = new Koa();
const logTitle = 'SERVER:PROD';

// app.use(helmet());
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     imgSrc: ['data:'],
//   }
// }));

app.use(compress());
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
