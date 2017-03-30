const values = require('postcss-modules-values');
const postFor = require('postcss-for');
const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    values,
    postFor(),
    nested(),
    autoprefixer({
      browsers: [
        '>5%',
        'last 2 versions'
      ]
    })
  ]
};
