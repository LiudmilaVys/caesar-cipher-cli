const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const minimist = require('minimist');
const validator = require('./common/validator.js');
const CaesarCipherEncoder = require('./common/encoder.js');

const argv = minimist(process.argv, {
  string: ['i', 'o', 'a'],
  alias: { a: 'action', s: 'shift', i: 'input', o: 'output' }
});

validator.validateAction(argv.action);
validator.validateShift(argv.shift);

// const status = fs.statSync(argv.input);
// if (status.isFile) {
// }

const input_stream = fs.createReadStream(
  path.join(__dirname, '..', argv.input)
);
const output_stream = fs.createWriteStream(
  path.join(__dirname, '..', argv.output)
);
const encoder = new CaesarCipherEncoder(argv.shift);

pipeline(input_stream, encoder, output_stream, error => {
  if (error) {
    debugger;
  }
});
