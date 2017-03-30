const chalk = require('chalk');

const levels = {
  success: {
    color: 'green',
    icon: '✓'
  },
  error: {
    color: 'red',
    icon: '✗'
  },
  warn: {
    color: 'yellow',
    icon: '~'
  },
  info: {
    color: 'blue',
    icon: '»'
  }
};

const log = ({ title = 'APP', message, level }) => {
  const l = levels[level] || levels.info;
  const icon = chalk[l.color](l.icon);
  console.log(`${icon} ${chalk.bold(`${title}`)}: ${message}`);
};

module.exports = log;
