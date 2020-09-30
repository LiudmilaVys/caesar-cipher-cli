const parseArgs = require('minimist');
const validator = require('./common/validator.js');

const argv = parseArgs(process.argv, {
  string: ['i', 'o', 'a'],
  alias: { s: 'shift', i: 'input', o: 'output', a: 'action' }
});
console.log(argv);

validator.validateAction(argv.action);
validator.validateShift(argv.shift);
