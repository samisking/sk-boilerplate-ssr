import { config } from '../../../../config/app';

const assets = require('../../../../build/assets.json');

export default (ctx) => {
  const css = !config.isDev ? `<link href="${assets.main.css}" rel="stylesheet" />` : '';

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        ${css}
      </head>
      <body>
        <div id="app"></div>
        <script src="${assets.main.js}"></script>
      </body>
    </html>`;
};
