const { config } = require('../../config/app');

if (config.isDev) {
  // Use a custom babel config for dev server
  require('babel-register')({
    babelrc: false,
    presets: [
      'es2015',
      'stage-1',
      'react'
    ],
    plugins: [
      ['css-modules-transform', { generateScopedName: '[local]--[hash:base64:8]' }]
    ]
  });

  require('./server.dev');
} else {
  require('./server.prod');
}
