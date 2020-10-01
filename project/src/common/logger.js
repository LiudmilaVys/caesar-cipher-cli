const chalk = require('chalk');
const boxen = require('boxen');

function logErrorMessage(text) {
  const msgBox = boxen(chalk.white.bold(text), { borderColor: 'red' });
  console.log(msgBox);
}

function logNotification(text) {
  const msgBox = boxen(chalk.white.bold(text), { borderColor: 'blue' });
  console.log(msgBox);
}

module.exports = {
  logErrorMessage,
  logNotification
};
