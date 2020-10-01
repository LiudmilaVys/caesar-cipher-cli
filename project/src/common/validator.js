const fs = require('fs');
const messages = require('../resources/messages.js');
const statements = require('../resources/statements.js');
const logger = require('./logger.js');

function validateAction(action) {
  if (!action) {
    process.stderr.write(messages.actionIsAbsent)
    process.exit(1);
  }

  if (!statements.action[action]) {
    process.stderr.write(messages.actionIsAbsent)
    process.exit(1);
  }
}

function validateShift(shift) {
  if (!shift) {
    process.stderr.write(messages.shiftIsAbsent)
    process.exit(1);
  }

  if (isNaN(shift)) {
    process.stderr.write(messages.shiftIsAbsent)
    process.exit(1);
  }
}

function validateInput(input) {
  validatePath(input, messages.inputFileNotExists);
}

function validateOutput(output) {
  validatePath(output, messages.outputFileNotExists);
}

function validatePath(path, message) {
  try {
    if (!fs.existsSync(path)) {
      logger.logErrorMessage(message);
      process.exit(9);
    }
  } catch (err) {
    logger.logErrorMessage(message);
    process.exit(9);
  }
}

module.exports = {
  validateAction,
  validateShift,
  validateInput,
  validateOutput
};
