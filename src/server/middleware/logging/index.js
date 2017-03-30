import chalk from 'chalk';

const colorCodes = {
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green'
};

const icons = {
  5: '✗',
  4: '~',
  3: '→',
  2: '✓',
  1: '✓'
};

const loggerMiddleware = (title = 'APP') => (ctx, next) => {
  const start = new Date();

  return next().then(() => {
    const ms = new Date() - start;
    const s = Math.floor(ctx.status / 100);
    const color = colorCodes[s];
    const status = chalk[color](ctx.status);
    const icon = chalk[color](icons[s]);

    if (ctx.url !== '/favicon.ico') {
      console.log(`${icon} ${chalk.bold(`${title}`)}: ${chalk.bold(ctx.method)} ${ctx.url} ${status} - ${ms}ms`);
    }
  });
};

export default loggerMiddleware;
