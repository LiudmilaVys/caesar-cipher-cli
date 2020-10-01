const fs = require('fs');
const path = require('path');
const { pipeline, Readable } = require('stream');
const readline = require('readline');
const minimist = require('minimist');
const validator = require('./common/validator.js');
const CaesarCipherEncoder = require('./common/encoder.js');
const clUtil = require('./common/clUtil.js');
const logger = require('./common/logger.js');
const statements = require('./resources/statements.js');
const messages = require('./resources/messages.js');

const argv = minimist(process.argv, {
  string: ['i', 'o', 'a'],
  alias: { a: 'action', s: 'shift', i: 'input', o: 'output' }
});

validator.validateAction(argv.action);
validator.validateShift(argv.shift);

let inputPath;
if (argv.input) {
  inputPath = path.join(__dirname, '..', argv.input);
  validator.validateInput(inputPath);
}

let outputPath;
if (argv.output) {
  outputPath = path.join(__dirname, '..', argv.output);
  validator.validateOutput(outputPath);
}

if (inputPath) {
  const inputStream = fs.createReadStream(inputPath);

  inputStream.on('error', function(err) {
    logger.logErrorMessage(messages.inputFileIssue);
    process.exit(0);
  });

  processStreams(inputStream, defineOutputStream(outputPath));
} else {
  logger.logNotification(messages.inputFileAbsent);

  const rl = readline.createInterface({ input: process.stdin });

  rl.on('line', line => {
    const lineStream = Readable.from([line]);
    processStreams(lineStream, defineOutputStream(outputPath));
  });
}

function defineOutputStream(outputPath) {
  let outputStream;

  if (outputPath) {
    outputStream = fs.createWriteStream(outputPath, { flags: 'a+' });
    outputStream.on('error', err => {
      logger.logErrorMessage(messages.outputFileIssue);
      process.exit(0);
    });
  } else {
    outputStream = process.stdout;
  }

  return outputStream;
}

function processStreams(inputStream, outputStream) {
  const shift =
    argv.action == statements.action.encode ? argv.shift : argv.shift * -1;
  const encoder = new CaesarCipherEncoder(shift);

  pipeline(inputStream, encoder, outputStream, error => {
    if (error) {
      logger.logErrorMessage(messages.generalError);
    }
  });
}
