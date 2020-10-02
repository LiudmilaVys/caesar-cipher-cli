const fs = require("fs");
const messages = require("../resources/messages.js");
const statements = require("../resources/statements.js");
const logger = require("./logger.js");

function validateAction(action) {
  if (!action) {
    logger.logErrorMessage(messages.actionIsAbsent);
    process.exit(9);
  }

  if (!statements.action[action]) {
    logger.logErrorMessage(messages.actionIsInvalid);
    process.exit(9);
  }
}

function validateShift(shift) {
  if (!shift) {
    logger.logErrorMessage(messages.shiftIsAbsent);
    process.exit(9);
  }

  if (!Number.isInteger(shift)) {
    logger.logErrorMessage(messages.shiftIsNotANumber);
    process.exit(9);
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
      process.stderr.write(message);
      process.exit(9);
    }
  } catch (err) {
    process.stderr.write(message);
    process.exit(9);
  }
}

module.exports = {
  validateAction,
  validateShift,
  validateInput,
  validateOutput,
};
