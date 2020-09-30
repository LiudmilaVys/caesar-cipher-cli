const chalk = require('chalk');
const boxen = require('boxen');
const messages = require('../resources/messages.js');
const statements = require('../resources/statements.js');

function validateAction(action) {
  if (!action) {
    logErrorMessage(messages.actionIsAbsent);
    process.exit(1);
  }

  if (!statements.actions[action]) {
    logErrorMessage(messages.actionIsInvalid);
    process.exit(1);
  }
}

function validateShift(shift) {
  if (!shift) {
    logErrorMessage(messages.shiftIsAbsent);
    process.exit(1);
  }

  if (isNaN(shift)) {
    logErrorMessage(messages.shiftIsInvalid);
    process.exit(1);
  }
}

function logErrorMessage(text) {
  const msgBox = boxen(chalk.white.bold(text), { borderColor: 'red' });
  console.log(msgBox);
}

module.exports = {
  validateAction,
  validateShift
};
